const detectVersion = (req, res, next) => {
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