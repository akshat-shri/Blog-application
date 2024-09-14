const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth');

app.use(bodyParser.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/posts', verifyToken, postRoutes);
app.use('/comments', verifyToken, commentRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
