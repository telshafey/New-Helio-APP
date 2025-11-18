import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useNews } from '../../../../packages/shared-logic/src/context/NewsContext';
import ShareButton from '../components/common/ShareButton';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

type ParamList = {
  NewsDetail: {
    newsId: number;
  };
};

type ScreenRouteProp = RouteProp<ParamList, 'NewsDetail'>;

const NewsDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const { news, loading } = useNews();
  const { newsId } = route.params;

  const newsItem = news.find(n => n.id === newsId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'تفاصيل الخبر' });
  }, [navigation]);

  if (loading) {
      return <DetailSkeleton />;
  }

  if (!newsItem) {
    return <View style={styles.container}><Text style={styles.errorText}>لم يتم العثور على الخبر.</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: newsItem.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.meta}>{new Date(newsItem.date).toLocaleDateString('ar-EG-u-nu-latn')} • {newsItem.author}</Text>
        <Text style={styles.body}>{newsItem.content}</Text>
        <View style={styles.actions}>
            <ShareButton title={newsItem.title} message={newsItem.content} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 50 },
  image: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginBottom: 8, color: '#1e293b' },
  meta: { fontSize: 14, color: '#64748b', textAlign: 'right', marginBottom: 16 },
  body: { fontSize: 17, lineHeight: 26, color: '#334155', textAlign: 'right' },
  actions: { marginTop: 24 },
});

export default NewsDetailScreen;