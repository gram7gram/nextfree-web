const mailer = require('../../mailer/mailgun')
const parameters = require('../../../parameters')
const templating = require('../../templating')

const onAccountActivation = async entity => {

  const title = 'Реєстрація на сайті nextfree.com.ua'

  const body = templating.render('staff-activation-ua.html.twig', {
    title,
    link: parameters.staffHost + '/activation/' + entity.user.activationToken
  })

  await mailer(entity.user.email, title, body)

}

const onPasswordReset = async entity => {

  const title = 'Відновлення паролю'

  const body = templating.render('staff-reset-password-ua.html.twig', {
    title,
    link: parameters.staffHost + '/password-set/' + entity.user.emailResetToken
  })

  await mailer(entity.user.email, title, body)

}

const onInvitationCreated = async (entity, owner, company) => {

  const title = `Вас вітає сервіс NextFree!`

  const body = templating.render('staff-invite-ua.html.twig', {
    title,
    owner,
    company,
    link: parameters.staffHost + '/invitation/' + entity.user.invitationToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onPasswordReset,
  onAccountActivation,
  onInvitationCreated,
}