# React Poster (Next.js Edition)

This is a social media style application where users can share short messages. Originally built as a React SPA with Vite, it has been migrated to **Next.js** using the **App Router**, **Server Components**, and **Server Actions**.

## Getting Started

To run this project, you need to have **Node.js 20.9.0 or later** installed on your machine (Next.js 15+ requirement).

### 1. Install Dependencies

First, install the dependencies for both the frontend and the backend:

```bash
# In the root folder
npm install

# In the dummy-backend folder
cd dummy-backend
npm install
cd ..
```

### 2. Run the Application

You can run both the frontend and the backend concurrently with a single command from the root folder:

```bash
npm run dev
```

*   **Frontend**: Runs on [http://localhost:3000](http://localhost:3000)
*   **Backend**: Runs on [http://localhost:8080](http://localhost:8080)

### 3. Stop the Application

To stop all running services, press `Ctrl + C` in the terminal window where you ran `npm run dev`.

---

## Separate Controls

If you prefer to run or stop services independently:

### Backend Only (Port 8080)
To run only the backend server:
```bash
npm run dev-backend
```
*Alternatively, you can run `cd dummy-backend && npm start`.*

### Frontend Only (Port 3000)
To run only the Next.js frontend:
```bash
npm run dev-frontend
```

## Migration Highlights (Vite to Next.js)

The application now leverages modern Next.js features:
- **App Router**: Organized folder-based routing in `src/app`.
- **Server Components**: Data fetching happens on the server for better performance and SEO.
- **Server Actions**: Form submissions are handled via secure server-side functions.
- **API Routes**: Proxy routes in `src/app/api` manage communication with the legacy backend.
- **Optimized Navigation**: Uses `next/link` and `next/navigation` for seamless transitions.

## Features
- **Shared Header**: Consistent navigation and branding across all routes.
- **Dynamic Post List**: Fetches and displays posts from the backend server.
- **Modals via Routing**: Creating and viewing posts use nested routes that render in modals.
- **Data Persistence**: New posts are saved to `dummy-backend/posts.json`.
- **Responsive Design**: Styled with CSS Modules and optimized for various screen sizes.
