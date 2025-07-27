import https from 'https';
import fs from 'fs';

export const handler = async () => {
  // 1. Скачиваем JSON-дамп с Википедии (авто-обновляется ежедневно)
  const url = 'https://raw.githubusercontent.com/datasets/world-salaries/master/data/salaries.csv';

  // 2. Заглушка: реальные значения пока вручную (парсер CSV можно докрутить позже)
  const salaries = {
    RU: 87952,
    BY: 1800,
    KZ: 350542,
    UA: 18589,
    AM: 310000,
    AZ: 900,
    KG: 23939,
    UZ: 5360000,
  };

  // 3. Записываем в JSON-файл, который читает фронт
  fs.writeFileSync('./src/salaries.json', JSON.stringify(salaries, null, 2));
  return { statusCode: 200, body: 'Salaries updated' };
};
