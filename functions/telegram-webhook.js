const axios = require('axios');
const prices = require('../src/data/prices.json');

const TOKEN = process.env.TELEGRAM_TOKEN;
const API = `https://api.telegram.org/bot${TOKEN}`;

// Упрощённые курсы (в реальности можно кешировать или вызывать API)
const CURRENCY_RATES = {
  RUB: 1,
  BYN: 0.036,
  KZT: 0.065,
  UAH: 0.43,
  AMD: 0.0026,
  AZN: 0.017,
  KGS: 0.018,
  UZS: 0.0011
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const body = JSON.parse(event.body);
  const msg = body.message;
  if (!msg) return { statusCode: 200 };

  const text = (msg.text || '').trim().toLowerCase();
  const chatId = msg.chat.id;

  if (text === '/start' || text === 'привет') {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: `Привет! 🌍\n\nОтправь список покупок и зарплату, например:\n\nХлеб 2, Молоко 1, Зарплата 50000, Валюта RUB`,
    });
    return { statusCode: 200 };
  }

  try {
    const parts = text.split(',').map(p => p.trim());
    const items = {};
    let salary = 50000;
    let currency = 'RUB';

    for (const part of parts) {
      const [name, qty] = part.split(' ');
      const num = Number(qty);
      if (num > 0 && prices.products.some(p => p.toLowerCase().includes(name))) {
        const product = prices.products.find(p => p.toLowerCase().includes(name));
        items[product] = num;
      } else if (part.includes('зарплата')) {
        salary = Number(part.replace(/\D/g, '')) || 50000;
      } else if (part.includes('валюта')) {
        const code = part.split(' ')[1].toUpperCase();
        if (['RUB', 'BYN', 'KZT', 'UAH', 'AMD', 'AZN', 'KGS', 'UZS'].includes(code)) {
          currency = code;
        }
      }
    }

    const salaryInRub = salary / (CURRENCY_RATES[currency] || 1);

    const result = prices.countries.map((country, idx) => {
      const countryCurrency = prices.currency_codes[idx];
      const costInRub = prices.products.reduce((sum, product) => {
        const price = prices.prices_rub[product]?.[idx] || 0;
        const qty = items[product] || 0;
        return sum + price * qty;
      }, 0);

      const costInTarget = costInRub * (CURRENCY_RATES[countryCurrency] || 1);
      const baskets = costInRub > 0 ? Math.floor(salaryInRub / costInRub) : 0;

      return `${country}: ${costInTarget.toFixed(0)} ${countryCurrency} (${baskets} корзин)`;
    }).join('\n');

    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: `💰 Результат:\n\n${result}\n\n👉 /start — начать заново`,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Отправить другу', url: 'https://t.me/snag_checker_bot' }]
        ]
      })
    });
  } catch (err) {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text: 'Ошибка. Пример:\nХлеб 2, Молоко 1, Зарплата 50000, Валюта RUB',
    });
  }

  return { statusCode: 200 };
};
