const mailer = require('../../mailer/gmail')
const templating = require('../../templating')
const parameters = require('../../../parameters')

const onFeedbackRequest = async content => {

  const title = '[nextfree] Зворотній зв`язок'

  const body = templating.render('feedback-ua.html.twig', content)

  await mailer(parameters.email, title, body)
}

module.exports = {
  onFeedbackRequest,
}