const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'your_jwt_secret_key', // keep secret in .env
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;
