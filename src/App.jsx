import React, { useState } from 'react';
import { ChakraProvider, Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import BasketForm from './components/BasketForm';
import PriceTable from './components/PriceTable';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <ChakraProvider>
      <Box bg="gray.50" minH="100vh" py={8}>
        <Container maxW="container.md">
          <VStack spacing={6} align="stretch">
            <Heading as="h1" size="xl" textAlign="center" color="teal.600">
              🌍 СНГ-Чекер цен
            </Heading>
            <Text fontSize="lg" textAlign="center" color="gray.600">
              Сравните стоимость продуктовой корзины в 8 странах СНГ
            </Text>

            <BasketForm onResult={setResult} />

            {result && <PriceTable data={result} />}

            <Box textAlign="center" mt={8}>
              <a
                href="https://yoomoney.ru/to/4100111222333444"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#009966', fontWeight: 'bold', textDecoration: 'none' }}
              >
                💚 Поддержать проект (купить кофе)
              </a>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
