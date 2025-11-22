const jwt = require('jsonwebtoken');

// Middleware pentru autentificare folosind JWT
// nu permite accesul la rutele protejate fara un token valid
// pe scurt nu vrem sa se fure date de la utilizatori neautorizati
const authenticate = (req, res, next) => {
  console.log(req.header);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;