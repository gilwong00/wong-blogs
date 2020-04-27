const jwt = require('jsonwebtoken');
const router = require('express').Router();
const passwordService = require('../services/passwordService');
const tokenService = require('../services/tokenService');
const db = require('../db/database');

router.get('/', async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = tokenService.validateToken(token);
    const { rows } = await db.query(`SELECT * FROM users WHERE users.id = $1`, [
      userId,
		]);
		const user = rows[0];
		delete user.password;
    return res.status(200).json(user);
  } else {
    return res.status(401).send('Session expire, please login again');
  }
});

router.get('/userPost/:id', async (req, res) => {
  try {
    const {
      row,
    } = await db.query(`SELECT * FROM posts WHERE post.user_id = $1`, [
      req.params.id,
    ]);
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { body } = req;

    const {
      rows,
    } = await db.query(`SELECT * FROM users WHERE users.username = $1`, [
      body.username,
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      const isPasswordValid = passwordService.validatePassword(
        body.password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'some secrey key', {
        expiresIn: 360000,
      });

      delete user.password;

      res.cookie('token', token, {
        maxAge: new Date(Date.now() + 3600000),
        path: '/',
      });

      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const password = passwordService.hashPassword(body.password);
    const values = [body.username, password, body.email, true];
    const { row } = await db.query(
      `INSERT INTO users(username, password, email, email_verified, date_created) VALUES($1, $2, $3, $4, NOW()) ON CONFLICT DO NOTHING`,
      values
    );
    return res.status(200).json(row);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
