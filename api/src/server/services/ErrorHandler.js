const ErrorHandler = {

  handle: (res, e) => {

    // console.error(e);

    let code = 500

    if (e.code >= 400 && e.code < 510) {
      code = e.code
    }

    res.status(code).json(e)
  }

}

module.exports = ErrorHandler