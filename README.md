# React TypeScript TanStack Query Project

A modern React application built with **Vite**, **TanStack Router**, **TanStack Query**, and **openapi‑fetch**.  
It demonstrates authentication (JWT, refresh token), posts & products management, comments, pagination, theme switching (light/dark), real‑time chat via WebSocket, and performance optimizations.

## Features

### Authentication

- Login with username/password; access and refresh tokens stored in `localStorage`.
- Automatic token refresh on 401 responses (queued requests).
- Logout clears tokens and user data.
- Protected routes (via `beforeLoad` guards).

### Posts & Products

- Paginated lists (10 items per page) with navigation controls.
- Detailed view for each post (with comments) and product (with reviews).
- Data caching and background refetching via TanStack Query.

### WebSocket Chat

- Real‑time messaging using WebSocket (`wss://ws.ifelse.io`).
- Connection status indicator (Online / Offline).
- Auto‑scroll to latest messages.

### Theme

- Light / Dark mode toggle.
- User preference saved in `localStorage`.
- Applied via Tailwind CSS dark class.

### Performance & SEO

- Lazy loading of pages (code splitting) with `lazyRouteComponent`.
- Component memoization (`React.memo`) to prevent unnecessary re‑renders.
- Dynamic meta tags (title, description) for better SEO.
- Optimized images with `loading="lazy"` and proper `alt` attributes.

### UI & Accessibility

- Responsive design (mobile‑first, grid layout).
- Accessible navigation with `aria-current` indicators.
- Built with **shadcn/ui** components and Tailwind CSS.

---

## Tech Stack

| Category           | Technologies                                                 |
| ------------------ | ------------------------------------------------------------ |
| **Frontend**       | React 19                                                     |
| **Build Tool**     | Vite 8                                                       |
| **Routing**        | TanStack Router (file‑based)                                 |
| **State / Data**   | TanStack Query (server‑state) + openapi‑fetch (HTTP client)  |
| **Styling**        | Tailwind CSS 4 + shadcn/ui (with `class-variance-authority`) |
| **Authentication** | JWT (access + refresh tokens, stored in `localStorage`)      |
| **Real‑time**      | WebSocket (native browser API)                               |
| **Code Quality**   | ESLint + TypeScript 6                                        |
| **API Schema**     | OpenAPI (generated types with `openapi-typescript`)          |

---

## Installation and Running

1. Clone the repository

```
   git clone
   cd innowise-rtsp
```

2. Install dependencies

```
    pnpm install
      or
    npm install
```

3. Start the development server

```
    pnpm run dev
      or
    npm run dev
```

4. Open in your browser:

```
     Open http://localhost:5173 in your browser.
```

5. Build for production

```
    pnpm run build
      or
    npm run build
```

6. Preview the production build (optional)

```
    pnpm run preview
      or
    npm run preview
```

## Test Credentials

Use the following DummyJSON credentials to log in:

- **Username**: `emilys`
- **Password**: `emilyspass`

## Project Structure (FSD)

```
src/
├── app/                    # Application entry, routes (TanStack Router)
│   ├── routes/             # File‑based route definitions
│   │   ├── __root.tsx      # Root layout
│   │   ├── login.tsx
│   │   ├── chat.tsx
│   │   ├── posts/
│   │   ├── products/
│   │   └── routeTree.gen.ts (auto‑generated)
│   ├── layouts/            # Layout components (RootLayout)
│   └── styles/             # Global CSS (Tailwind imports)
├── features/               # Feature modules (auth, posts, products, chat)
│   ├── auth/
│   │   ├── api/            # authApi.ts (login, me, refresh)
│   │   ├── types/          # Auth types
│   │   └── ui/             # LoginPage
│   ├── posts/
│   │   ├── api/            # postsApi.ts (using generic client)
│   │   ├── hooks/          # usePosts, usePost, usePostComments
│   │   ├── types/          # Post, Comment types
│   │   └── ui/             # Posts, PostList, PostCard, PostComments
│   ├── products/
│   │   ├── api/            # productsApi.ts
│   │   ├── hooks/          # useProducts, useProduct
│   │   ├── types/          # Product, Review types
│   │   └── ui/             # Products, ProductList, ProductCard, ProductReviews
│   └── chat/
│       ├── hooks/          # useWebSocket
│       └── ui/             # ChatPage
├── shared/                 # Shared utilities, components, API client
│   ├── api/
│   │   ├── client.ts       # openapi‑fetch client with auth interceptor
│   │   ├── createApiClient.ts  # generic paginated API client factory
│   │   ├── context/        # AuthContext (AuthProvider, useAuth)
│   │   └── schema.ts       # auto‑generated OpenAPI types
│   ├── components/         # Reusable UI (Header, Pagination, Cards, etc.)
│   ├── hooks/              # usePaginatedQuery, useTheme
│   ├── lib/                # cn() utility
│   └── types/              # Common types (PaginatedResponse)
├── pages/                  # Page components (lazy‑loaded)
│   ├── posts-page.tsx
│   ├── post-detail-page.tsx
│   ├── products-page.tsx
│   ├── product-detail-page.tsx
│   └── chat-page.tsx
├── .gitignore
├── components.json         # shadcn/ui configuration
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Links

- **API**: [DummyJSON](https://dummyjson.com)
