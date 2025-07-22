export default function PriceTable({ data }) {
  return (
    <table style={{borderCollapse:'collapse',width:'100%',marginTop:16}}>
  <thead style={{background:'#e2e8f0'}}>
    ...
  </thead>
  <tbody>
    {data.map(r=>(
      <tr key={r.country} style={{borderBottom:'1px solid #e2e8f0'}}>
        <td style={{padding:8}}>{r.country}</td>
        <td style={{padding:8}}>{r.cost.toFixed(0)} ₽</td>
        <td style={{padding:8}}>{r.baskets}</td>
      </tr>
    ))}
  </tbody>
</table>
  );
}
