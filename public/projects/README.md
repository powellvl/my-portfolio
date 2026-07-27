# Images des projets

Dépose ici les visuels de chaque projet. Ils sont servis tels quels (dossier `public/`),
donc **aucune modification de code n'est nécessaire** : il suffit que le nom du fichier
corresponde au chemin indiqué dans `src/data/projects.js` (champ `image`).

## Nommage attendu (par défaut)

| Projet  | Fichier attendu             |
| ------- | --------------------------- |
| Vizara  | `public/projects/vizara.jpg` |
| Unifox  | `public/projects/unifox.jpg` |
| Echo    | `public/projects/echo.jpg`   |

Autre extension (`.png`, `.webp`) ? Change simplement la valeur de `image` dans
`src/data/projects.js` — par exemple `image: "/projects/unifox.webp"`.

## Format conseillé

- **Ratio 16/9** (le cadre est en `aspect-ratio: 16 / 9`, recadrage en `object-fit: cover`).
- Largeur ~1600–2000 px, poids < 400 Ko (`.webp` recommandé pour la performance).

Tant qu'un fichier est absent, la cover de couleur du projet s'affiche automatiquement
à la place — rien ne casse.
