export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/programmes", label: "Programmes" },
  { href: "/agenda", label: "Agenda" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const contact = {
  address: ["5, rue des Mimosas", "Lotissement Les Tilleuls", "49640 Daumeray"],
  phones: [
    { name: "Raymond Denis", number: "06 08 67 05 01" },
    { name: "Marie Brisseau", number: "06 61 75 66 78" },
  ],
  emails: ["ateliersangevins@hotmail.com", "brissmarie35@gmail.com"],
  facebook: "https://www.facebook.com/",
  mapsQuery: "47.702725932929404, -0.35775632096358817",
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
      "L'étude des relations entre l'environnement, les ondes et leurs influences sur le vivant.",
    description:
      "La géobiologie consiste en l'étude des relations de l'environnement, des ondes liées aux champs électromagnétiques et de l'ensemble des influences sur le vivant. Elle permet d'identifier les perturbations d'un lieu (réseaux telluriques, ondes électromagnétiques, pollutions diverses) afin de retrouver un habitat sain et harmonieux.",
    icon: "🌳",
  },
  {
    slug: "magnetisme",
    name: "Magnétisme & thérapies énergétiques",
    shortDescription:
      "Chromothérapie, thérapie par les formes et techniques de soin par l'énergie.",
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
    role: "Co-fondatrice & formatrice",
    bio: "Thérapeute énergéticienne – Formatrice en Thérapies Énergétiques Magnétisme • thérapies naturelles• Acupressure • Libérations énergétiques • Protocoles thérapeutiques intégratifs",
    image: "/images/team-test/Marie.jpg",
  },
  {
    name: "Raymond Denis",
    role: "Président & formateur",
    bio: "Sourcier et géobiologue, il dirige le programme de formation en géobiologie de l'association.",
    image: "/images/team-test/Raymond-Denis.jpg",
  },
  {
    name: "Jean-Pierre Brisseau",
    role: "Co-fondateur & trésorier",
    bio: "Référent en géobiologie et en tracés régulateurs, il met son expertise au service de l'équilibre des lieux et de la transmission de ces disciplines au sein des Ateliers Angevins.",
    image: "/images/team-test/Jean-Pierre-Brisseau.jpg",
  },
  {
    name: "Christelle Le Bot",
    role: "Consultante & formatrice",
    bio: "Spécialisée en thérapies énergétiques, elle anime des ateliers pratiques tout au long de l'année.",
    image: "/images/team-test/Christelle-Le-Bot.jpg",
  },
  {
    name: "Jérôme Crosnier",
    role: "Formateur",
    bio: "Expert en géobiologie, magnétisme et thérapie énergétique.",
    image: "/images/team-test/Jerome-Crosnier.jpg",
  },
];
