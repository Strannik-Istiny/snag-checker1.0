import React, { useState } from 'react';
import prices from '../data/prices.json';

export default function BasketForm({ onResult }) {
  const [basket, setBasket] = useState({});
  const [salary, setSalary] = useState(0);
  const [currency, setCurrency] = useState('RUB');

  const handleChange = (e, product) => {
    setBasket({ ...basket, [product]: Number(e.target.value) || 0 });
  };

  const calc = async () => {
    const exchangeRates = await fetchExchangeRates();
    const res = prices.countries.map((c, idx) => {
      const cost = prices.products.reduce(
        (sum, p) => sum + (prices.prices[p]?.[idx] || 0) * (basket[p] ||0),
0
);
const convertedCost = convertPriceToCurrency(cost, exchangeRates, currency);
const salaryInTargetCurrency = convertPriceToCurrency(salary, exchangeRates, currency);
const baskets = Math.floor(salaryInTargetCurrency / convertedCost);
return { country: c, cost: convertedCost, baskets };
});
onResult(res);
};  return (
     <div>
       <h2>Введите количество продуктов:</h2>
       {prices.products.map(p => (
         <label key={p}>
           {p}: <input type="number" min="0" onChange={e => handleChange(e, p)} />
         </label>
       ))}
       <label>
         Зарплата: <input type="number" min="0" onChange={(e) => setSalary(Number(e.target.value))} />
       </label>
       <label>
         Валюта: 
         <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
           <option value="RUB">₽ (Рубли)</option>
           <option value="BYN">Br (Белорусские рубли)</option>
           <option value="KZT">₸ (Тенге)</option>
           {/* Добавить остальные валюты */}
         </select>
       </label>
       <button onClick={calc}>Сравнить</button>
     </div>
   );
 }
 ```
