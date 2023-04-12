import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Picker, Button } from 'react-native';
import Constants from 'expo-constants';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      valor: 0,
      valorConvertido: 0,
      origem: "",
      destino: ""
    }
    this.pegaValor = this.pegaValor.bind(this);
    this.pegaOrigem = this.pegaOrigem.bind(this);
    this.pegaDestino = this.pegaDestino.bind(this);
    this.converterMoeda = this.converterMoeda.bind(this);
  }

  pegaValor(valor){
    this.setState({valor: valor});
    document.getElementById("valor").style.display = "block";
  }

  pegaOrigem(origem){
    this.setState({origem: origem});
    document.getElementById("origem").style.display = "block";
  }

  pegaDestino(destino){
    this.setState({destino: destino});
    document.getElementById("destino").style.display = "block";
  }

  converterMoeda(valor, origem, destino) {
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
    return this.setState({valorConvertido: valor * taxa});
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Conversor de Moedas 
        </Text>
        <Text style={styles.subtitle}>
          Dólar, Real e Euro
        </Text>

        <Text style={styles.label}>Valor: </Text>
        <TextInput style={styles.inputs} placeholder="Digite o valor: " onChangeText={this.pegaValor}></TextInput>

        <Text style={styles.label}>De: </Text>
        <Picker  style={styles.inputs} selectedValue={this.state.origem} onValueChange={this.pegaOrigem}>
          <Picker.Item key={1} value={""} label="Escolha uma moeda:"></Picker.Item>
          <Picker.Item key={2} value={"Dólar"} label="Dólar"></Picker.Item>
          <Picker.Item key={3} value={"Real"} label="Real"></Picker.Item>
          <Picker.Item key={4} value={"Euro"} label="Euro"></Picker.Item>
        </Picker>

        <Text style={styles.label}>Para: </Text>
        <Picker  style={styles.inputs} selectedValue={this.state.destino} onValueChange={this.pegaDestino}>
          <Picker.Item key={1} value={""} label="Escolha uma moeda:"></Picker.Item>
          <Picker.Item key={2} value={"Dólar"} label="Dólar"></Picker.Item>
          <Picker.Item key={3} value={"Real"} label="Real"></Picker.Item>
          <Picker.Item key={4} value={"Euro"} label="Euro"></Picker.Item>
        </Picker>

        <View style={styles.button}>
          <Button title="Converter" onPress={() => this.converterMoeda(this.state.valor, this.state.origem, this.state.destino)}></Button>
        </View>

        <div style={{display: "none"}} id="valor">
          <Text>Valor: {this.state.valor}</Text>
        </div>

        <div style={{display: "none"}} id="origem">
          <Text>De: {this.state.origem}</Text>
        </div>

        <div style={{display: "none"}} id="destino">
           <Text>Para: {this.state.destino}</Text>
        </div>
        <Text style={styles.resultado}>Resultado: {this.state.valorConvertido}</Text>
      </View>
    );
  }
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
