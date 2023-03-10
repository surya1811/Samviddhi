import React from 'react'

const CurrencyExchangeData = ({ exchangeRates }) => {
    return (
        <div className="mt-4">
            <h3>Exchange Rates</h3>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Source</th>
                        <th>Exchange Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {exchangeRates.map((rate, index) => (
                        <tr key={index}>
                            <td className="align-middle">{rate.source}</td>
                            <td className="align-middle">{rate.exchange_rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CurrencyExchangeData