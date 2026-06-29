---
title: "Rapport des modifications de sécurité — Les Ateliers Angevins"
projet: "ateliersangevins"
type: "Documentation de remédiation"
date: "2026-06-26"
auteur: "Revue de sécurité"
statut: "Appliqué — vérifié (tsc, eslint, next build)"
---

# Rapport des modifications de sécurité — Les Ateliers Angevins

> Ce document détaille les correctifs appliqués en réponse à
> [`01-audit-securite.mdx`](./01-audit-securite.mdx). Chaque entrée précise le
> problème initial, la solution mise en place, son fonctionnement, les bénéfices
> sécurité et les impacts éventuels sur l'application ou les performances.

## 0. Récapitulatif

| Réf. audit | Correctif | Fichiers |
| --- | --- | --- |
| AA-01 | Politique de mots de passe forts au seed | `prisma/seed.ts` |
| AA-02 | Nettoyage du modèle d'environnement | `.env.example` |
| AA-03 / AA-04 | Autorisation serveur par segment + proxy élargi | `src/app/espace-equipe/*/layout.tsx`, `src/proxy.ts` |
| AA-05 / AA-10 | Rate limiting + anti-énumération | `src/lib/rate-limit.ts`, `src/lib/auth.ts` |
| AA-06 | En-têtes de sécurité + CSP à nonce | `next.config.ts`, `src/proxy.ts` |
| AA-07 | Validation des uploads | `src/app/espace-equipe/articles/actions.ts` |
| AA-08 | Validation `zod` des entrées | `src/app/espace-equipe/{articles,agenda}/actions.ts` |
| AA-09 | Override de `postcss` | `package.json` |
| AA-11 / AA-12 | Durcissement de session, doc `AUTH_URL` | `src/lib/auth.ts` |
| — | Indexation du back-office bloquée | `src/app/robots.ts` |

**Vérifications :** `npx tsc --noEmit` ✓ · `npx eslint src` ✓ (0 erreur) ·
`npx next build` ✓ · `npm audit --omit=dev` → **0 vulnérabilité**.

---

## 1. Politique de mots de passe forts au seed (AA-01)

**Fichier :** `prisma/seed.ts`

**Problème initial.** Le script de seed acceptait n'importe quel mot de passe
(`admin`, `raymondPassword`…), sans aucun contrôle de robustesse, et utilisait un coût
bcrypt de `10`.

**Solution mise en place.** Ajout d'une fonction `assertStrongPassword(email, password)`
appelée avant chaque création / mise à jour de compte, et passage du coût bcrypt à `12`.
Les contrôles imposés :

- longueur minimale de **12 caractères** ;
- rejet d'une **liste noire** de mots de passe courants et des valeurs par défaut
  historiques du dépôt (`admin`, `raymondpassword`, `mariepassword`…) ;
- interdiction d'un mot de passe **contenant l'identifiant** (partie locale de
  l'email) ;
- exigence d'au moins **3 classes de caractères** (minuscules, majuscules, chiffres,
  symboles).

Les emails sont en outre **normalisés en minuscules** avant insertion, pour cohérence
avec la connexion.

**Fonctionnement.** Si un mot de passe ne respecte pas la politique, le script lève une
erreur explicite et s'arrête (`process.exit(1)`) : **aucun compte faible ne peut être
créé**. Le coût bcrypt `12` aligne le seed sur le hash factice utilisé à la connexion
(voir §4), garantissant des temps de hachage homogènes.

**Bénéfices sécurité.** Élimine à la racine la possibilité d'un compte administrateur
trivial ; rend la force brute (même non limitée) nettement plus coûteuse ; un coût
bcrypt plus élevé ralentit le crackage hors-ligne en cas de fuite de la table.

**Impacts.**
- **Application :** les anciens `.env` contenant `admin`/`admin` provoqueront désormais
  l'échec volontaire de `npm run db:seed` — c'est l'effet recherché, l'opérateur doit
  fournir un mot de passe fort.
- **Performances :** bcrypt `12` ≈ 2–4× plus lent que `10` (de l'ordre de ~250 ms par
  hachage). Sans impact perceptible : le hachage n'a lieu qu'au seed et à la connexion,
  opérations rares.

---

