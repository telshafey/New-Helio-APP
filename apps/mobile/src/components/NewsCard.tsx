
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, DimensionValue } from 'react-native';
import type { News } from '../shared';

interface NewsCardProps {
  newsItem: News;
  onPress: () => void;
  width?: DimensionValue;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, onPress, width = 300 }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}>
      <Image 
        source={{ uri: newsItem.imageUrl }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.date}>{new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn')} • {newsItem.author}</Text>
        <Text style={styles.title} numberOfLines={2}>{newsItem.title}</Text>
        <Text style={styles.contentText} numberOfLines={2}>{newsItem.content}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginLeft: 16, // For horizontal carousels
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 180,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 4,
  },
  contentText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'right',
    lineHeight: 20,
  }
});

export default NewsCard;