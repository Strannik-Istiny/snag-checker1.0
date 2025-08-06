import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge } from '@chakra-ui/react';

export default function PriceTable({ data }) {
  const bestCountry = data.reduce((a, b) => (a.baskets > b.baskets ? a : b));

  return (
    <TableContainer mt={8} bg="white" p={4} borderRadius="lg" shadow="md">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Страна</Th>
            <Th isNumeric>Цена</Th>
            <Th isNumeric>Корзин на з/п</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.country} bg={row.country === bestCountry.country ? 'green.50' : 'white'}>
              <Td>
                {row.country}
                {row.country === bestCountry.country && (
                  <Badge ml="2" colorScheme="green">лучше</Badge>
                )}
              </Td>
              <Td isNumeric>{row.cost.toFixed(0)} {row.currency}</Td>
              <Td isNumeric>{row.baskets}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
