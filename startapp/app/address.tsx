import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAddress } from './contexts/adressContext';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

export default function AddressScreen() {
  const { addresses, addAddress, selectAddress, selectedAddress, removeAddress } = useAddress();
  const router = useRouter();

  const [label, setLabel] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [bairro, setBairro] = useState('');
  const [city, setCity] = useState('');
  const [showForm, setShowForm] = useState(false);

  function handleAddAddress() {
    if (label.trim() && street.trim() && number.trim() && bairro.trim() && city.trim()) {
      const details = `${street}, ${number}${complement ? ' - ' + complement : ''}, ${bairro}, ${city}`;
      const newAddress = {
        id: uuidv4(),
        label,
        details,
      };
      addAddress(newAddress);
      setLabel('');
      setStreet('');
      setNumber('');
      setComplement('');
      setBairro('');
      setCity('');
      setShowForm(false);
    }
  }

  function handleSelect(id: string) {
    selectAddress(id);
  }

  function handleContinue() {
    if (selectedAddress) {
      router.push('/selectPayment');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Selecione um Endereço</Text>

          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            style={{ marginBottom: 20 }}
            renderItem={({ item }) => (
              <View style={[styles.addressCard, selectedAddress?.id === item.id && styles.selectedCard]}>
                <TouchableOpacity style={styles.cardContent} onPress={() => handleSelect(item.id)}>
                  <View style={styles.checkView}>
                    <View style={styles.checkbox}>
                      <View style={selectedAddress?.id === item.id ? styles.checked : styles.unchecked} />
                    </View>
                  </View>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    <Text style={styles.addressText}>{item.details}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeAddress(item.id)}>
                  <Image source={require('../assets/images/lixo.png')} style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={{ color: '#555' }}>Nenhum endereço salvo ainda.</Text>}
          />

          {!showForm && (
            <View style={styles.form}>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
                <Text style={styles.addButtonText}>+ Adicionar novo endereço</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.continueButton, !selectedAddress && { opacity: 0.5 }]}
                disabled={!selectedAddress}
                onPress={handleContinue}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}

          {showForm && (
            <View style={styles.form}>
              <Text style={styles.subtitle}>Novo Endereço</Text>

              <TextInput placeholder="Apelido (ex: Casa)" value={label} onChangeText={setLabel} style={styles.input} />
              <TextInput placeholder="Rua" value={street} onChangeText={setStreet} style={styles.input} />

              <View style={styles.row}>
                <TextInput
                  placeholder="Número"
                  value={number}
                  onChangeText={setNumber}
                  keyboardType="numeric"
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  placeholder="Complemento"
                  value={complement}
                  onChangeText={setComplement}
                  style={[styles.input, styles.halfInput]}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  placeholder="Bairro"
                  value={bairro}
                  onChangeText={setBairro}
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  placeholder="Cidade"
                  value={city}
                  onChangeText={setCity}
                  style={[styles.input, styles.halfInput]}
                />
              </View>

              <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
                <Text style={styles.buttonText}>Salvar Endereço</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderColor: '#ec364d',
    backgroundColor: '#ffeceb',
  },
  cardContent: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unchecked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  checked: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ec364d',
  },
  checkView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
  },
  addressInfo: {
    flexShrink: 1,
  },
  addressLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressText: {
    color: '#555',
    marginTop: 4,
  },
  trashIcon: {
    width: 24,
    height: 24,
    tintColor: '#ec364d'
  },
  form: {
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#ec364d',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  addButtonText: {
    color: '#ec364d',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#ec364d',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
});
