import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/cartContext';
import { useRouter } from 'expo-router';

export default function ScreenCart() {
  const { cart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function renderProduct({ item }: { item: any }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.observation}>{item.observation}</Text>

          <View style={styles.row}>
            <View style={styles.quantidade}>
              <TouchableOpacity
                onPress={() =>
                  item.quantity === 1 ? updateQuantity(item.id, 0) : updateQuantity(item.id, item.quantity - 1)
                }
              >
                <Text style={styles.qtdButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtdText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                <Text style={styles.qtdButton}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.total}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={styles.page}>
        <View style={styles.noone}>
          <Text>Seu carrinho está vazio 😢</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingVertical: 20, marginTop: 40 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={() => router.push('/address')}>
          <Text style={styles.clearButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',

  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    padding: 12,
    gap: 12,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  observation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtdButton: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
