const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
  try {
    // maybe get comments as well
    const { rows } = await db.query(
    `
			SELECT 
				COUNT(c.*) TotalComments, 
				p.id, 
				p.title, 
				p.body, 
				p.user_id, 
				p.author, 
				p.date_created  
			FROM posts as p
			LEFT JOIN comments as c
			ON c.post_id = p.id
			GROUP BY p.id, p.title, p.body, p.user_id, p.author
			ORDER BY p.date_created DESC
		 `
    );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {
      rows,
    } = await db.query(
      'SELECT * FROM posts WHERE posts.user_id = $1 ORDER BY posts.date_created DESC',
      [req.params.id]
    );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const values = [body.title, body.body, body.userId, body.username];
    const { rows } = await db.query(
      'INSERT INTO posts(title, body, user_id, author, date_created) VALUES($1, $2, $3, $4, NOW() ) RETURNING *',
      values
    );

    return res.status(200).json(rows[0]);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    const { body } = req;
    const values = [
      body.title,
      body.body,
      body.user_id,
      body.post_id,
      body.username,
    ];
    const { rows } = await db.query(
      `
				UPDATE posts SET title = $1, body = $2, user_id = $3, author = $5, date_create = NOW()
				WHERE id = $4
			`,
      values
    );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete('/:id/comments', async (req, res) => {
  try {
    await query(`DELETE FROM comments WHERE comments.post_id = $1`, [
      req.params.id,
    ]);

    return res.status(200);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await query(`DELETE FROM posts WHERE post.id = $1`, [req.params.id]);

    return res.status(200);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
