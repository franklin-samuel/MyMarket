import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '@/data/products';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  const [qtd, setQtd] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const [observation, setObservation] = React.useState('')

  React.useEffect(() => {
    if (product) {
      const newTotal = qtd * product.price;
      setTotal(newTotal);
    }
  }, [qtd, product]);

  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total);

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Produto não encontrado 😢</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.box}>
          <View>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.observation}>
          <Text style={styles.textobs}>Alguma observação?</Text>
          <TextInput
          style={styles.obs}
          placeholder='Ex: Sem embalagem, lavado, etc.'
          placeholderTextColor='#888'
          value={observation}
          onChangeText={setObservation}
          />
        </View>
      </ScrollView>

      <View style={styles.final}>
        <View style={styles.quantity}>
          <TouchableOpacity onPress={() => setQtd(qtd + 1)}>
            <Text style={styles.buttonquantity}>+</Text>
          </TouchableOpacity>

          <Text>{qtd}</Text>

          <TouchableOpacity onPress={() => setQtd(prev => Math.max(1, prev - 1))}>
            <Text style={styles.buttonquantitymenos}>-</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.boton} onPress={() => alert('Produto adicionado ao carrinho!')}>
          <View style={styles.direction}>
            <Text style={styles.botonText}>Adicionar</Text>
            <Text style={styles.botonText}>{totalFormatado}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100, // espaço para o botão fixo no rodapé
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '80%'
  },
  image: {
    width: '90%',
    height: '50%',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: 'red',
  },
  quantity: {
    flexDirection: 'row',
    gap: 20,
    bottom: 20,
    left: 20,
    display: 'flex',
    alignItems: 'center'
  },
  textquantity: {
    fontSize: 18,
  },

  buttonquantity: {
    fontSize: 25,
    color: '#EB5160'
  },
  buttonquantitymenos: {
    fontSize: 40,
    color: '#EB5160'
  },

  box: {
    width: '90%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  boton: {
    width: '70%',
    borderRadius: 6,
    backgroundColor: '#EB5160',
    marginTop: 0,
    bottom: 20
  },
  botonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: 'bold',
  },

  direction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    gap: 10,
  },

  final: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    height: '20%'
  },

  obs: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    height: 62
  },

  textobs: {
    color: '#666',
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 5
    
  },
  
  observation: {
    margin: 20,
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    gap: 6,

  }
});
