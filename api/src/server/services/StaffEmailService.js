const mailer = require('../../mailer/mailgun')
const parameters = require('../../../parameters')
const templating = require('../../templating')

const onPasswordReset = async entity => {

  const title = 'Відновлення паролю'

  const body = templating.render('staff-reset-password-ua.html.twig', {
    title,
    link: parameters.staffHost + '/password-set/' + entity.user.emailResetToken
  })

  await mailer(entity.user.email, title, body)

}

const onInvitationCreated = async (entity, owner, company) => {

  const title = `Запрошення до співпраці з "${company.name}"`

  const body = templating.render('staff-invite-ua.html.twig', {
    title,
    owner,
    company,
    staff: entity,
    link: parameters.staffHost + '/invitation/' + entity.user.invitationToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onPasswordReset,
  onInvitationCreated,
}