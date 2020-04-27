const router = require('express').Router();
const db = require('../db/database');

router.get('/post/:postId', async (req, res) => {
  try {
    const {
      row,
    } = await db.query(`SELECT * FROM comments WHERE comments.post_id = $1`, [
      req.params.postId,
		]);
		return res.status(200).json(row);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const values = [body.comment, body.user_id, body.username, body.post_id];
    const {
      row,
    } = await db.query(
      `INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())`,
      values
    );
    return res.status(200).json(row);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const values = [
      body.comment,
      body.user_id,
      body.post_id,
      body.username,
      req.params.id,
    ];
    await db.query(
      `
				UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author = $4, date_created = NOW()
				WHERE comment.id = $5
			`,
      values
    );
    return res.status(200);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { row } = await db.query(
      `
				DELETE FROM comments
				WHERE comment.id = $1
			`,
      [req.params.id]
    );
    return res.status(200).json(row);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
