const express = require('express');
const bodyParser = require('body-parser');
const fs = require('node:fs/promises');

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());

// CORS configuration - allowing the React frontend to communicate with this API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET /posts - Retrieves all posts from the posts.json database
app.get('/posts', async (req, res) => {
  const fileContent = await fs.readFile('posts.json');
  const postData = JSON.parse(fileContent);
  
  // Adding a small delay (1.5s) to simulate network latency 
  // This allows us to see the "Loading..." state in the React frontend
  setTimeout(() => {
    res.status(200).json({ posts: postData.posts });
  }, 1500);
});

// POST /posts - Saves a new post to the posts.json database
app.post('/posts', async (req, res) => {
  const fileContent = await fs.readFile('posts.json');
  const postData = JSON.parse(fileContent);
  const newPost = req.body;
  const updatedPosts = [newPost, ...postData.posts];
  
  // Persist updated list back to the JSON file
  await fs.writeFile('posts.json', JSON.stringify({ posts: updatedPosts }));
  
  res.status(201).json({ message: 'Post saved.', post: newPost });
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Backend server running on http://localhost:8080');
});
