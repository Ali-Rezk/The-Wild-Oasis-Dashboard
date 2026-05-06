# The Wild Oasis

A full-featured hotel management internal dashboard for managing cabins, bookings, guests, and staff. Built as a React SPA with a Supabase backend.

## Features

- **Dashboard** — Overview stats, sales & duration charts, and today's check-in/check-out activity
- **Bookings** — Full CRUD with filtering, sorting, and pagination; create and edit bookings via modal form with inline guest/cabin picker; check-out and delete actions per row
- **Cabins** — Manage cabin listings with image uploads, pricing, and discount settings
- **Guests** — Guest directory with country flags and profile details
- **Check-in / Check-out** — Streamlined check-in flow with optional breakfast add-on
- **Settings** — Configurable hotel-wide settings (breakfast price, min/max nights, max guests)
- **User Management** — Create new staff accounts and update profile / password
- **Dark Mode** — Persistent dark/light mode toggle via React Context + localStorage

## Tech Stack

### Frontend

| Tool                                                                    | Purpose                                         |
| ----------------------------------------------------------------------- | ----------------------------------------------- |
| [React 19](https://react.dev/)                                          | UI library                                      |
| [React Router DOM v7](https://reactrouter.com/)                         | Client-side routing & protected routes          |
| [TanStack Query v5](https://tanstack.com/query)                         | Server state management, caching, and mutations |
| [React Hook Form v7](https://react-hook-form.com/)                      | Form state and validation                       |
| [Recharts](https://recharts.org/)                                       | Sales and duration charts                       |
| [Tailwind CSS v4](https://tailwindcss.com/)                             | Utility-first styling                           |
| [React Hot Toast](https://react-hot-toast.com/)                         | Toast notifications                             |
| [React Icons](https://react-icons.github.io/react-icons/)               | Icon library                                    |
| [React Error Boundary](https://github.com/bvaughn/react-error-boundary) | Graceful error handling                         |
| [date-fns](https://date-fns.org/)                                       | Date formatting and calculations                |
| [countries-list](https://www.npmjs.com/package/countries-list)          | Country data and flags                          |

### Backend / Infrastructure

| Tool                              | Purpose                                     |
| --------------------------------- | ------------------------------------------- |
| [Supabase](https://supabase.com/) | PostgreSQL database, Auth, and file storage |

### Build & Dev Tools

| Tool                                                             | Purpose                                            |
| ---------------------------------------------------------------- | -------------------------------------------------- |
| [Vite 8](https://vite.dev/)                                      | Build tool and dev server                          |
| [React Compiler (Babel)](https://react.dev/learn/react-compiler) | Automatic memoization via compiler transforms      |
| [ESLint 9](https://eslint.org/)                                  | Linting with react-hooks and react-refresh plugins |
| [Vercel](https://vercel.com/)                                    | Deployment                                         |

## Project Structure

```
src/
├── context/          # React Context providers (dark mode)
├── data/             # Seed data and uploader utility
├── features/         # Feature-based modules
│   ├── authentication/
│   ├── bookings/
│   ├── cabins/
│   ├── check-in-out/
│   ├── dashboard/
│   ├── guests/
│   └── settings/
├── hooks/            # Shared custom hooks
├── pages/            # Route-level page components
├── services/         # Supabase API layer
├── ui/               # Reusable UI components
└── utils/            # Constants and helper functions
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables** — create a `.env.local` file:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
