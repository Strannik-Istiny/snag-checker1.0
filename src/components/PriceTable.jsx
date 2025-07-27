import React from 'react';
import prices from '../data/prices.json';

export default function PriceTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Страна</th>
          <th>Цена</th>
          <th>Корзин на з/п</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r => {
          const idx = prices.countries.indexOf(r.country);
          const name = prices.countryNames[idx];
          const currency = prices.currencies[idx];
          const priceRub = r.cost / 1000;
          const baskets = Math.floor((prices.salaries[r.country] || 0) / priceRub);
          return (
            <tr key={r.country}>
              <td>{name}</td>
              <td>{priceRub.toFixed(2)} {currency}</td>
              <td>{baskets}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