## 2. Nettoyage du modèle d'environnement (AA-02)

**Fichier :** `.env.example`

**Problème initial.** Le modèle contenait des secrets réels (chaîne Neon avec mot de
passe, `AUTH_SECRET` d'apparence réelle).

**Solution mise en place.** Remplacement de toutes les valeurs par des **placeholders**
explicites (`UTILISATEUR`, `MOT_DE_PASSE`, `HOTE`…), `AUTH_SECRET=""`, secrets
Cloudinary vides, et ajout d'un avertissement en tête de fichier ainsi que d'un rappel
de la politique de mots de passe.

**Fonctionnement.** Le fichier redevient un simple gabarit documentaire ; aucune valeur
sensible n'y subsiste.

**Bénéfices sécurité.** Supprime le risque de divulgation de secrets via un fichier
voué à circuler / être committé ; clarifie les attentes pour les développeurs.

**Impacts.** Aucun sur l'exécution. **Action opérateur requise** (hors code) : la
présence passée de secrets réels impose leur **rotation** (Neon, Cloudinary,
`AUTH_SECRET`). Voir la check-list finale.

---

## 3. Autorisation serveur par segment + proxy élargi (AA-03, AA-04)

**Fichiers :** `src/app/espace-equipe/articles/layout.tsx` (nouveau),
`src/app/espace-equipe/agenda/layout.tsx` (nouveau), `src/proxy.ts`

**Problème initial.** L'autorisation reposait uniquement sur le proxy, dont le
`matcher` ne couvrait pas le segment `agenda` ; les pages ne re-vérifiaient pas la
session.

**Solution mise en place.**

1. **Deux `layout.tsx`** (un par segment protégé) qui appellent `auth()` côté serveur
   et **redirigent vers `/espace-equipe`** en l'absence de session valide. Un layout
   s'appliquant à toutes les routes enfants, il couvre listes, création et édition.
2. **Proxy élargi** : le `matcher` couvre désormais l'ensemble des pages, et la liste
   `PROTECTED_PREFIXES` inclut **à la fois** `articles` **et** `agenda`.

```ts
// src/app/espace-equipe/agenda/layout.tsx (extrait)
const session = await auth();
if (!session?.user?.id) redirect("/espace-equipe");
```

**Fonctionnement.** La page de connexion `/espace-equipe` reste publique (elle n'est
pas dans un segment protégé). Toute tentative d'accès à `…/articles` ou `…/agenda`
sans session est interceptée **deux fois** : d'abord par le proxy (périphérie), puis,
de manière **autoritative**, par le layout exécuté dans le runtime Node.js au plus près
des données. Le rendu de ces routes devient dynamique (`ƒ`), ce qui est attendu pour des
pages dépendant de la session.

**Bénéfices sécurité.** Ferme la fuite des événements non publiés (AA-03) ; instaure
une **défense en profondeur** : même en cas de défaut du middleware (mauvais matcher,
contournement type CVE-2025-29927), l'accès reste bloqué côté serveur.

**Impacts.**
- **Application :** comportement public inchangé ; le back-office exige désormais une
  session sur **tous** ses segments.
- **Performances :** un appel `auth()` (lecture / vérification du JWT) par requête
  d'administration. Coût négligeable et limité aux pages d'admin.

---

## 4. Rate limiting de connexion + anti-énumération (AA-05, AA-10)

**Fichiers :** `src/lib/rate-limit.ts` (nouveau), `src/lib/auth.ts`

**Problème initial.** Aucune limitation des tentatives de connexion ; oracle temporel
distinguant compte existant / inexistant.

**Solution mise en place.**

1. **Limiteur de débit en mémoire** (`src/lib/rate-limit.ts`) : fenêtre fixe par clé,
   avec `hit(key, limit, windowMs)` et `reset(key)`, et un balayage périodique des
   entrées expirées pour borner la mémoire.
2. **Intégration dans `authorize`** : la clé combine **IP + email** ; budget de **8
   tentatives / 15 minutes**. Au-delà, la connexion est refusée (`return null`) sans
   même interroger la base. Une connexion réussie **réinitialise** le compteur.
3. **Validation `zod`** des identifiants reçus (email normalisé en minuscules, bornes
   de longueur) avant tout traitement.
4. **Comparaison bcrypt constante** : un `DUMMY_HASH` (hash bcrypt de coût `12`) est
   comparé lorsque le compte n'existe pas, de sorte que le temps de réponse soit
   identique à celui d'un mot de passe erroné.

```ts
// src/lib/auth.ts (extraits)
if (!hit(key, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS).ok) return null;
const admin = await prisma.admin.findUnique({ where: { email } });
const isValid = await bcrypt.compare(password, admin?.password ?? DUMMY_HASH);
if (!admin || !isValid) return null;
reset(key);
```

**Fonctionnement.** L'IP est lue depuis `x-forwarded-for` / `x-real-ip` (en-têtes
posés par le reverse proxy / la plateforme). Le compteur vit dans le runtime Node.js et
persiste entre requêtes d'une même instance. Le hash factice garantit qu'un appel
bcrypt a toujours lieu, quel que soit le résultat de la recherche en base.

