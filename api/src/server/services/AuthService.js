const jwt = require('jsonwebtoken')
const params = require('../../../parameters')

const getToken = req => req.cookie.token;

const isAdmin = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: "Missing token cookie"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isAdmin !== true) {
      res.status(403).json({
        message: "Access denied. Not admin"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isOwner = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: "Missing token cookie"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isOwner !== true) {
      res.status(403).json({
        message: "Access denied. Not owner"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isStaff = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: "Missing token cookie"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isStaff !== true) {
      res.status(403).json({
        message: "Access denied. Not staff"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isCustomer = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: "Missing token cookie"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isCustomer !== true) {
      res.status(403).json({
        message: "Access denied. Not customer"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const isAuthenticated = (req, res, next) => {

  const token = getToken(req)
  if (!token) {
    res.status(401).json({
      message: "Missing token cookie"
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !(decoded.isOwner || decoded.isCustomer || decoded.isStaff)) {
      res.status(403).json({
        ...decoded,
        message: "Access denied"
      });
      return
    }

    req.user = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: "Not authorized"
    })
  }
}

const generateAuthToken = content => {
  return jwt.sign(content, params.secret, {
    expiresIn: '7d'
  });
}

const verifyToken = token => {
  try {
    return jwt.verify(token, params.secret);
  } catch (e) {
    return null;
  }
}

module.exports = {
  isAuthenticated,
  isAdmin,
  isCustomer,
  isStaff,
  isOwner,
  verifyToken,
  generateAuthToken
}