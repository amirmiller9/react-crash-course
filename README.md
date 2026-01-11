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

### Backend Only (Port 8080)
To run only the backend server:
```bash
npm run dev-backend
```
*Alternatively, you can run `cd dummy-backend && npm start`.*

### Frontend Only (Port 5173)
To run only the React frontend:
```bash
npm run dev-frontend
```

## Features
- **Shared Header**: Consistent navigation and branding.
- **Dynamic Post List**: Fetches and displays posts from the backend.
- **Form Submission**: Users can create new posts which are saved to `posts.json`.
- **Loading States**: Visual feedback while fetching data.
- **Error Handling**: Alerts if the backend server is unreachable.
