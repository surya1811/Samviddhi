const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require("puppeteer");

const EXCHANGE_SOURCES = [
  { name: 'x-rates', url: 'https://www.x-rates.com/calculator/?from=%FROM%&to=%TO%' },
  { name: 'xe', url: 'https://www.xe.com/currencyconverter/convert/?Amount=1&From=%FROM%&To=%TO%' },
 { name: 'google', url: 'https://www.google.com/search?q=%FROM%+to+%TO%' }
];

exports.getExchangeRate = async (from, to) => {
    try {
      let array = [];
      for (const source of EXCHANGE_SOURCES) {
        try {
          let rate = null;
          const response = await axios.get(source.url.replace('%FROM%', from).replace('%TO%', to));
          const $ = cheerio.load(response.data);
          if (source.name === 'x-rates') {
            rate = parseFloat($('.ccOutputRslt').text());
          } else if (source.name === 'xe') {
            rate = parseFloat($('.result__BigRate-sc-1bsijpp-1.iGrAod').text().replace(',', ''));
          } else if (source.name === 'google') {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // Goto page
            await page.goto(source.url.replace('%FROM%', from).replace('%TO%', to));
            // Wait for the rate to appear
            await page.waitForSelector('.DFlfde.SwHCTb');
            // Extract the rate
            rate = await page.$eval('.DFlfde.SwHCTb', (element) => parseFloat(element.innerText));
            await browser.close();
          }
          if (rate) {
            array = [...array, { exchange_rate: rate, source: source.name }];
          }
        } catch (error) {
          console.error(`Error fetching exchange rate from ${source.name}: ${error.message}`);
        }
      }
      return array
    }
    catch (err) {
      throw new Error(`Could not find exchange rate for ${err}`);
    }
  };