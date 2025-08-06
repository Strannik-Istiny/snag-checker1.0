import axios from 'axios';

// Получаем курсы валют относительно RUB
export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(
      'https://api.frankfurter.app/latest?from=RUB'
    );
    return response.data.rates; // { BYN: x, KZT: y, ... }
  } catch (error) {
    console.warn('Не удалось получить курсы валют. Используем fallback.');
    // Fallback курсы (примерные)
    return {
      BYN: 0.036,
      KZT: 0.065,
      UAH: 0.43,
      AMD: 0.0026,
      AZN: 0.017,
      KGS: 0.018,
      UZS: 0.0011
    };
  }
};
