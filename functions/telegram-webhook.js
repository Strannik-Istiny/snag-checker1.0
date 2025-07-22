const axios = require('axios');
const prices = require('../src/data/prices.json');

const TOKEN = process.env.TELEGRAM_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);
  const msg = body.message;
  if (!msg) return { statusCode: 200 };

  const chatId = msg.chat.id;
  const text = msg.text;

  if (text.startsWith('/start')) {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: 'Отправь список продуктов и количество через запятую, например:\nХлеб 2, Молоко 1',
    });
    return { statusCode: 200 };
  }

  try {
    const items = text.split(',').map(s => {
      const [name, qty] = s.trim().split(' ');
      return { name, qty: Number(qty) || 0 };
    });

    const res = prices.countries.map((c, idx) => {
      const cost = items.reduce((sum, { name, qty }) => {
        const p = prices.prices[name]?.[idx] || 0;
        return sum + p * qty;
      }, 0);
      const salary = prices.salaries[c];
      return `${c}: ${cost.toFixed(0)} ₽ (${Math.floor(salary / cost)} корзин)`;
    }).join('\n');

    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: res || 'Ошибка: продукт не найден',
    });
  } catch {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: 'Не смог разобрать. Пример: Хлеб 2, Молоко 1',
    });
  }

  return { statusCode: 200 };
};
