import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type ParamList = {
  NewsDetail: {
    newsId: number;
  };
};

type ScreenRouteProp = RouteProp<ParamList, 'NewsDetail'>;

const NewsDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const { newsId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>News Detail Screen</Text>
      <Text style={styles.text}>News ID: {newsId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
});

export default NewsDetailScreen;
