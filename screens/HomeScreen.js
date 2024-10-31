import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [digimon, setDigimon] = useState([]);

  const searchDigimon = async () => {
    try {
      const response = await axios.get(`https://digi-api.com/api/v1/digimon/${query}`);
      setDigimon([response.data] || []);  // Corrige a estrutura de dados
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do Digimon..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button mode="contained" onPress={searchDigimon} style={styles.button}>
        Buscar
      </Button>

      <FlatList
        data={digimon}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.images[0].href  }} />
            <Card.Content>
              <Title>{item.name}</Title>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Details', { id: item.id })}>
                Ver Detalhes
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default HomeScreen;
