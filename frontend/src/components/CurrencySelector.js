import React from 'react'


const CurrencySelector = ({ fromCurrency, toCurrency, handleCurrencyChange, handleExchangeRateFetch }) => {
    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor="fromCurrency">From Currency:</label>
                    <select
                        className="form-control"
                        id="fromCurrency"
                        value={fromCurrency}
                        onChange={(e) => handleCurrencyChange(e, 'from')}
                    >
                        <option value="INR">INR</option>
                        <option value="KRW">KRW</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CNY">CNY</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="form-group">
                    <label htmlFor="toCurrency">To Currency:</label>
                    <select
                        className="form-control"
                        id="toCurrency"
                        value={toCurrency}
                        onChange={(e) => handleCurrencyChange(e, 'to')}
                    >
                        <option value="INR">INR</option>
                        <option value="KRW">KRW</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="CNY">CNY</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-4 d-flex align-items-end">
                <button className="btn btn-primary" onClick={handleExchangeRateFetch}>
                    Get Exchange Rates
                </button>
            </div>
        </div>
    );
};

export default CurrencySelector;