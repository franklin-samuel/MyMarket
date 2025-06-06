import { Stack } from 'expo-router';
import { CartProvider } from '@/contexts/cartContext';
import { HistoryProvider } from './contexts/historyContext';
import { AddressProvider } from './contexts/adressContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <HistoryProvider>
        <AddressProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Produto' }} />
            <Stack.Screen name="confirmation" options={{ title: 'Confirmar Pedido' }} />
          </Stack>
        </AddressProvider>
      </HistoryProvider>
    </CartProvider>
  );
}