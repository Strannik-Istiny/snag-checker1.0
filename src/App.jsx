import React, { useState } from 'react';
import BasketForm   from './components/BasketForm.jsx';
import PriceTable   from './components/PriceTable.jsx';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>СНГ-Чекер цен</h1>
      <BasketForm onResult={setResult} />
      {result && <PriceTable data={result} />}
      <p style={{ marginTop: 40 }}>
        <a
          href="https://yoomoney.ru/to/4100111222333444"
          target="_blank"
          rel="noreferrer"
        >
          ☕ Купить мне кофе
        </a>
      </p>
    </main>
  );
}
