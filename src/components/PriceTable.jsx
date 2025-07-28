import React from 'react';
import prices from '../data/prices.json';
import rates from '../rates.json';

export default function PriceTable({ basket }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Страна</th>
          <th>Корзина, ₽</th>
          <th>Зарплата, ₽</th>
          <th>Корзин на з/п</th>
        </tr>
      </thead>
      <tbody>
        {prices.countries.map((cc, idx) => {
          const basketLocal = prices.products.reduce((s, p) => s + prices.localPrices[p][idx], 0);
          const rate = rates[cc] || 1;
          const basketRub = Math.round(basketLocal * rate);
          const salaryRub = Math.round(prices.localSalaries[cc] * rate);
          const baskets = Math.floor(salaryRub / basketRub);
          return (
            <tr key={cc}>
              <td>{prices.countryNames[idx]}</td>
              <td>{basketRub.toLocaleString()}</td>
              <td>{salaryRub.toLocaleString()}</td>
              <td>{baskets.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
