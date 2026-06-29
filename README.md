# Les Ateliers Angevins — nouveau site

Site Next.js (App Router) + TypeScript + Tailwind CSS, remplaçant ateliersangevins.org. Inclut un
espace équipe protégé pour gérer les articles du blog (lien discret « Espace équipe » en pied de
page).

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Prisma** + PostgreSQL (compatible Neon, Supabase, Railway, ou un Postgres auto-hébergé)
- **Auth.js (NextAuth v5)** — comptes admin fixes (Credentials), session JWT
- **Cloudinary** — upload des images de couverture d'articles
- **react-markdown** — rendu du contenu des articles (écrits en Markdown)

## Installation

```bash
npm install
cp .env.example .env
```

Remplissez `.env` :

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL (ex: créez une base gratuite sur [neon.tech](https://neon.tech)) |
| `AUTH_SECRET` | Générez avec `npx auth secret` |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Créez un compte gratuit sur [cloudinary.com](https://cloudinary.com) → Dashboard |
| `ADMIN_EMAIL` / `ADMIN_NAME` / `ADMIN_PASSWORD` | Premier compte admin (ex: Raymond) |
| `ADMIN2_EMAIL` / `ADMIN2_NAME` / `ADMIN2_PASSWORD` | Second compte admin, optionnel (ex: Marie) |

Puis créez les tables et les comptes admin :

```bash
npm run db:push    # crée les tables à partir de prisma/schema.prisma
npm run db:seed    # crée les comptes admin à partir des variables ADMIN_*
```

Lancez le serveur de développement :

```bash
npm run dev
```

Le site est sur http://localhost:3000, l'espace équipe sur http://localhost:3000/espace-equipe.

## Gérer les articles

Une fois connecté sur `/espace-equipe`, vous arrivez sur `/espace-equipe/articles` :
créer, modifier, publier/dépublier ou supprimer un article. Le contenu s'écrit en Markdown
(titres `##`, **gras**, *italique*, listes, liens...). L'image de couverture est envoyée
directement sur Cloudinary depuis le formulaire.

Pour ajouter un nouveau compte admin plus tard, ajoutez son email/mot de passe dans `.env`
(`ADMIN2_*` ou modifiez `prisma/seed.ts` pour en ajouter d'autres) puis relancez
`npm run db:seed`.

## Déploiement

Le projet n'est lié à aucun hébergeur en particulier :

- **Vercel** : connectez le repo, ajoutez les variables d'environnement ci-dessus, c'est prêt.
- **VPS / serveur perso** : `npm run build` puis `npm run start` (Node 20+), avec un reverse
  proxy (nginx) devant. La base PostgreSQL et Cloudinary fonctionnent indépendamment de
  l'hébergeur choisi.
