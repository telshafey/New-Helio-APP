import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { News } from '../../../../packages/shared-logic/src/types';

interface NewsCardProps {
  newsItem: News;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image 
        source={{ uri: newsItem.imageUrl }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.date}>{new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn')}</Text>
        <Text style={styles.title} numberOfLines={2}>{newsItem.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  date: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textAlign: 'right',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    lineHeight: 22,
  },
});

export default NewsCard;
