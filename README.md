# React Artworks DataTable

This project is a React application built using Vite and PrimeReact.  
It displays artwork data from the Art Institute of Chicago API with proper server-side pagination.

---

## Features

- Server-side pagination
- Lazy loading using PrimeReact DataTable
- Rows per page selection
- Current page report display
- Loading indicator during API calls
- Minimal and clean UI

---

## Tech Stack

- React (Vite)
- TypeScript
- PrimeReact
- PrimeIcons
- Fetch API

---

## Installation

Clone the repository:

git clone <your-repo-link>  
cd <your-project-folder>

Install dependencies:

npm install

Start development server:

npm run dev

---

## API Used

Art Institute of Chicago API:

https://api.artic.edu/api/v1/artworks

Pagination is handled server-side using:
- page
- limit
- selected fields

---

## Project Structure

src/
 ├── Artworks.tsx  
 ├── App.tsx  
 ├── main.tsx  
 └── App.css  

---

## Implementation Details

- PrimeReact DataTable is configured in lazy mode.
- Pagination state (page and rows) triggers API refetch via useEffect.
- Total records are obtained from API pagination metadata.
- Only required fields are requested to reduce payload size.
- Server-side pagination ensures scalability for large datasets.

---

## Notes

This project focuses on implementing proper server-side pagination logic using a third-party UI component while keeping the architecture simple and maintainable.
