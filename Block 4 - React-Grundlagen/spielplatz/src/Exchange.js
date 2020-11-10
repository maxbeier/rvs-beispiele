import React from 'react';
import data from './exchange-rates.json';

const currencyKeys = Object.keys(data.rates);

function Rate({ currency, value, onChange }) {
  const handleChange = (event) => onChange(+event.target.value);

  return (
    <div className="input-group mb-2 text-monospace">
      <div className="input-group-prepend">
        <div className="input-group-text">{currency}</div>
      </div>
      <input type="number" className="form-control" value={value} onChange={handleChange} />
    </div>
  );
}

export default function Exchange() {
  const [euro, setEuro] = React.useState(100);
  const computeValue = (currencyKey) => Math.round(euro * data.rates[currencyKey]);
  const onChange = (currencyKey) => (value) => setEuro(value / data.rates[currencyKey]);

  return (
    <div className="container my-2" style={{ width: 300 }}>
      <h2>Währungsrechner</h2>
      {currencyKeys.map((currencyKey) => (
        <Rate
          key={currencyKey}
          currency={currencyKey}
          value={computeValue(currencyKey)}
          onChange={onChange(currencyKey)}
        />
      ))}
    </div>
  );
}
