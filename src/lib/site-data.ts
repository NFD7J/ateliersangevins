export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "Qui sommes-nous ?" },
  { href: "/programmes", label: "Programmes" },
  { href: "/agenda", label: "Agenda" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const contact = {
  address: ["Les Ateliers Angevins","5, rue des Mimosas", "Lotissement Les Tilleuls", "49640 Daumeray"],
  phones: [
    { name: "Raymond Denis", number: "06 08 67 05 01" },
    { name: "Marie Brisseau", number: "06 61 75 66 78" },
  ],
  emails: ["ateliersangevins@hotmail.com", "brissmarie35@gmail.com"],
  facebook: "https://www.facebook.com/",
  youtube: "https://www.youtube.com/@AteliersAngevins-m6q",
  mapsQuery: "47.702725932929404, -0.35775632096358817",
  // Carte Google My Maps (plusieurs marqueurs). Colle ici le `src` de l'iframe
  // fourni par My Maps (⋮ → Intégrer sur mon site), au format .../maps/d/embed?mid=...
  mapEmbedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1tkvjyv5SW3QUWtRqUaKldXkcXwY1GNE&ehbc=2E312F&noprof=1",
};

export type Domain = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
};

export const domains: Domain[] = [
  {
    slug: "geobiologie",
    name: "Géobiologie",
    shortDescription:
      "Véritable démarche d'observation et d'analyse, la géobiologie vise à créer ou restaurer un environnement harmonieux, propice à l'équilibre et à la qualité de vie.",
    description:
      "La géobiologie consiste en l'étude des relations de l'environnement, des ondes liées aux champs électromagnétiques et de l'ensemble des influences sur le vivant. Elle permet d'identifier les perturbations d'un lieu (réseaux telluriques, ondes électromagnétiques, pollutions diverses) afin de retrouver un habitat sain et harmonieux.",
    icon: "🌳",
  },
  {
    slug: "magnetisme",
    name: "Magnétisme & thérapies énergétiques",
    shortDescription:
      "Une formation complète alliant les fondamentaux du magnétisme, des thérapies vibratoires et de la thérapie par les formes, afin d'acquérir des compétences solides et de développer une pratique énergétique rigoureuse, cohérente et structurée.",
    description:
      "Le magnétisme et les thérapies énergétiques regroupent un ensemble de techniques de soin visant à rétablir l'équilibre énergétique de la personne : magnétisme, chromothérapie, thérapie par les formes et autres outils de bio-énergie.",
    icon: "✋",
  },
  {
    slug: "sourcellerie",
    name: "Sourcellerie",
    shortDescription: "La détection de l'eau souterraine à l'aide de techniques traditionnelles.",
    description:
      "La sourcellerie est l'art de détecter la présence d'eau souterraine grâce à des outils simples (baguette, pendule) et à une sensibilité affinée par la pratique. Une compétence ancestrale toujours utile aujourd'hui.",
    icon: "💧",
  },
  {
    slug: "sylvotherapie",
    name: "Sylvothérapie",
    shortDescription: "Se ressourcer et se soigner au contact des arbres et de la forêt.",
    description:
      "La sylvothérapie, ou « bain de forêt », propose de se reconnecter à la nature et aux arbres pour apaiser le corps et l'esprit. Nos sorties en forêt allient marche consciente, respiration et exercices de reconnexion énergétique.",
    icon: "🌲",
  },
  {
    slug: "acupressure",
    name: "Acupressure",
    shortDescription: "La thérapie par acupression est fondée sur la médecine chinoise. C'est une méthode de thérapie corporelle qui opère sous forme de pressions sur les points d'acupuncture du corps habillé de la personne traitée.",
    description:
      "La thérapie par acupression est fondée sur la médecine chinoise. C'est une méthode de thérapie corporelle qui opère sous forme de pressions sur les points d'acupuncture du corps habillé de la personne traitée.",
    icon: "🔮",
  },
  {
    slug: "traces-des-batisseurs",
    name: "Tracés des bâtisseurs",
    shortDescription: "L'harmonisation des lieux par les tracés régulateurs anciens.",
    description:
      "Les tracés des bâtisseurs sont des techniques géométriques anciennes utilisées pour harmoniser un lieu, en s'appuyant sur les tracés régulateurs employés depuis des siècles dans l'architecture sacrée.",
    icon: "📐",
  },
  {
    slug: "mandala",
    name: "Mandala",
    shortDescription: "L'harmonisation des lieux par les mandalas.",
    description:
      "Les mandalas sont des motifs géométriques utilisés pour harmoniser un lieu et favoriser la méditation et la concentration.",
    icon: "📐",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Marie Brisseau",
    role: "Fondatrice, trésorière adjointe & formatrice",
    bio: "Praticienne en thérapies vibratoires et thérapie par les formes, Marie met son expérience au service de l'accompagnement énergétique et de la transmission.",
    image: "/images/team/Marie.jpg",
  },
  {
    name: "Raymond Denis",
    role: "Président & formateur en géobiologie",
    bio: "Sourcier et géobiologue, Raymond transmet son expérience de la géobiologie et de l'harmonisation des lieux avec une approche concrète et pédagogique.",
    image: "/images/team/Raymond-Denis.jpg",
  },
  {
    name: "Jean-Pierre Brisseau",
    role: "Fondateur & trésorier",
    bio: "Spécialiste en géobiologie et tracés régulateurs, Jean-Pierre partage son expertise de l'étude et de l'harmonisation des lieux.",
    image: "/images/team/Jean-Pierre-Brisseau.jpg",
  },
  {
    name: "Christelle Le Bot",
    role: "Consultante & formatrice",
    bio: "Praticienne en thérapies énergétiques, Christelle coanime les stages et accompagne les participants dans leur pratique.",
    image: "/images/team/Christelle-Le-Bot.jpg",
  },
  {
    name: "Jérôme Crosnier",
    role: "Formateur",
    bio: "Géobiologue et consultant en magnétisme et thérapies énergétiques, Jérôme transmet une approche pratique et accessible des techniques énergétiques.",
    image: "/images/team/Jerome-Crosnier.jpg",
  },
];
