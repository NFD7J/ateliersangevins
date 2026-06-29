---
title: "Audit de sécurité — Les Ateliers Angevins"
projet: "ateliersangevins"
type: "Audit de sécurité applicative"
date: "2026-06-26"
auteur: "Revue de sécurité"
statut: "Initial (avant remédiation)"
---

# Audit de sécurité — Les Ateliers Angevins

> Ce document décrit l'état de sécurité de l'application **tel qu'il était avant
> remédiation**. Le détail des correctifs appliqués est consigné dans
> [`02-rapport-modifications.mdx`](./02-rapport-modifications.mdx).

## 1. Contexte et périmètre

### 1.1 Stack technique auditée

| Élément | Détail |
| --- | --- |
| Framework | Next.js `16.2.9` (App Router, React 19) |
| Langage | TypeScript |
| Authentification | Auth.js / NextAuth `v5` (provider Credentials, session JWT) |
| Base de données | PostgreSQL (Neon) via Prisma `6.19.x` |
| Stockage médias | Cloudinary |
| Rendu de contenu | `react-markdown` `v10` + `remark-gfm` |
| Hébergement cible | Vercel **ou** VPS auto-hébergé (reverse proxy nginx) |

### 1.2 Surface d'attaque

L'application comporte une partie publique (pages vitrine, blog, agenda, contact)
et un **espace équipe** protégé (`/espace-equipe`) permettant à des administrateurs
de gérer les articles et les événements. Les points d'entrée significatifs sont :

- le formulaire de connexion (`/espace-equipe`) ;
- les *Server Actions* de création / modification / suppression d'articles et
  d'événements ;
- l'upload d'images vers Cloudinary ;
- le rendu Markdown des articles publiés ;
- les paramètres d'URL (`?cat=` sur le blog, slugs d'articles, identifiants
  d'événements).

### 1.3 Méthodologie

Revue de code statique exhaustive (authentification, autorisation, validation des
entrées, gestion des secrets, en-têtes HTTP, dépendances), complétée par une
analyse des dépendances (`npm audit`) et une vérification de l'historique Git à la
recherche de secrets.

### 1.4 Échelle de gravité

| Niveau | Définition |
| --- | --- |
| **Critique** | Exploitation simple menant à une compromission totale (prise de contrôle admin, fuite massive de données). Correctif immédiat. |
| **Élevé** | Compromission importante ou contournement d'un contrôle d'accès. Correctif prioritaire. |
| **Moyen** | Exploitation conditionnée (compte requis, configuration particulière) ou impact limité. |
| **Faible** | Bonne pratique manquante, défense en profondeur, impact marginal. |

## 2. Synthèse

| # | Vulnérabilité | Gravité |
| --- | --- | --- |
| AA-01 | Identifiants administrateur faibles / par défaut | **Critique** |
| AA-02 | Secrets de production réels stockés dans les fichiers de configuration | **Critique** |
| AA-03 | Contrôle d'accès rompu sur le segment `/espace-equipe/agenda` | **Élevé** |
| AA-04 | Autorisation appliquée uniquement à la périphérie (proxy/middleware) | **Élevé** |
| AA-05 | Absence de limitation des tentatives de connexion (brute force) | **Élevé** |
| AA-06 | En-têtes de sécurité HTTP et CSP absents | **Élevé** |
| AA-07 | Upload de fichiers non restreint | **Moyen** |
| AA-08 | Absence de validation et de bornage des entrées serveur | **Moyen** |
| AA-09 | Dépendance transitive vulnérable (`postcss`) | **Moyen** |
| AA-10 | Énumération de comptes par canal temporel | **Faible** |
| AA-11 | `trustHost` permissif sans URL canonique fixée | **Faible** |
| AA-12 | Durée de session non bornée explicitement | **Faible** |

**Bilan :** 2 critiques, 4 élevées, 3 moyennes, 3 faibles.

## 3. Détail des vulnérabilités

---

### AA-01 — Identifiants administrateur faibles / par défaut

**Gravité : Critique**

