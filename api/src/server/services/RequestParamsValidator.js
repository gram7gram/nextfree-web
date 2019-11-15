const i18n = require('../../i18n').i18n

const checkId = (req, res, next) => {

  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
    res.status(400).json({
      message: i18n.t('request.invalid_id'),
    })
    return
  }

  next()
}

module.exports = {
  checkId,
}