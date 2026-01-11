# React Poster SPA

This is a React-based "Social Media" style application where users can share short messages. It includes a frontend built with Vite/React and a local Node.js/Express backend for data persistence.

## Getting Started

To run this project, you need to have **Node.js** installed on your machine.

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

*   **Frontend**: Runs on `http://localhost:5173`
*   **Backend**: Runs on `http://localhost:8080`

### 3. Stop the Application
To stop all running services, press `Ctrl + C` in the terminal window where you ran `npm run dev`.

---

## Separate Controls

If you prefer to run or stop services independently:

### Frontend Only
*   **Start**: `npm run dev-frontend` (or just `npm run dev` if you haven't renamed scripts)
*   **Stop**: `Ctrl + C`

### Backend Only
*   **Start**: `npm run dev-backend` or `cd dummy-backend && npm start`
*   **Stop**: `Ctrl + C`

## Features
- **Shared Header**: Consistent navigation and branding.
- **Dynamic Post List**: Fetches and displays posts from the backend.
- **Form Submission**: Users can create new posts which are saved to `posts.json`.
- **Loading States**: Visual feedback while fetching data.
- **Error Handling**: Alerts if the backend server is unreachable.
