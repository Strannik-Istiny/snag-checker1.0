import React from 'react';
import prices from '../data/prices.json';
import rates from '../rates.json'; // курсы валют к рублю

export default function PriceTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Страна</th>
          <th>Корзина, местн.</th>
          <th>Корзина, ₽</th>
          <th>Зарплата, ₽</th>
          <th>Корзин на з/п</th>
        </tr>
      </thead>
      <tbody>
        {prices.countries.map((cc, idx) => {
          // 1. стоимость корзины в местной валюте
          const basketLocal = prices.products.reduce(
            (sum, prod) => sum + prices.localPrices[prod][idx], 0
          );

          // 2. курс рубля к этой валюте
          const rate = rates[cc];
          const basketRub = Math.round(basketLocal * rate);
          const salaryRub = Math.round(prices.localSalaries[cc] * rate);

          // 3. корзины
          const baskets = Math.floor(salaryRub / basketRub);

          return (
            <tr key={cc}>
              <td>{prices.countryNames[idx]}</td>
              <td>{basketLocal.toLocaleString()}</td>
              <td>{basketRub.toLocaleString()} ₽</td>
              <td>{salaryRub.toLocaleString()} ₽</td>
              <td>{baskets}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
