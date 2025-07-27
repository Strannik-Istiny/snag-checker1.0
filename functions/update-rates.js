import https from 'https';
import fs from 'fs';

export const handler = async () => {
  const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
  const rates = await new Promise((resolve, reject) => {
    https.get(url, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body).Valute));
    }).on('error', reject);
  });

  const map = {
    USD: 1,
    BYN: rates.BYN.Value,
    KZT: rates.KZT.Value,
    UAH: rates.UAH.Value,
    AMD: rates.AMD.Value,
    AZN: rates.AZN.Value,
    KGS: rates.KGS.Value,
    UZS: rates.UZS.Value,
  };

  fs.writeFileSync('./src/rates.json', JSON.stringify(map, null, 2));
  return { statusCode: 200, body: 'Rates updated' };
};
