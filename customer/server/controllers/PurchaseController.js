const axios = require('axios');
const express = require('express');

const router = new express.Router({mergeParams: true});

router.get('/stores/:store/customers/:customer/purchase', async (req, res) => {

});

module.exports = router;

