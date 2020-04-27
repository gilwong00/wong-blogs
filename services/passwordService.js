const bcrypt = require('bcryptjs');

const hashPassword = password => {
  if (password && password.length) {
    const salt = bcrypt.genSaltSync(10);
    let encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  } else {
    throw new Error('Password is null or empty');
  }
};

const validatePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashPassword,
  validatePassword
};
