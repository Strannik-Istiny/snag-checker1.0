import React from 'react';
import prices from '../data/prices.json';
import rates from '../rates.json';

export default function SalaryTable() {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2>Средняя зарплата по странам</h2>
      <table>
        <thead>
          <tr><th>Страна</th><th>Зарплата, местн.</th><th>Зарплата, ₽</th></tr>
        </thead>
        <tbody>
          {prices.countries.map((cc, idx) => {
            const rate = rates[cc] || 1;
            const salaryRub = Math.round(prices.localSalaries[cc] * rate);
            return (
              <tr key={cc}>
                <td>{prices.countryNames[idx]}</td>
                <td>{prices.localSalaries[cc].toLocaleString()}</td>
                <td>{salaryRub.toLocaleString()} ₽</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
