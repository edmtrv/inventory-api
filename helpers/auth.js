const jwt = require('jsonwebtoken');

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const auth = async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = await jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({
      status: 'failure',
      message: 'Token missing or invalid',
    });
  }

  return decodedToken.id;
};

module.exports = auth;
