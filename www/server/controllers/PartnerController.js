const path = require('path');
const axios = require('axios');
const template = require('../templating');
const ErrorHandler = require('../ErrorHandler');
const parameters = require('../../parameters');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const route = async (req, res) => {
  console.log('partner');

  const notFound = () => {
    const result = template.render(`${views}/${req.abVersion}/404.html.twig`)

    res.status(404).send(result)
  }

  let partner = {}, bonusCondition = null
  try {

    try {
      const {data, status} = await axios.get(`${parameters.apiPrivateHost}/api/v1/partner-websites/${req.params.id}`)
      if (status !== 200) {
        notFound()
        return;
      }

      partner = data
    } catch (e) {
      console.log(JSON.stringify(e));

      notFound()
      return;
    }

    try {
      const {data, status} = await axios.get(`${parameters.apiPrivateHost}/api/v1/bonus-conditions`)
      if (status !== 200) {
        notFound()
        return;
      }

      bonusCondition = data.items.find(item =>
        item.code === partner.company.bonusCondition
      )
    } catch (e) {
      console.log(JSON.stringify(e));

      notFound()
      return;
    }

    const result = template.render(`${views}/${req.abVersion}/partner.html.twig`, {
      bonusCondition,
      ...partner
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e)
  }
}

module.exports = router => {

  router.get('/:v/partners/:id', ab.detectVersion, route);
  router.get('/partners/:id', ab.defaultVersion, route);
};

