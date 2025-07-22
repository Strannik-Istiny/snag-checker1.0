export default function PriceTable({ data }) {
  return (
    <table style={{ marginTop: 24, borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: 8, border: '1px solid #ccc' }}>Страна</th>
          <th style={{ padding: 8, border: '1px solid #ccc' }}>Цена, ₽</th>
          <th style={{ padding: 8, border: '1px solid #ccc' }}>Корзин на з/п</th>
        </tr>
      </thead>
      <tbody>
        {data.map(r => (
          <tr key={r.country}>
            <td style={{ padding: 8, border: '1px solid #ccc' }}>{r.country}</td>
            <td style={{ padding: 8, border: '1px solid #ccc' }}>{r.cost.toFixed(0)}</td>
            <td style={{ padding: 8, border: '1px solid #ccc' }}>{r.baskets}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
