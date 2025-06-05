import { Stack, Tabs } from 'expo-router';
import { CartProvider } from '@/contexts/cartContext';
import { Image } from 'react-native';

export default function RootLayout() {
  return (
    <CartProvider>
      <Tabs
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
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Products', tabBarActiveTintColor: '#EB5160',
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={require('../assets/images/producticon.png')} 
                style={{
                  width: size ?? 24, 
                  height: size ?? 24, 
                  tintColor: focused ? '#EB5160' : '#888',
                }} 
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name='carrinho' 
          options={{ 
            title: 'Carrinho', tabBarActiveTintColor: '#EB5160',
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={require('../assets/images/carticon.png')} 
                style={{
                  width: size ?? 24, 
                  height: size ?? 24, 
                  tintColor: focused ? '#EB5160' : '#888'
                }} 
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name='product/[id]' 
          options={{ 
            href: null, 
            title: 'produto', 
            headerShown: false, 
            tabBarStyle: { display: 'none' }, 
          }} 
        />
      </Tabs>
    </CartProvider>
  );
}
