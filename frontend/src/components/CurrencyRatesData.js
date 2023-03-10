import React from 'react'

const CurrencyRatesData = ({ currencyRates }) => {
    return (
        <div>
            <h3>Currency Rates</h3>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Values</th>
                        <th>Currency Rate</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {currencyRates.min_currency_rate && (
                        <tr>
                            <td className="align-middle">Minimum Value</td>
                            <td className="align-middle">{currencyRates.min_currency_rate}</td>
                            <td className="align-middle">{currencyRates.min_currency_source}</td>
                        </tr>
                    )}
                    {currencyRates.max_currency_rate && (
                        <tr>
                            <td className="align-middle">Maximum Value</td>
                            <td className="align-middle">{currencyRates.max_currency_rate}</td>
                            <td className="align-middle">{currencyRates.max_currency_source}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CurrencyRatesData