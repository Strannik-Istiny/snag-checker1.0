import fs from 'fs';
const s = {
  RU: 87952, BY: 1800, KZ: 350542, UA: 18589,
  AM: 310000, AZ: 900, KG: 23939, UZ: 5360000
};
fs.writeFileSync('./src/salaries.json', JSON.stringify(s, null, 2));
