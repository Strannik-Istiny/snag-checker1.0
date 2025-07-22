import React, { useState } from 'react';
import prices from '../data/prices.json';

export default function BasketForm({ onResult }) {
  const [basket, setBasket] = useState({});

  const handleChange = (e, product) => {
    setBasket({ ...basket, [product]: Number(e.target.value) || 0 });
  };

  const calc = () => {
    const res = prices.countries.map((c, idx) => {
      const cost = prices.products.reduce(
        (sum, p) => sum + (prices.prices[p]?.[idx] || 0) * (basket[p] || 0),
        0
      );
      const salary = prices.salaries[c];
      return { country: c, cost, baskets: Math.floor(salary / cost) };
    });
    onResult(res);
  };

  return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {prices.products.map(p => (
      <div key={p} style={{ marginBottom: 8 }}>
        <label>
          {p}:{' '}
          <input
            type="number"
            min="0"
            onChange={e => handleChange(e, p)}
            style={{ width: 60 }}
          />
        </label>
      </div>
    ))}
    <button onClick={calc} style={{ width: 120 }}>
      Сравнить
    </button>
  </div>
);
}
