import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabsLayout() {
  return (
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
            title: 'Products',
            tabBarActiveTintColor: '#e74c3c',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/producticon.png')}
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
          name="carrinho"
          options={{
            title: 'Carrinho',
            href: null,
            tabBarActiveTintColor: '#e74c3c',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/carticon.png')}
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
          name="historico"
          options={{
            title: 'Pedidos',
            tabBarActiveTintColor: '#e74c3c',
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Image
                source={require('../../assets/images/cedula.png')}
                style={{
                  width: size ?? 24,
                  height: size ?? 24,
                  tintColor: focused ? '#e74c3c' : '#888'
                }}
              />
            ),
          }}
        />
      </Tabs>
  );
}
