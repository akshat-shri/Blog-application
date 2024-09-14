const db = require('../app');

exports.createPost = (req, res) => {
  const { title, content, author_id } = req.body;
  const query = `INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)`;

  db.query(query, [title, content, author_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Post created successfully', postId: results.insertId });
  });
};

exports.getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getPostById = (req, res) => {
  const postId = req.params.id;
  const query = `SELECT * FROM posts WHERE id = ?`;

  db.query(query, [postId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(results[0]);
  });
};

exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const query = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;

  db.query(query, [title, content, postId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post updated successfully' });
  });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const query = `DELETE FROM posts WHERE id = ?`;

  db.query(query, [postId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  });
};