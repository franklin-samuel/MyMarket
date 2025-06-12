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
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          {item.observation ? (
            <Text style={styles.observation}>{item.observation}</Text>
          ) : null}

          <View style={styles.row}>
            <View style={styles.quantidade}>
              <TouchableOpacity
                onPress={() =>
                  item.quantity === 1
                    ? updateQuantity(item.id, 0)
                    : updateQuantity(item.id, item.quantity - 1)
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
          <Text style={styles.nohave}>Seu carrinho está vazio</Text>
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
        contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100, marginTop: 40 }}
      />

      <View style={styles.floatingContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push('/address')}
          activeOpacity={0.8}
        >
          <Text style={styles.floatingButtonText}>Finalizar pedido</Text>
          <Text style={styles.floatingTotal}>R$ {total.toFixed(2)}</Text>
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
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  observation: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtdButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ec364d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fcebed',
    borderRadius: 8,
  },
  qtdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  floatingButton: {
    backgroundColor: '#ec364d',
    borderRadius: 35,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#ec364d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
    height: 60
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  floatingTotal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nohave: {
    fontStyle: 'italic',
    color: '#ccc'
  }
});
