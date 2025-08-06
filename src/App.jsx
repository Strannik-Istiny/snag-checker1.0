import React, { useState } from 'react';
import BasketForm from './components/BasketForm';
import PriceTable from './components/PriceTable';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <>
      <header>
        <h1>СНГ-Чекер цен</h1>
        <p>Сравните цены на продукты в странах СНГ</p>
      </header>
      <BasketForm onResult={setResult} />
      {result && <PriceTable data={result} />}
      <p><a href="https://yoomoney.ru/to/4100111222333444" target="_blank" rel="noreferrer">Купить мне кофе ☕</a></p>
    </>
  );
}
