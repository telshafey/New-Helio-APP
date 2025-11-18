import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { News } from '../../../../packages/shared-logic/src/types';
import NewsCard from './NewsCard';

interface NewsCarouselProps {
  title: string;
  news: News[];
  navigation: any;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ title, news, navigation }) => {
  if (news.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsCard 
            newsItem={item}
            onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginRight: 16,
    marginBottom: 12,
    textAlign: 'right',
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default NewsCarousel;
