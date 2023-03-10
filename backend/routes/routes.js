const express= require('express')
const { convert, currency_exchange } = require('../controllers/currencyControllers');
const router = express.Router()

router.get('/convert',convert)
router.get('/currency-exchange',currency_exchange);


module.exports = router