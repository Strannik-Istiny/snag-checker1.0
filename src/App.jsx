import React, { useState } from 'react';
import BasketForm   from './components/BasketForm.jsx';
import PriceTable   from './components/PriceTable.jsx';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <main style={{
  padding: 24,
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 480,
  margin: '0 auto',
  background: '#f7f7f7',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,.1)'
}}>
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
