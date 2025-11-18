import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useProperties } from '../../../../packages/shared-logic/src/context/PropertiesContext';
import ImageSlider from '../components/ImageSlider';
import { PhoneIcon, ShareIcon, CheckCircleIcon } from '../components/Icons';
import ShareButton from '../components/common/ShareButton';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

type ParamList = {
  PropertyDetail: {
    propertyId: number;
  };
};
type ScreenRouteProp = RouteProp<ParamList, 'PropertyDetail'>;

const PropertyDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const { properties, loading } = useProperties();
  const { propertyId } = route.params;

  const property = properties.find(p => p.id === propertyId);

  useLayoutEffect(() => {
    if (property) {
      navigation.setOptions({ title: property.title });
    }
  }, [navigation, property]);

  if (loading) {
      return <DetailSkeleton />;
  }

  if (!property) {
    return <View style={styles.container}><Text style={styles.errorText}>لم يتم العثور على العقار.</Text></View>;
  }
  
  const handleCall = (number: string) => Linking.openURL(`tel:${number}`);

  const priceLabel = property.type === 'rent' ? 'جنيه/شهرياً' : 'جنيه';

  return (
    <ScrollView style={styles.container}>
      <ImageSlider images={property.images} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{property.title}</Text>
            <View style={[styles.typeBadge, { backgroundColor: property.type === 'sale' ? '#0891b2' : '#8b5cf6' }]}>
                <Text style={styles.typeText}>{property.type === 'sale' ? 'للبيع' : 'للإيجار'}</Text>
            </View>
          </View>
          <Text style={styles.address}>{property.location.address}</Text>
          <Text style={styles.price}>{property.price.toLocaleString('ar-EG')} <Text style={styles.priceLabel}>{priceLabel}</Text></Text>
        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>الوصف</Text><Text style={styles.aboutText}>{property.description}</Text></View>
        
        {property.amenities.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>وسائل الراحة</Text>
                <View style={styles.amenitiesContainer}>
                    {property.amenities.map((amenity, index) => (
                        <View key={index} style={styles.amenityItem}>
                            <CheckCircleIcon color="#10b981" width={20} height={20} />
                            <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                    ))}
                </View>
            </View>
        )}
        
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>معلومات الاتصال</Text>
            <Text style={styles.contactName}>{property.contact.name}</Text>
            <View style={styles.actionsContainer}>
                <Pressable style={[styles.actionButton, styles.callButton]} onPress={() => handleCall(property.contact.phone)}>
                    <PhoneIcon color="#fff" width={24} height={24} />
                    <Text style={styles.actionButtonText}>اتصال: {property.contact.phone}</Text>
                </Pressable>
                <ShareButton title={property.title} message={`تحقق من هذا العقار: ${property.title} في تطبيق هيليو.`} />
            </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 50 },
  contentContainer: { padding: 16 },
  headerSection: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 16 },
  titleContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', textAlign: 'right', flex: 1 },
  typeBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginLeft: 8 },
  typeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  address: { fontSize: 16, color: '#64748b', marginTop: 8, textAlign: 'right' },
  price: { fontSize: 28, fontWeight: 'bold', color: '#0891b2', marginTop: 12, textAlign: 'right' },
  priceLabel: { fontSize: 16, fontWeight: 'normal', color: '#64748b' },
  section: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, textAlign: 'right' },
  aboutText: { fontSize: 16, lineHeight: 24, color: '#475569', textAlign: 'right' },
  amenitiesContainer: { flexDirection: 'row-reverse', flexWrap: 'wrap' },
  amenityItem: { flexDirection: 'row-reverse', alignItems: 'center', width: '50%', marginBottom: 8, paddingLeft: 8 },
  amenityText: { fontSize: 15, color: '#334155', marginRight: 8 },
  contactName: { fontSize: 18, fontWeight: '600', color: '#334155', textAlign: 'right', marginBottom: 12 },
  actionsContainer: { gap: 12 },
  actionButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 8, gap: 10 },
  callButton: { backgroundColor: '#22c55e' },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});

export default PropertyDetailScreen;