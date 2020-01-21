const detectVersion = (req, res, next) => {
  if (['v1', 'v2'].indexOf(req.params.v) === -1) {
    next('route') //skip route
    return
  }

  req.abVersion = req.params.v

  next()
}

const defaultVersion = (req, res, next) => {
  req.abVersion = 'v2'
  next()
}

module.exports = {
  detectVersion,
  defaultVersion,
}