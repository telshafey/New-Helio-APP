import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useData } from '../../../../packages/shared-logic/src/context/DataContext';

const TermsOfUseScreen = () => {
  const { publicPagesContent } = useData();
  const content = publicPagesContent.terms;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {content.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.title}>{section.title}</Text>
          {section.content.map((item, itemIndex) => {
              if (typeof item === 'string') {
                  return <Text key={itemIndex} style={styles.paragraph}>{item}</Text>;
              } else if (item.list) {
                  return (
                      <View key={itemIndex} style={styles.list}>
                          {item.list.map((li, liIndex) => <Text key={liIndex} style={styles.listItem}>{`\u2022 ${li}`}</Text>)}
                      </View>
                  );
              }
              return null;
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  contentContainer: { padding: 16 },
  section: { marginBottom: 24 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 12,
    color: '#1e293b'
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 8,
    color: '#334155'
  },
  list: {
    marginRight: 16,
    marginVertical: 8,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 4,
    color: '#334155'
  }
});

export default TermsOfUseScreen;