**Bénéfices sécurité.** Ralentit fortement les attaques par force brute / credential
stuffing (AA-05) ; supprime le canal temporel d'énumération de comptes (AA-10) ; le
message d'erreur reste générique (« Identifiants incorrects »).

**Impacts.**
- **Application :** un utilisateur légitime qui échoue 8 fois en 15 min est
  temporairement bloqué sur cette fenêtre — compromis volontaire. La fenêtre se réarme
  automatiquement.
- **Performances :** négligeable (une `Map` en mémoire). **Limite connue :** sur un
  déploiement **multi-instances / serverless**, le compteur est par instance. Pour une
  limite globale stricte, prévoir un magasin partagé (Upstash / Redis) — documenté en
  commentaire dans `rate-limit.ts`. L'ajout d'un `bcrypt.compare` systématique sur les
  emails inexistants ajoute ~250 ms à ces requêtes : c'est précisément l'effet
  recherché (et un frein supplémentaire à l'énumération).

---

## 5. En-têtes de sécurité + Content-Security-Policy à nonce (AA-06)

**Fichiers :** `next.config.ts`, `src/proxy.ts`

**Problème initial.** Aucun en-tête de sécurité ; pas de CSP ; `X-Powered-By` exposé.

**Solution mise en place.**

**a) En-têtes statiques** (`next.config.ts`, appliqués à toutes les réponses) :

| En-tête | Valeur | Rôle |
| --- | --- | --- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS |
| `X-Content-Type-Options` | `nosniff` | Bloque le MIME sniffing |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (navigateurs anciens) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limite la fuite de Referer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), …` | Coupe les API puissantes inutiles |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isole le contexte de navigation |

`poweredByHeader: false` retire l'en-tête `X-Powered-By`.

**b) CSP à nonce par requête** (`src/proxy.ts`). Le proxy génère un **nonce unique**
par requête, le transmet à Next.js via l'en-tête de requête (Next l'appose alors
automatiquement sur les scripts qu'il émet), et pose la CSP sur la réponse. Directives
principales :

- `default-src 'self'`
- `script-src 'self' 'nonce-…' 'strict-dynamic' https: 'unsafe-inline'`
- `style-src 'self' 'unsafe-inline'`
- `img-src 'self' data: blob: https://res.cloudinary.com`
- `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com`
- `frame-src 'self' https://maps.google.com https://www.google.com`
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `frame-ancestors 'none'`, `upgrade-insecure-requests`

**Fonctionnement.** `'strict-dynamic'` fait confiance aux scripts portant le nonce et à
ceux qu'ils chargent (ainsi Vercel Analytics / Speed Insights fonctionnent sans liste
d'hôtes), tandis que `'unsafe-inline'` et `https:` ne servent que de repli pour les
navigateurs ignorant le nonce (ils sont **ignorés** par ceux qui le supportent).
`frame-src` autorise spécifiquement l'iframe Google Maps de la page Contact ;
`img-src` autorise Cloudinary. La directive `frame-ancestors 'none'` interdit
l'encadrement du site (renforce `X-Frame-Options`).

**Bénéfices sécurité.** Établit une barrière secondaire forte contre l'injection de
scripts (toute exécution de script doit porter le nonce de la requête) ; bloque le
clickjacking ; impose HTTPS (HSTS) ; réduit les fuites via Referer et l'exposition du
framework.

