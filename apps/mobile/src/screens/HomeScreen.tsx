import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNews } from '../../../../packages/shared-logic/src/context/NewsContext';
import { useServices } from '../../../../packages/shared-logic/src/context/ServicesContext';
import { useProperties } from '../../../../packages/shared-logic/src/context/PropertiesContext';
import AdSlider from '../components/AdSlider';
import ServicesCarousel from '../components/ServicesCarousel';
import PropertyCarousel from '../components/PropertyCarousel';
import NewsCarousel from '../components/NewsCarousel';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation param list for type safety
type HomeStackParamList = {
  Home: undefined;
  ServiceDetail: { serviceId: number };
  PropertyDetail: { propertyId: number };
  NewsDetail: { newsId: number };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { advertisements, news } = useNews();
  const { services } = useServices();
  const { properties } = useProperties();

  const sliderAds = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return advertisements.filter(ad => {
        const start = new Date(ad.startDate);
        const end = new Date(ad.endDate);
        return today >= start && today <= end;
    });
  }, [advertisements]);

  const recentServices = [...services].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 10);
  const recentNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
  const recentProperties = [...properties].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 8);

  return (
    <ScrollView style={styles.container}>
      {sliderAds.length > 0 && <AdSlider ads={sliderAds} navigation={navigation} />}
      
      <View style={styles.carouselContainer}>
        <ServicesCarousel title="أحدث الخدمات" services={recentServices} navigation={navigation} />
      </View>

      <View style={styles.carouselContainer}>
        <PropertyCarousel title="أحدث العقارات" properties={recentProperties} navigation={navigation} />
      </View>

      <View style={styles.carouselContainer}>
        <NewsCarousel title="آخر الأخبار" news={recentNews} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', // slate-100
  },
  carouselContainer: {
    marginVertical: 16,
  },
});

export default HomeScreen;
