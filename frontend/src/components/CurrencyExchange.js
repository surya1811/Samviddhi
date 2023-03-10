import React, { useState } from 'react';
import axios from 'axios';
import CurrencyExchangeData from './CurrencyExchangeData';
import CurrencyRatesData from './CurrencyRatesData';
import CurrencySelector from './CurrencySelector';

const CurrencyExchange = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(0);

  const handleCurrencyChange = (e, currencyType) => {
    const currency = e.target.value;
    if (currencyType === 'from') {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
  };

  const handleExchangeRateFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/currency-exchange?from=${fromCurrency}&to=${toCurrency}`);
      console.log(response);
      setExchangeRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCurrencyRateFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
      console.log(response);
      setCurrencyRates(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Currency Exchange</h1>
      <CurrencySelector fromCurrency={fromCurrency} toCurrency={toCurrency} handleCurrencyChange={handleCurrencyChange} handleExchangeRateFetch={handleExchangeRateFetch} />
      {exchangeRates.length > 0 && (
        <CurrencyExchangeData exchangeRates={exchangeRates} />
      )}
      <div className="row mt-4">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="amount" >Amount:</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 d-flex align-items-end">
          <button className="btn btn-primary" onClick={handleCurrencyRateFetch}>Convert</button>
        </div>
      </div>
      <div className="mt-4">
        {Object.entries(currencyRates).length > 0 && (
          <CurrencyRatesData currencyRates={currencyRates} />
        )}
      </div>
    </div>
  );
};

export default CurrencyExchange;