**Impacts.**
- **Application :** la CSP restreint les origines externes. Les intégrations connues
  (Cloudinary, Google Maps, Vercel Analytics, polices `next/font` auto-hébergées) sont
  explicitement autorisées. **Recommandation de validation :** vérifier en
  pré-production l'absence de violations CSP (console navigateur). En cas de doute lors
  d'un déploiement, basculer temporairement l'en-tête en
  `Content-Security-Policy-Report-Only` pour observer sans bloquer.
- **Performances :** génération d'un nonce (UUID) par requête — coût infime. Le rendu
  des pages devient dynamique sur le périmètre du proxy.

---

## 6. Validation des uploads d'images (AA-07)

**Fichier :** `src/app/espace-equipe/articles/actions.ts`

**Problème initial.** `uploadArticleImage` acceptait tout fichier, sans contrôle de
type ni de taille côté serveur.

**Solution mise en place.** Avant tout traitement :

- rejet si la **taille** dépasse **5 Mo** (`MAX_UPLOAD_BYTES`) ;
- rejet si le **type MIME** n'appartient pas à la liste blanche
  (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/avif`) ;
- ajout de `resource_type: "image"` à l'appel Cloudinary.

**Fonctionnement.** Les contrôles s'exécutent côté serveur (non contournables, à la
différence de l'attribut `accept` du `<input>`). Cloudinary, avec `resource_type:
"image"`, refuse en plus toute charge qui ne serait pas une image.

**Bénéfices sécurité.** Empêche l'envoi de fichiers arbitraires non-image ; borne la
consommation mémoire (le fichier est chargé puis encodé en base64 en mémoire) ;
réduit la surface d'abus d'un compte compromis.

**Impacts.**
- **Application :** les images légitimes (formats web courants ≤ 5 Mo) passent sans
  changement ; un dépassement renvoie un message d'erreur clair.
- **Performances :** contrôles O(1), gain net (les fichiers trop lourds sont rejetés
  **avant** mise en mémoire / encodage).

---

## 7. Validation `zod` des entrées serveur (AA-08)

**Fichiers :** `src/app/espace-equipe/articles/actions.ts`,
`src/app/espace-equipe/agenda/actions.ts`

**Problème initial.** Contrôles de présence uniquement ; aucune borne de longueur ;
date non validée ; catégories transtypées sans filtrage.

**Solution mise en place.** Schémas `zod` dédiés :

- **Article :** `title` ≤ 200, `excerpt` ≤ 500, `content` ≤ 50 000, `published`
  booléen, `coverImage` restreint par expression régulière aux URL
  `https://res.cloudinary.com/…` (ou nul). Les `categories` sont **filtrées** contre
  l'ensemble des valeurs réelles de l'enum Prisma.
- **Événement :** `title` ≤ 200, `description` ≤ 5 000, `category` ≤ 100, `published`
  booléen, et `date` validée via `Date.parse` (rejet des dates invalides).

En cas d'échec, l'action lève une erreur portant le **premier message de validation**.

**Fonctionnement.** `safeParse` analyse les champs du `FormData`. Les chaînes sont
`trim`ées et bornées ; seules des données conformes atteignent Prisma.

**Bénéfices sécurité.** Empêche les écritures surdimensionnées (DoS applicatif /
gonflement de la base) ; garantit l'intégrité (dates valides, catégories légitimes,
image de couverture nécessairement Cloudinary) ; réduit la confiance accordée aux
entrées du formulaire.

**Impacts.**
- **Application :** les contenus légitimes passent ; les contenus hors limites sont
  refusés explicitement.
- **Performances :** validation négligeable ; `zod` était déjà installé (aucune
  dépendance ajoutée).

---

## 8. Correctif de dépendance `postcss` (AA-09)

**Fichier :** `package.json`

**Problème initial.** `npm audit` signalait `postcss@8.4.31` (embarqué par `next`)
comme modérément vulnérable.

**Solution mise en place.** Ajout d'un bloc `overrides` forçant `postcss` vers
`^8.5.15` sur tout l'arbre de dépendances.

```json
"overrides": { "postcss": "^8.5.15" }
```

