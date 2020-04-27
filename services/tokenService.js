const jwt = require('jsonwebtoken');

const validateToken = token => jwt.verify(token, 'some secrey key');

module.exports = {
  validateToken,
};
