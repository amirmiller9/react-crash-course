const express = require('express');
const bodyParser = require('body-parser');
const fs = require('node:fs/promises');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const fileContent = await fs.readFile('posts.json');
  const postData = JSON.parse(fileContent);
  // res.status(200).json({ posts: postData.posts });
  // Adding a small delay to simulate network latency for the loading state demo
  setTimeout(() => {
    res.status(200).json({ posts: postData.posts });
  }, 1500);
});

app.post('/posts', async (req, res) => {
  const fileContent = await fs.readFile('posts.json');
  const postData = JSON.parse(fileContent);
  const newPost = req.body;
  const updatedPosts = [newPost, ...postData.posts];
  await fs.writeFile('posts.json', JSON.stringify({ posts: updatedPosts }));
  res.status(201).json({ message: 'Post saved.', post: newPost });
});

app.listen(8080, () => {
  console.log('Backend server running on http://localhost:8080');
});
