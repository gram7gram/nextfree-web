const express = require('express');
const i18n = require('../../i18n').i18n;

const ErrorHandler = require('../services/ErrorHandler');
const FeedbackEmailService = require('../services/FeedbackEmailService');

const router = new express.Router({mergeParams: true});

router.post('/feedback', async (req, res) => {

  try {

    const {name, email, content} = req.body
    if (!(name && email && content)) {
      throw {
        code: 404,
        message: i18n.t('request.bad_request')
      }
    }

    await FeedbackEmailService.onFeedbackRequest({
      name,
      email,
      content,
    })

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

