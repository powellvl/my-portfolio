// Projets — défilé horizontal (accueil) + page détail /projet/:id.
// `image`       : cover principale (importée depuis src/img/cover, sinon cover couleur).
// `link`        : URL du site live (bouton "Voir le site" sur la page détail).
// `meta`        : lignes de contexte courtes (mono).
// `description` : chapô / intro affiché en haut de la page détail.
// `sections`    : blocs titrés d'étude de cas [{ title, body }] — ajoute-en autant
//                 que tu veux (Contexte, Mon rôle, Approche, Résultat, …).
// `gallery`     : images supplémentaires sur la page détail (chemins /projects/...).
import vizaraCover from "../img/cover/vizara.png";
import unifoxCover from "../img/cover/unifox.png";
import echoCover from "../img/cover/echo.jpg";

export const projects = [
  {
    id: "vizara",
    index: "01",
    title: "Vizara",
    year: "2024",
    meta: [
      "Premier projet freelance",
      "UI/UX & Développement",
      "Thème WordPress sur-mesure",
    ],
    image: vizaraCover,
    link: "",
    cover: "#1b1830",
    description:
      "Premier projet mené en freelance : un thème WordPress entièrement sur-mesure, du design d'interface jusqu'à l'intégration front et back. L'objectif était un site rapide, éditable de bout en bout par le client, loin des templates génériques.",
    sections: [
      {
        title: "Contexte",
        body: "Un client qui voulait sortir d'un template WordPress générique pour un site à son image — rapide, sobre et facile à mettre à jour lui-même.",
      },
      {
        title: "Mon rôle",
        body: "Direction artistique, design d'interface sur Figma, puis intégration complète front et back dans un thème WordPress sur-mesure.",
      },
      {
        title: "Approche",
        body: "Maquettes validées étape par étape, puis développement du thème (templates, champs personnalisés) pour que chaque section reste éditable sans toucher au code.",
      },
      {
        title: "Résultat",
        body: "Un site plus rapide, cohérent avec l'identité de la marque, et autonome côté contenu.",
      },
    ],
    gallery: [],
  },
  {
    id: "unifox",
    index: "02",
    title: "Unifox",
    year: "2024",
    meta: ["Stage de 2 mois", "Web designer UI/UX &", "Web développeur"],
    image: unifoxCover,
    link: "",
    cover: "#26244a",
    description:
      "Stage de deux mois en tant que web designer UI/UX et développeur. Refonte de l'interface produit et mise en place d'un système de composants réutilisables, du wireframe jusqu'à l'intégration.",
    sections: [
      {
        title: "Contexte",
        body: "Stage au sein de l'équipe produit, sur la refonte de l'interface et la structuration d'un système de composants réutilisables.",
      },
      {
        title: "Mon rôle",
        body: "Web designer UI/UX et développeur : des wireframes jusqu'à l'intégration des écrans. ",
      },
      {
        title: "Approche",
        body: "Audit de l'existant, création d'une bibliothèque de composants cohérente, puis intégration progressive écran par écran.",
      },
      {
        title: "Résultat",
        body: "Un site web fait main, interface plus claire et cohérente, mélant design et développement pour un produit plus rapide et agréable à utiliser.",
      },
    ],
    gallery: [],
  },
  {
    id: "echo",
    index: "03",
    title: "Echo",
    year: "2023",
    meta: ["Marque de vêtements connectés", "Branding & direction artistique"],
    image: echoCover,
    link: "",
    cover: "#13242a",
    description:
      "Marque de vêtements connectés. Création de l'identité visuelle complète — logo, système graphique, direction artistique et déclinaisons produit. S'inscrivant dans un projet plus large, l'identité devait être reconnaissable et cohérente, ce premier projet porté sur une collaboration fictive avec Aphex Twin.",
    sections: [
      {
        title: "Contexte",
        body: "Lancement d'une marque de vêtements connectés cherchant une identité forte et reconnaissable, du print au digital.",
      },
      {
        title: "Mon rôle",
        body: "Direction artistique et création de l'identité visuelle complète.",
      },
      {
        title: "Livrables",
        body: "Logo, système graphique, déclinaisons produit et guidelines de marque.",
      },
      {
        title: "Résultat",
        body: "Une identité cohérente et reconnaissable sur l'ensemble des supports.",
      },
    ],
    gallery: [],
  },
];

// Helpers pour la page détail (voisinage prev/suivant).
export const getProject = (id) => projects.find((p) => p.id === id);
export const getProjectIndex = (id) => projects.findIndex((p) => p.id === id);
