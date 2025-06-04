import { Stack } from 'expo-router';
import { CartProvider } from '@/contexts/cartContext';


export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#EB5160',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Products' }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Detalhes' }} />
        <Stack.Screen name='CartScreen' options={{ title: 'Carrinho' }}/>
      </Stack>
    </CartProvider>
  );
}
