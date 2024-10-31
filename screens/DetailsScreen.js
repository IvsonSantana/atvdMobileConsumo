import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { id } = route.params;
  const [digimon, setDigimon] = useState(null);

  useEffect(() => {
    const fetchDigimonDetails = async () => {
      try {
        const response = await axios.get(`https://digi-api.com/api/v1/digimon/${id}`);
        setDigimon(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDigimonDetails();
  }, [id]);

  if (!digimon) {
    return <Paragraph>Carregando...</Paragraph>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: digimon.images[0]?.href }} />
        <Card.Content>
          <Title>{digimon.name}</Title>
          <Paragraph>Nível: {digimon.levels?.[0]?.level || 'N/A'}</Paragraph>
          <Paragraph>Tipo: {digimon.types?.[0]?.type || 'N/A'}</Paragraph>
          <Paragraph>Descrição: {digimon.descriptions?.[1]?.description || 'N/A'}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DetailsScreen;
