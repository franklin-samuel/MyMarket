import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useOrder } from '../app/contexts/orderContext'; 
import { useAddress } from '../app/contexts/adressContext';
import { useRouter } from 'expo-router';

const deliveryOptions = ['Entrega', 'Retirada'] as const;
const paymentOptions = ['Pix', 'Dinheiro', 'Cartão'] as const;

const primaryColor = '#e74c3c';

export default function SelectPaymentScreen() {
  const { order, setDeliveryType, setPaymentMethod, confirmOrder } = useOrder();
  const { selectedAddress } = useAddress();
  const router = useRouter();

  const isConfirmEnabled = !!order.deliveryType && !!order.paymentMethod;

  const handleConfirm = () => {
    try {
      confirmOrder();
      Alert.alert('Pedido confirmado!', 'Seu pedido foi registrado com sucesso.');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de entrega</Text>
      <View style={styles.optionsRow}>
        {deliveryOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              order.deliveryType === option && styles.optionSelected,
            ]}
            onPress={() => setDeliveryType(option)}
          >
            <Text
              style={[
                styles.optionText,
                order.deliveryType === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {order.deliveryType === 'Entrega' && selectedAddress && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Endereço selecionado:</Text>
          <Text style={styles.addressText}>{selectedAddress.details}</Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.changeAddressText}>Deseja alterar o endereço?</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.title, { marginTop: 30 }]}>Selecione a forma de pagamento</Text>
      <View style={styles.optionsRow}>
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              order.paymentMethod === option && styles.optionSelected,
            ]}
            onPress={() => setPaymentMethod(option)}
          >
            <Text
              style={[
                styles.optionText,
                order.paymentMethod === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          !isConfirmEnabled && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirm}
        disabled={!isConfirmEnabled}
      >
        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  optionsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: primaryColor,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  confirmButton: {
    marginTop: 40,
    backgroundColor: primaryColor,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  addressContainer: {
    marginTop: 15,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  addressLabel: {
    fontWeight: '600',
    marginBottom: 5,
  },
  addressText: {
    color: '#555',
  },
  changeAddressText: {
    color: primaryColor,
    marginTop: 10,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
