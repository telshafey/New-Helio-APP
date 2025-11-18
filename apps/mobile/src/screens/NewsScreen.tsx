import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import { useNews } from '../../../../packages/shared-logic/src/context/NewsContext';
import NewsCard from '../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardSkeleton from '../components/skeletons/CardSkeleton';

type NewsStackParamList = {
  NewsList: undefined;
  NewsDetail: { newsId: number };
};
type ScreenNavigationProp = NativeStackNavigationProp<NewsStackParamList, 'NewsList'>;

const NewsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { news, loading } = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  if (loading) {
    return (
        <View style={styles.container}>
            <FlatList
                data={[1,2,3,4]}
                keyExtractor={item => item.toString()}
                renderItem={() => <View style={{ marginVertical: 8, paddingHorizontal: 16 }}><CardSkeleton height={280} /></View>}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
  }

  return (
    <FlatList
        data={sortedNews}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <NewsCard 
                newsItem={item} 
                onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
                width="auto"
            />
        )}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0891b2']} />
        }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  contentContainer: {
    padding: 16,
  },
});

export default NewsScreen;