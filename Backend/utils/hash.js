const crypto = require('crypto');

exports.generateSalt = () => crypto.randomBytes(16).toString('hex');

exports.hashPassword = (password, salt) => {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

