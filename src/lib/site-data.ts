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
    slug: "radiesthesie",
    name: "Radiesthésie",
    shortDescription: "La détection bio-sensible à l'aide du pendule et de la baguette.",
    description:
      "La radiesthésie est une pratique de détection bio-sensible utilisant des outils tels que le pendule ou la baguette, permettant d'explorer des informations non perceptibles par les sens habituels.",
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
    name: "Raymond Denis",
    role: "Président & formateur",
    bio: "Sourcier et géobiologue, il dirige le programme de formation en géobiologie de l'association.",
    image: "/images/team-test/Raymond-Denis.jpg",
  },
  {
    name: "Marie Brisseau",
    role: "Fondatrice & trésorière adjointe",
    bio: "Experte en magnétisme, chromothérapie et thérapie par les formes, formée par diverses institutions reconnues.",
    image: "/images/team-test/Marie.jpg",
  },
  {
    name: "Jean-Pierre Brisseau",
    role: "Fondateur & trésorier",
    bio: "Spécialiste en géobiologie et tracés régulateurs, avec une formation complète en bio-énergie.",
    image: "/images/team-test/Jean-Pierre-Brisseau.jpg",
  },
  {
    name: "Jocelyne Pivette",
    role: "Intervenante",
    bio: "Consultante en Feng Shui, elle accompagne particuliers et professionnels dans l'harmonisation de leurs espaces.",
    image: "/images/team-test/Jocelyne-Pivette.png",
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
