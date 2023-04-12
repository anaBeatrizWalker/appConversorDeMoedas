import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Picker, Button } from 'react-native';
import Constants from 'expo-constants';

export default function App(){
  const [valor, setValor] = useState(0.0);
  const [valorConvertido, setValorConvetido] = useState(0.0);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  function pegaValor(valor){
    setValor(valor);
    document.getElementById("valor").style.display = "block";
  }

  function pegaOrigem(origem){
    setOrigem(origem);
    document.getElementById("origem").style.display = "block";
  }

  function pegaDestino(destino){
    setDestino(destino);
    document.getElementById("destino").style.display = "block";
  }

  function converterMoeda(valor, origem, destino) {
    const taxaConversao = {
      "Dólar": {
        "Real": 5.27,
        "Euro": 0.85
      },
      "Real": {
        "Dólar": 0.19,
        "Euro": 0.16
      },
      "Euro": {
        "Dólar": 1.18,
        "Real": 6.27
      }
    };
    const taxa = taxaConversao[origem][destino];
    return setValorConvetido(valor * taxa);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Conversor de Moedas 
      </Text>
      <Text style={styles.subtitle}>
        Dólar, Real e Euro
      </Text>

      <Text style={styles.label}>Valor: </Text>
      <TextInput style={styles.inputs} placeholder="Digite o valor: " onChangeText={pegaValor}></TextInput>

      <Text style={styles.label}>De: </Text>
      <Picker  style={styles.inputs} selectedValue={origem} onValueChange={pegaOrigem}>
        <Picker.Item key={1} value={""} label="Escolha uma moeda:"></Picker.Item>
        <Picker.Item key={2} value={"Dólar"} label="Dólar"></Picker.Item>
        <Picker.Item key={3} value={"Real"} label="Real"></Picker.Item>
        <Picker.Item key={4} value={"Euro"} label="Euro"></Picker.Item>
      </Picker>

      <Text style={styles.label}>Para: </Text>
      <Picker  style={styles.inputs} selectedValue={destino} onValueChange={pegaDestino}>
        <Picker.Item key={1} value={""} label="Escolha uma moeda:"></Picker.Item>
        <Picker.Item key={2} value={"Dólar"} label="Dólar"></Picker.Item>
        <Picker.Item key={3} value={"Real"} label="Real"></Picker.Item>
        <Picker.Item key={4} value={"Euro"} label="Euro"></Picker.Item>
      </Picker>

      <View style={styles.button}>
        <Button title="Converter" onPress={() => converterMoeda(valor, origem, destino)}></Button>
      </View>

      <div style={{display: "none"}} id="valor">
        <Text>Valor: {valor}</Text>
      </div>

      <div style={{display: "none"}} id="origem">
        <Text>De: {origem}</Text>
      </div>

      <div style={{display: "none"}} id="destino">
          <Text>Para: {destino}</Text>
      </div>
      <Text style={styles.resultado}>Resultado: {valorConvertido.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#',
    padding: 10,
    marginTop: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    margin: 5
  },
  inputs: {
    border: "solid thin gray",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  button: {
    marginTop: 15,
    marginBottom: 30
  },
  resultado: {
    maxWidth: 300,
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
