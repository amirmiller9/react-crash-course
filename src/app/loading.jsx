'use client';

import classes from '../components/PostsList.module.css';

export default function Loading() {
  return (
    <div className={classes.loading}>
      <p>Loading posts...</p>
      <div className="spinner"></div>
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(166, 124, 82, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #a67c52;
          margin: 1rem auto;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
