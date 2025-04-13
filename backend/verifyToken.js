const admin = require('./firebaseAdmin');

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
}

module.exports = verifyToken;
