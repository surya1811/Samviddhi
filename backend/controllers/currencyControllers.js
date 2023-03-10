const { getExchangeRate } = require("../helper");


exports.convert = async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  const amount=req.query.amount;
    try {
      const exchangeRate = await getExchangeRate(from, to);
      const sourceRates = exchangeRate.map((rate) => rate.exchange_rate);
  
      const minValue = Math.min(...sourceRates);
      const minIndex = sourceRates.findIndex((rate) => rate === minValue);
      const minSource = exchangeRate[minIndex].source;
       const minCurrencyRate = amount*minValue;
      const maxValue = Math.max(...sourceRates);
     const maxIndex = sourceRates.findIndex((rate) => rate === maxValue);
     const maxSource = exchangeRate[maxIndex].source;
      const maxCurrencyRate = amount*maxValue;
      res.json({
          min_currency_rate:minCurrencyRate,
          min_currency_source:minSource,
          max_currency_rate:maxCurrencyRate,
         max_currency_source:maxSource,
      });
    } catch (error) {
      console.error(`Error getting exchange rate: ${error.message}`);
      res.status(500).send('Error getting exchange rate');
    }
  }

  exports.currency_exchange =  async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    try {
      const exchangeRate = await getExchangeRate(from, to);
      res.json(exchangeRate);
    } catch (error) {
      console.error(`Error getting exchange rate: ${error.message}`);
      res.status(500).send('Error getting exchange rate');
    }
  }