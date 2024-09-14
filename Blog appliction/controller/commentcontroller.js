const db = require('../app');

exports.createComment = (req, res) => {
  const { post_id, content, author_id } = req.body;
  const query = `INSERT INTO comments (post_id, content, author_id) VALUES (?, ?, ?)`;

  db.query(query, [post_id, content, author_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Comment created successfully', commentId: results.insertId });
  });
};

exports.getCommentsByPostId = (req, res) => {
  const postId = req.query.post_id;
  const query = `SELECT * FROM comments WHERE post_id = ?`;

  db.query(query, [postId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getCommentById = (req, res) => {
  const commentId = req.params.id;
  const query = `SELECT * FROM comments WHERE id = ?`;

  db.query(query, [commentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json(results[0]);
  });
};

exports.updateComment = (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  const query = `UPDATE comments SET content = ? WHERE id = ?`;

  db.query(query, [content, commentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json({ message: 'Comment updated successfully' });
  });
};

exports.deleteComment = (req, res) => {
  const commentId = req.params.id;
  const query = `DELETE FROM comments WHERE id = ?`;

  db.query(query, [commentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  });
};
