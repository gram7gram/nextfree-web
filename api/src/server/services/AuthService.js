const jwt = require('jsonwebtoken')
const params = require('../../../parameters')
const i18n = require('../../i18n').i18n

const getToken = req => req.headers['authorization'];

const isAdmin = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isAdmin !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_admin")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isOwner = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isOwner !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_owner")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isStaff = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isStaff !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_staff")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isCustomer = (req, res, next) => {

  const token = getToken(req);
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || decoded.isCustomer !== true) {
      res.status(403).json({
        message: i18n.t("auth.not_customer")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
    })
  }
}

const isAuthenticated = (req, res, next) => {

  const token = getToken(req)
  if (!token) {
    res.status(401).json({
      message: i18n.t("auth.missing_token")
    });
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !(decoded.isOwner || decoded.isCustomer || decoded.isStaff)) {
      res.status(403).json({
        message: i18n.t("auth.access_denied")
      });
      return
    }

    req.currentUser = decoded;

    next();

  } catch (e) {
    console.error(e)

    res.status(401).json({
      message: i18n.t("auth.not_authorized")
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
  getToken,
  isAuthenticated,
  isAdmin,
  isCustomer,
  isStaff,
  isOwner,
  verifyToken,
  generateAuthToken
}