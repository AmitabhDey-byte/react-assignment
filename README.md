# Artworks DataTable – PrimeReact

A React + TypeScript application that displays artworks using server-side pagination with persistent row selection and bulk selection functionality.

The application uses the Art Institute of Chicago public API and PrimeReact's DataTable component.

---

## Features

- Server-side pagination
- Lazy loading
- Multi-row selection
- Persistent selection across pages
- Bulk row selection using OverlayPanel
- Loading state handling
- TypeScript implementation

---

## Tech Stack

- React
- TypeScript
- PrimeReact
- PrimeIcons
- Fetch API
- Vite

---

## Installation

Clone the repository:

```bash
git clone https://github.com/AmitabhDey-byte/react-assignment
cd react-assignment
```

Install dependencies:

```bash
npm install
```

---

## Run Locally

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

This generates a `dist` folder containing the production build.

---

## Deployment (Netlify)

If deploying via GitHub:

Build command:
```
npm run build
```

Publish directory:
```
dist
```

If deploying manually:

1. Run `npm run build`
2. Upload the `dist` folder to Netlify

---

## API Used

Art Institute of Chicago API:

```
https://api.artic.edu/api/v1/artworks
```

Fields fetched:

- id
- title
- artist_display
- place_of_origin
- date_start
- date_end
- inscriptions

---

## Implementation Details

- Pagination is handled server-side using `page` and `limit` query parameters.
- DataTable is configured with `lazy` loading.
- Row selection is managed using `dataKey="id"` to maintain stable selection.
- Bulk selection retrieves records in a single API request.
- OverlayPanel uses `appendTo={document.body}` to prevent layout clipping issues.

---

## Project Structure

```
src/
 ├── ArtworksDataTable.tsx
 ├── App.tsx
 └── main.tsx
```

---

## Required Style Imports

Ensure the following imports exist in `main.tsx`:

```tsx
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

---

## License

This project is created for educational or assignment purposes.
