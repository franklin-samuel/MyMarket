import { Stack } from 'expo-router';
import { CartProvider } from '@/contexts/cartContext';
import { HistoryProvider } from './contexts/historyContext';
import { AddressProvider } from './contexts/adressContext';
import { OrderProvider } from './contexts/orderContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <HistoryProvider>
        <AddressProvider>
          <OrderProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="product/[id]" options={{ title: '', headerShadowVisible: false }} />
              <Stack.Screen name="confirmation" options={{ title: 'Confirmar Pedido' }} />
              <Stack.Screen name='address' options={{ title: '', headerShadowVisible: false }}/>
              <Stack.Screen name='selectPayment' options={{ title: 'Pagamento', headerShadowVisible: false }}/>
            </Stack>
          </OrderProvider>
        </AddressProvider>
      </HistoryProvider>
    </CartProvider>
  );
}