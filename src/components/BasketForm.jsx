import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button, Stack } from '@chakra-ui/react';
import prices from '../data/prices.json';
import { fetchExchangeRates } from './ExchangeRates';

export default function BasketForm({ onResult }) {
  const [basket, setBasket] = useState({});
  const [salary, setSalary] = useState(50000);
  const [currency, setCurrency] = useState('RUB');

  const handleChange = (e, product) => {
    setBasket({ ...basket, [product]: Number(e.target.value) || 0 });
  };

  const calc = async () => {
    const rates = await fetchExchangeRates();
    const baseRates = { RUB: 1, ...rates };

    const result = prices.countries.map((country, idx) => {
      const countryCurrency = prices.currency_codes[idx];
      const priceInRub = prices.products.reduce((sum, product) => {
        const price = prices.prices_rub[product]?.[idx] || 0;
        const qty = basket[product] || 0;
        return sum + price * qty;
      }, 0);

      const salaryInRub = salary / (baseRates[currency] || 1);
      const costInTarget = priceInRub * (baseRates[countryCurrency] || 1);
      const baskets = salaryInRub >= priceInRub ? Math.floor(salaryInRub / priceInRub) : 0;

      return {
        country,
        cost: costInTarget,
        currency: countryCurrency,
        baskets,
      };
    });

    onResult(result);
  };

  return (
    <Box p={5} bg="white" borderRadius="lg" shadow="md">
      <FormControl mb={4}>
        <FormLabel>Ваша зарплата</FormLabel>
        <Input
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          placeholder="Например: 50000"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>Валюта</FormLabel>
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="RUB">₽ Рубль (RU)</option>
          <option value="BYN">Br Бел. рубль (BY)</option>
          <option value="KZT">₸ Тенге (KZ)</option>
          <option value="UAH">₴ Гривна (UA)</option>
          <option value="AMD">֏ Драм (AM)</option>
          <option value="AZN">₼ Манат (AZ)</option>
          <option value="KGS">сом (KG)</option>
          <option value="UZS">сум (UZ)</option>
        </Select>
      </FormControl>

      <FormLabel>Количество продуктов</FormLabel>
      <Stack spacing={3} mb={6}>
        {prices.products.map((product) => (
          <FormControl key={product} display="flex" alignItems="center">
            <FormLabel mb="0" flex="1" fontSize="sm">
              {product}
            </FormLabel>
            <Input
              type="number"
              defaultValue="0"
              min="0"
              size="sm"
              w="80px"
              onChange={(e) => handleChange(e, product)}
            />
          </FormControl>
        ))}
      </Stack>

      <Button colorScheme="teal" onClick={calc} width="full">
        🚀 Сравнить цены
      </Button>
    </Box>
  );
}
