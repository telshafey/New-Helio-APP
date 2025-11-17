import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useData } from '../../../../packages/shared-logic/src/context/DataContext';

const AboutAppScreen = () => {
  const { publicPagesContent } = useData();
  const content = publicPagesContent.about;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.intro}>{content.intro}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{content.vision.title}</Text>
        <Text style={styles.cardText}>{content.vision.text}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{content.mission.title}</Text>
        <Text style={styles.cardText}>{content.mission.text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 24,
    color: '#334155'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0891b2',
    textAlign: 'right',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
    color: '#475569'
  },
});

export default AboutAppScreen;
