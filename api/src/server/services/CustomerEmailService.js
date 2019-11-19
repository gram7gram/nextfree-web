const mailer = require('../../mailer/mailgun')
const parameters = require('../../../parameters')
const templating = require('../../templating')

const onPasswordReset = async entity => {

  const title = 'Відновлення паролю'

  const body = templating.render('customer-reset-password-ua.html.twig', {
    title,
    link: parameters.customerHost + '/password-set/' + entity.user.emailResetToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onPasswordReset
}