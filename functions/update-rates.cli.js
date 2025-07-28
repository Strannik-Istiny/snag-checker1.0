import https from 'https';
import fs from 'fs';

const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
https.get(url, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const r = JSON.parse(body).Valute;
    fs.writeFileSync('./src/rates.json', JSON.stringify({
      RU: 1,
      BY: r.BYN.Value,
      KZT: r.KZT.Value / 100,
      UAH: r.UAH.Value / 10,
      AMD: r.AMD.Value / 100,
      AZN: r.AZN.Value,
      KGS: r.KGS.Value / 100,
      UZS: r.UZS.Value / 10000
    }, null, 2));
  });
});