**Problème.** Le compte administrateur de l'environnement local était configuré avec
le couple `admin@admin.com` / `admin` (fichier `.env`). Le fichier modèle
`.env.example` proposait quant à lui des mots de passe en clair de la forme
`raymondPassword` / `mariePassword`, susceptibles d'être réutilisés tels quels lors
d'un déploiement. Le script de seed (`prisma/seed.ts`) acceptait n'importe quelle
valeur sans contrôle de robustesse.

**Impact.** L'espace équipe donne un accès complet en écriture au contenu du site
(articles, agenda) et à l'upload de médias. Un mot de passe trivial équivaut à une
prise de contrôle complète du back-office : publication / dépublication / suppression
de contenu, défiguration du site, upload de fichiers.

**Scénario d'attaque réaliste.** Un attaquant découvre l'URL `/espace-equipe`
(lien « Espace équipe » présent en pied de page). Connaissant les conventions de mots
de passe par défaut courantes, il teste manuellement quelques combinaisons évidentes
de type identifiant = mot de passe. Aucune ne déclenchant de verrouillage (voir
AA-05), il obtient un accès administrateur en quelques essais, puis modifie ou
supprime le contenu du site.

**Recommandations.**
- Imposer une politique de mot de passe forte au niveau du script de seed (longueur
  minimale, mélange de classes de caractères, rejet des mots de passe courants et de
  ceux contenant l'identifiant).
- Bannir explicitement les valeurs par défaut.
- Faire **tourner (rotation)** tout mot de passe ayant déjà été utilisé en clair.

---

### AA-02 — Secrets de production réels stockés dans les fichiers de configuration

**Gravité : Critique**

**Problème.** Le fichier `.env.example` — par convention un modèle destiné à être
partagé / versionné — contenait des **secrets réels** :

- une chaîne de connexion PostgreSQL Neon complète, **mot de passe inclus** ;
- une valeur `AUTH_SECRET` d'apparence réelle (clé de signature des sessions JWT).

Le fichier `.env` local contenait par ailleurs le **secret d'API Cloudinary** en
clair. À noter (point positif) : l'historique Git a été vérifié et ces secrets n'y
figurent pas — `.gitignore` couvre correctement `.env*`. Le risque tient donc à la
présence des secrets dans un fichier *modèle* (qui a vocation à circuler entre
développeurs et peut être committé par erreur via `git add -f`) et à leur manipulation
en clair.

**Impact.**
- La chaîne de connexion Neon donne un accès direct en lecture / écriture à toute la
  base (comptes admin, articles, événements).
- L'`AUTH_SECRET` est la clé qui **signe les jetons de session**. Sa divulgation
  permet de **forger un JWT de session valide** et donc d'usurper un administrateur
  *sans connaître son mot de passe* (contournement total de l'authentification).
- Le secret Cloudinary permet d'uploader / supprimer des médias sur le compte.

**Scénario d'attaque réaliste.** Le fichier `.env.example` est transmis à un
prestataire ou poussé par inadvertance dans un dépôt public. Un tiers récupère la
chaîne de connexion et se connecte directement à la base, contournant entièrement
l'application. Indépendamment, la connaissance de l'`AUTH_SECRET` lui permet de
fabriquer un cookie de session d'administrateur et d'accéder au back-office comme s'il
s'était authentifié.

**Recommandations.**
- Ne placer que des **valeurs d'exemple** (placeholders) dans `.env.example`.
- Considérer comme **compromis** tout secret ayant été stocké en clair dans un
  fichier modèle, et procéder à leur **rotation** :
  - régénérer le mot de passe de la base Neon ;
  - régénérer la paire de clés API Cloudinary ;
  - régénérer l'`AUTH_SECRET` (`npx auth secret`) — ce qui invalide les sessions en
    cours, comportement attendu.
- Confirmer que `.gitignore` couvre tous les fichiers d'environnement (déjà le cas).

---

### AA-03 — Contrôle d'accès rompu sur le segment `/espace-equipe/agenda`

**Gravité : Élevé**

**Problème.** La protection des routes d'administration reposait sur le proxy
(middleware) `src/proxy.ts`, dont le `matcher` ne couvrait **que**
`/espace-equipe/articles/:path*`. Le segment `/espace-equipe/agenda` (liste,
création, édition) n'était donc protégé par **aucun** mécanisme : les pages
elles-mêmes appelaient `auth()` sans jamais rediriger un visiteur anonyme.

**Impact.** Un utilisateur non authentifié pouvait :

- accéder à l'interface d'administration de l'agenda ;
- **lister tous les événements, y compris les brouillons non publiés**
  (`published = false`) — divulgation d'informations internes ;
- afficher les formulaires d'ajout / d'édition.

Les *mutations* restaient bloquées par le contrôle `requireAdmin()` présent dans les
*Server Actions* (point positif), mais la **lecture** des données non publiées et
l'exposition de la surface d'administration constituaient une rupture de contrôle
d'accès (OWASP A01:2021 — Broken Access Control).

**Scénario d'attaque réaliste.** Un visiteur devine ou découvre l'URL
`/espace-equipe/agenda` (par exploration, ou via les liens internes du back-office
indexés). La page s'affiche sans demander d'authentification et révèle le tableau
complet des événements, dont ceux encore en préparation et non destinés au public.

**Recommandations.**
- Imposer une vérification d'autorisation **côté serveur** sur l'ensemble des
  segments protégés (pas seulement les articles).
- Centraliser ce contrôle dans un `layout.tsx` par segment, qui s'applique à toutes
  les routes enfants.
- Élargir le `matcher` du proxy en défense en profondeur.

---

### AA-04 — Autorisation appliquée uniquement à la périphérie (proxy / middleware)

**Gravité : Élevé**

**Problème.** Pour le segment `/espace-equipe/articles`, la seule barrière était le
proxy (middleware). Les pages ne re-vérifiaient pas la session. Or le middleware est
une couche **périphérique** : c'est une mauvaise pratique d'en faire l'unique point
de contrôle d'autorisation. Cette classe de problème est illustrée par la
**CVE-2025-29927** (contournement du middleware Next.js via un en-tête interne).
La version `16.2.9` n'est pas affectée par cette CVE précise, mais le principe
demeure : *l'autorisation doit être vérifiée au plus près de la donnée*.

**Impact.** Toute défaillance, mauvaise configuration ou régression du middleware
(matcher mal écrit, comme démontré en AA-03 ; futur contournement) exposerait
directement le back-office. Le modèle n'offrait aucune défense en profondeur.

**Scénario d'attaque réaliste.** Une évolution du `matcher` introduit une faille de
couverture (exactement le cas de l'agenda), ou un défaut de la couche middleware
permet de l'ignorer : les pages d'administration, ne réalisant aucune vérification
propre, deviennent accessibles sans session valide.

**Recommandations.**
- Considérer le middleware comme une **optimisation / première barrière**, jamais
  comme l'unique contrôle.
- Vérifier la session dans les `layout.tsx` / pages serveur des segments protégés
  (runtime Node.js), au plus près de l'accès aux données.

---

### AA-05 — Absence de limitation des tentatives de connexion (brute force)

**Gravité : Élevé**

**Problème.** Le callback `authorize` (provider Credentials) ne comportait aucune
limitation du nombre de tentatives. Un client pouvait soumettre des combinaisons
identifiant / mot de passe sans aucune restriction de débit ni verrouillage.

**Impact.** Combiné à AA-01 (mots de passe faibles), ce défaut rend une attaque par
**force brute** ou **credential stuffing** réaliste : aucune friction n'existe pour
ralentir un grand nombre d'essais automatisés contre le formulaire de connexion.

**Scénario d'attaque réaliste.** Un attaquant automatise l'envoi d'essais de
connexion en parcourant une liste de mots de passe courants. En l'absence de
verrouillage et de ralentissement, il peut tester un volume important de combinaisons
jusqu'à trouver un identifiant valide, d'autant plus vite que les mots de passe sont
faibles.

**Recommandations.**
- Introduire une limitation de débit (rate limiting) sur la connexion, idéalement
  par couple (adresse IP + identifiant).
- Égaliser le temps de réponse pour ne pas distinguer « compte inexistant » de
  « mot de passe erroné » (voir AA-10).
- Pour un déploiement multi-instances, prévoir un magasin partagé (Redis / Upstash).

---

### AA-06 — En-têtes de sécurité HTTP et Content-Security-Policy absents

**Gravité : Élevé**

**Problème.** Ni `next.config.ts` ni le proxy ne définissaient d'en-têtes de
sécurité. Étaient absents : `Content-Security-Policy`, `Strict-Transport-Security`
(HSTS), `X-Frame-Options` / `frame-ancestors`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`. L'en-tête `X-Powered-By` exposait par
ailleurs le framework.

**Impact.** L'absence de ces en-têtes affaiblit la résistance du site à plusieurs
classes d'attaques côté navigateur :

- **CSP absente** : aucune barrière secondaire contre l'injection / exécution de
  scripts non prévus ; aucune restriction des origines de scripts, d'images ou de
  cadres (iframes).
- **Pas de `X-Frame-Options` / `frame-ancestors`** : le site peut être encadré
  (iframe) par un tiers → risque de **clickjacking**.
- **Pas de HSTS** : risque de rétrogradation HTTPS → HTTP (interception réseau).
- **Pas de `nosniff`** : risque de confusion de type MIME.

**Scénario d'attaque réaliste.** Un attaquant intègre le site dans une page qu'il
contrôle, via une iframe rendue invisible et superposée à des leurres. Une victime
authentifiée croit cliquer sur des éléments anodins alors qu'elle interagit en réalité
avec le back-office encadré (clickjacking). Faute de directive `frame-ancestors` /
`X-Frame-Options`, le navigateur n'empêche pas cet encadrement.

**Recommandations.**
- Définir un socle d'en-têtes de sécurité pour toutes les réponses (HSTS, nosniff,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`).
- Mettre en place une **CSP stricte**, idéalement **basée sur un nonce par requête**
  pour autoriser uniquement les scripts émis par l'application.
- Désactiver l'en-tête `X-Powered-By`.

---

### AA-07 — Upload de fichiers non restreint

**Gravité : Moyen**

**Problème.** La *Server Action* `uploadArticleImage` (réservée aux admins)
acceptait n'importe quel fichier : aucune validation du **type MIME** ni de la
**taille** côté serveur. Le filtre `accept="image/*"` n'existait que côté client
(contournable). Le fichier était intégralement chargé en mémoire
(`arrayBuffer()` puis encodage base64) avant envoi à Cloudinary, sans appel explicite
à `resource_type: "image"`.

**Impact.** Un administrateur (ou un compte compromis) pouvait :

- envoyer un fichier non-image arbitraire vers Cloudinary ;
- charger un fichier volumineux, provoquant une **consommation mémoire** importante
  (le contenu est tenu en mémoire + dupliqué en base64), avec un risque de
  dégradation / déni de service de l'instance serveur.

L'exploitation requiert un compte authentifié, ce qui limite la gravité à *Moyen*,
mais aggrave fortement l'impact d'un compte compromis (chaînage avec AA-01).

**Scénario d'attaque réaliste.** Disposant d'un accès admin, un acteur malveillant
téléverse de manière répétée des fichiers très volumineux. Chaque requête mobilise une
grande quantité de mémoire serveur, dégradant la disponibilité du site pour les
visiteurs légitimes.

**Recommandations.**
- Valider côté serveur le **type MIME** (liste blanche d'images) et la **taille
  maximale**.
- Forcer `resource_type: "image"` côté Cloudinary pour refuser les charges non-images.

---

### AA-08 — Absence de validation et de bornage des entrées serveur

**Gravité : Moyen**

**Problème.** Les *Server Actions* `saveArticle` et `saveEvent` ne réalisaient que
des contrôles de **présence** (`if (!title …)`). Aucune **longueur maximale** n'était
imposée sur `title`, `excerpt`, `content`, `category`, `description`. Le champ `date`
était converti via `new Date(date)` sans vérifier sa validité (risque de
`Invalid Date`). Les catégories provenant du formulaire étaient transtypées en enum
Prisma sans filtrage. La bibliothèque `zod` était pourtant déjà présente dans les
dépendances mais inutilisée.

**Impact.**
- Écriture de champs **surdimensionnés** en base (charge utile volumineuse → stockage
  / mémoire), une forme de déni de service applicatif.
- Risque d'enregistrement de dates invalides.
- Données non normalisées en base.

**Scénario d'attaque réaliste.** Un compte admin compromis (ou un script abusant
d'une session valide) soumet des contenus extrêmement volumineux de façon répétée,
gonflant la base et la mémoire de rendu des pages publiques qui affichent ces contenus.

**Recommandations.**
- Valider et **borner** toutes les entrées via des schémas `zod` (longueurs max,
  format de date, énumérations).
- Restreindre la valeur d'image de couverture aux URL Cloudinary attendues.

---

### AA-09 — Dépendance transitive vulnérable (`postcss`)

**Gravité : Moyen**

**Problème.** `npm audit` signalait deux alertes *modérées* relatives à `postcss`
(advisory « XSS via *Unescaped `</style>` in CSS Stringify Output* »), la version
vulnérable étant celle **embarquée par `next`** (`postcss@8.4.31`).

**Impact.** L'exploitation réelle suppose de faire transiter du **CSS contrôlé par un
attaquant** dans le pipeline de stringification de PostCSS. Dans cette application, le
CSS provient des développeurs et de Tailwind (build), jamais d'une entrée utilisateur :
l'exploitabilité concrète est donc quasi nulle. La présence d'une dépendance vulnérable
reste néanmoins un écart aux bonnes pratiques (hygiène des dépendances, conformité aux
scans de sécurité).

**Scénario d'attaque réaliste.** Non démontrable dans le contexte de cette
application (pas de surface où du CSS attaquant serait traité par PostCSS au build).
Le risque est principalement théorique / lié à la conformité.

**Recommandations.** Forcer la résolution de `postcss` vers une version corrigée
(via `overrides`) afin de dédupliquer la version embarquée par `next` et de ramener
l'audit à zéro vulnérabilité.

---

### AA-10 — Énumération de comptes par canal temporel

**Gravité : Faible**

**Problème.** Dans `authorize`, lorsque l'email n'existait pas, la fonction retournait
immédiatement (`if (!admin) return null;`) **sans** exécuter `bcrypt.compare`. Lorsque
l'email existait, la comparaison bcrypt (coûteuse) était exécutée. Cette différence de
temps de traitement constitue un **oracle temporel**.

**Impact.** Un attaquant mesurant finement les temps de réponse peut distinguer un
email d'administrateur **existant** d'un email inexistant, facilitant le ciblage d'une
attaque par force brute (AA-05).

**Scénario d'attaque réaliste.** En soumettant une série d'adresses et en comparant
statistiquement les temps de réponse, l'attaquant identifie les adresses associées à un
compte réel, puis concentre ses tentatives de mot de passe sur celles-ci.

**Recommandations.** Exécuter systématiquement une comparaison bcrypt (contre un hash
factice si le compte n'existe pas) afin d'égaliser le temps de réponse, et ne pas
divulguer dans le message d'erreur quelle partie des identifiants est incorrecte
(déjà le cas : message générique).

---

### AA-11 — `trustHost` permissif sans URL canonique fixée

**Gravité : Faible**

**Problème.** La configuration NextAuth utilisait `trustHost: true` sans définir
d'URL canonique (`AUTH_URL`). En faisant confiance à l'en-tête `Host` de la requête,
une URL canonique non fixée peut, selon le déploiement, ouvrir la voie à des
manipulations basées sur l'en-tête `Host` (génération d'URL absolues / redirections).

**Impact.** Faible dans le cas présent (provider Credentials, peu de redirections
externes), mais c'est un paramètre à maîtriser, surtout en auto-hébergement derrière
un reverse proxy.

**Scénario d'attaque réaliste.** Dans une configuration de reverse proxy mal verrouillée,
un en-tête `Host` falsifié pourrait influencer une URL générée par la couche d'auth.

**Recommandations.** Conserver `trustHost: true` uniquement là où c'est nécessaire
(auto-hébergement) et **fixer `AUTH_URL`** en production pour épingler l'hôte attendu ;
verrouiller la transmission de l'en-tête `Host` au niveau du reverse proxy.

---

### AA-12 — Durée de session non bornée explicitement

**Gravité : Faible**

**Problème.** La stratégie de session était `jwt` sans `maxAge` explicite : la durée
de vie reposait sur les valeurs par défaut (30 jours).

**Impact.** Une session admin valide reste exploitable longtemps (vol de cookie /
poste laissé ouvert). Fenêtre d'abus élargie.

**Scénario d'attaque réaliste.** Un cookie de session récupéré (poste partagé,
machine compromise) reste valide pendant une période prolongée, laissant à un tiers
le temps d'en abuser.

**Recommandations.** Borner explicitement la durée de session (par ex. quelques
heures) et la fréquence de rafraîchissement du jeton.

## 4. Points positifs constatés

L'audit a aussi relevé des choix sains, à préserver :

- **Pas d'injection SQL** : tous les accès passent par Prisma (requêtes
  paramétrées) ; aucun `queryRawUnsafe` / `executeRawUnsafe`.
- **Pas de XSS stocké via le Markdown** : `react-markdown` v10 n'interprète pas le
  HTML brut par défaut (pas de `rehype-raw`) et neutralise les URL dangereuses ; aucun
  usage de `dangerouslySetInnerHTML` dans le code.
- **Mots de passe hachés** avec `bcrypt` (jamais stockés en clair).
- **Mutations protégées** : les *Server Actions* d'écriture vérifient
  `requireAdmin()`.
- **Secrets absents de l'historique Git** : `.gitignore` couvre `.env*`
  (vérifié).
- **Back-office non indexé** : `robots: { index: false }` sur les pages
  d'administration.
- **Cookies de session** : valeurs par défaut NextAuth (`httpOnly`, `sameSite`,
  `secure` en production).

## 5. Plan de remédiation recommandé (par priorité)

1. **Immédiat (Critique)** — AA-01, AA-02 : politique de mots de passe forts,
   nettoyage de `.env.example`, **rotation** de tous les secrets ayant circulé en
   clair (DB Neon, Cloudinary, `AUTH_SECRET`).
2. **Prioritaire (Élevé)** — AA-03, AA-04 : contrôle d'accès serveur sur tous les
   segments protégés ; AA-05 : rate limiting de connexion ; AA-06 : en-têtes de
   sécurité + CSP.
3. **Important (Moyen)** — AA-07 : validation des uploads ; AA-08 : validation `zod`
   des entrées ; AA-09 : correctif de dépendance.
4. **Défense en profondeur (Faible)** — AA-10, AA-11, AA-12.

> Les correctifs apportés pour l'ensemble de ces points sont détaillés dans
> [`02-rapport-modifications.mdx`](./02-rapport-modifications.mdx).

## 6. Actions opérateur non automatisables

Certaines actions ne peuvent être réalisées que par l'exploitant, hors code :

- [ ] **Rotation du mot de passe de la base Neon** (tableau de bord Neon) puis mise à
  jour de `DATABASE_URL`.
- [ ] **Rotation des clés API Cloudinary** (tableau de bord Cloudinary).
- [ ] **Régénération de `AUTH_SECRET`** (`npx auth secret`) — invalide les sessions
  en cours.
- [ ] **Définition de mots de passe administrateurs forts** puis `npm run db:seed`.
- [ ] **Définition de `AUTH_URL`** en production.