**Fonctionnement.** npm résout désormais une seule version corrigée de `postcss`
(`8.5.15`), **dédupliquée** y compris pour la copie interne de `next`.

**Bénéfices sécurité.** Ramène `npm audit --omit=dev` à **0 vulnérabilité** ; aligne le
projet sur les bonnes pratiques d'hygiène des dépendances.

**Impacts.**
- **Application :** `postcss` 8.4 → 8.5 est une montée mineure rétrocompatible ; le
  `next build` a été rejoué avec succès.
- **Performances :** aucun impact à l'exécution (dépendance de **build** uniquement).

---

## 9. Durcissement de session (AA-12) et note `trustHost` / `AUTH_URL` (AA-11)

**Fichier :** `src/lib/auth.ts`

**Problème initial.** Durée de session par défaut (30 j) ; `trustHost: true` sans URL
canonique documentée.

**Solution mise en place.**

- Session bornée : `maxAge: 8h`, `updateAge: 1h` (rafraîchissement du JWT au plus une
  fois par heure).
- Conservation de `trustHost: true` (nécessaire en auto-hébergement) **documentée** par
  un commentaire invitant à fixer `AUTH_URL` en production pour épingler l'hôte.

**Fonctionnement.** Au-delà de 8 h, la session expire et impose une nouvelle
authentification ; le jeton n'est ré-émis qu'au plus une fois par heure (limite la
charge de signature).

**Bénéfices sécurité.** Réduit la fenêtre d'exploitation d'un cookie de session volé ;
`AUTH_URL` fixé neutralise les manipulations basées sur l'en-tête `Host`.

**Impacts.**
- **Application :** les administrateurs se reconnectent au moins toutes les 8 h.
- **Performances :** négligeable.

---

## 10. Blocage de l'indexation du back-office (durcissement complémentaire)

**Fichier :** `src/app/robots.ts` (nouveau)

**Problème initial.** Le back-office était protégé par `robots: { index: false }` au
niveau de chaque page, mais aucun `robots.txt` global ne déclarait l'exclusion.

**Solution mise en place.** Ajout d'un `robots.ts` (route metadata Next.js) qui génère
un `robots.txt` autorisant `/` et **interdisant** `/espace-equipe`.

**Fonctionnement.** Next.js sert automatiquement `/robots.txt` à partir de ce fichier
(visible dans la sortie du build).

**Bénéfices sécurité.** Défense en profondeur contre la découverte du back-office via
les moteurs de recherche ; réduit la divulgation passive de la surface d'admin.

**Impacts.** Aucun sur les pages publiques (toujours indexables).

---

## 11. Vérifications effectuées

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Typage | `npx tsc --noEmit` | ✓ 0 erreur |
| Lint | `npx eslint src` | ✓ 0 erreur (2 warnings préexistants, hors périmètre) |
| Build de production | `npx next build` | ✓ succès ; routes `espace-equipe` rendues dynamiques ; `/robots.txt` et Proxy enregistrés |
| Dépendances (prod) | `npm audit --omit=dev` | ✓ **0 vulnérabilité** |

---

## 12. Check-list des actions opérateur restantes

Ces actions relèvent de l'exploitation (hors code) et **doivent** être réalisées :

- [ ] **Rotation `DATABASE_URL`** : régénérer le mot de passe de la base Neon, mettre à
  jour `.env`.
- [ ] **Rotation Cloudinary** : régénérer la paire de clés API.
- [ ] **Rotation `AUTH_SECRET`** : `npx auth secret` (invalide les sessions en cours).
- [ ] **Mots de passe admin forts** : renseigner `ADMIN_PASSWORD` (12+ car., 3 classes)
  puis `npm run db:seed`.
- [ ] **`AUTH_URL`** : définir l'URL canonique en production.
- [ ] **Reverse proxy** : transmettre correctement `X-Forwarded-For` (efficacité du
  rate limiting) et verrouiller l'en-tête `Host`.
- [ ] **Validation CSP** : vérifier l'absence de violations en pré-production (envisager
  `Content-Security-Policy-Report-Only` lors du premier déploiement).
- [ ] **Multi-instances** (optionnel) : si le site est mis à l'échelle horizontalement,
  remplacer le rate limiter en mémoire par un magasin partagé (Upstash / Redis).
