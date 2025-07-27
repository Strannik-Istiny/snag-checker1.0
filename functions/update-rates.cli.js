import https from 'https';
import fs from 'fs';

const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
https.get(url, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const rates = JSON.parse(body).Valute;
    const map = {
      RU: 1,
      BY: rates.BYN.Value,
      KZ: rates.KZT.Value / 100,
      UA: rates.UAH.Value / 10,
      AM: rates.AMD.Value / 100,
      AZ: rates.AZN.Value,
      KG: rates.KGS.Value / 100,
      UZ: rates.UZS.Value / 10000,
    };
    fs.writeFileSync('./src/rates.json', JSON.stringify(map, null, 2));
    console.log('rates.json updated');
  });
}).on('error', e => {
  console.error(e);
  process.exit(1);
});
