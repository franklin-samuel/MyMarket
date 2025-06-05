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
            backgroundColor: '#e74c3c',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            borderTopColor: '#CCC'
          }
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Products', tabBarActiveTintColor: '#e74c3c',
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={require('../assets/images/producticon.png')} 
                style={{
                  width: size ?? 24, 
                  height: size ?? 24, 
                  tintColor: focused ? '#e74c3c' : '#888',
                }} 
              />
            ),
          }} 
        />

        <Tabs.Screen 
          name='carrinho' 
          options={{ 
            title: 'Carrinho', tabBarActiveTintColor: '#e74c3c',
            tabBarIcon: ({ focused, color, size }) => (
              <Image 
                source={require('../assets/images/carticon.png')} 
                style={{
                  width: size ?? 24, 
                  height: size ?? 24, 
                  tintColor: focused ? '#e74c3c' : '#888'
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
