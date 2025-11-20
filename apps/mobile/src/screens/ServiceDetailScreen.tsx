
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useServices, useAuth } from '../shared';
import ImageSlider from '../components/ImageSlider';
import { PhoneIcon, WhatsAppIcon, ShareIcon, HeartIcon, HeartIconSolid, ClockIcon, MapPinIcon, StarIcon } from '../components/Icons';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

type ParamList = {
  ServiceDetail: {
    serviceId: number;
  };
};

type ServiceDetailScreenRouteProp = RouteProp<ParamList, 'ServiceDetail'>;

const RatingDisplay: React.FC<{ rating: number; size?: number; }> = ({ rating, size = 16 }) => (
    <View style={styles.ratingDisplayContainer}>
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} width={size} height={size} color={i < Math.round(rating) ? '#facc15' : '#d1d5db'} filled={i < Math.round(rating)} />
        ))}
    </View>
);

const ServiceDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ServiceDetailScreenRouteProp>();
  const { services, handleToggleFavorite, loading } = useServices();
  const { isPublicAuthenticated } = useAuth();
  const { serviceId } = route.params;

  const service = services.find(s => s.id === serviceId);

  useLayoutEffect(() => {
    if (service) {
      navigation.setOptions({ title: service.name });
    }
  }, [navigation, service]);

  if (loading) {
      return <DetailSkeleton />;
  }

  if (!service) {
    return (
      <View style={styles.container}><Text style={styles.errorText}>لم يتم العثور على الخدمة.</Text></View>
    );
  }
  
  const handleCall = (number: string) => Linking.openURL(`tel:${number}`);
  const handleWhatsApp = (number: string) => Linking.openURL(`https://wa.me/${number}`);
  const handleShare = async () => {
      try {
          await Share.share({ message: `تحقق من هذه الخدمة: ${service.name} في تطبيق هيليو.` });
      } catch (error) { console.log(error); }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageSlider images={service.images} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{service.name}</Text>
              <Text style={styles.address}>{service.address}</Text>
            </View>
            {isPublicAuthenticated && (
              <Pressable style={{padding: 8}} onPress={() => handleToggleFavorite(service.id)}>
                  {service.isFavorite ? <HeartIconSolid color="#ef4444" width={32} height={32} /> : <HeartIcon color="#64748b" width={32} height={32} />}
              </Pressable>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <RatingDisplay rating={service.rating} size={20} />
            <Text style={styles.ratingText}>{service.rating.toFixed(1)} ({service.reviews.length} تقييم)</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
            {service.phone?.[0] && <Pressable style={styles.actionButton} onPress={() => handleCall(service.phone[0])}><PhoneIcon color="#fff" width={24} height={24} /></Pressable>}
            {service.whatsapp?.[0] && <Pressable style={[styles.actionButton, {backgroundColor: '#25D366'}]} onPress={() => handleWhatsApp(service.whatsapp[0])}><WhatsAppIcon color="#fff" width={24} height={24} /></Pressable>}
            <Pressable style={[styles.actionButton, {backgroundColor: '#3b82f6'}]} onPress={handleShare}><ShareIcon color="#fff" width={24} height={24} /></Pressable>
        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>حول الخدمة</Text><Text style={styles.aboutText}>{service.about}</Text></View>
        
        {(service.workingHours || service.locationUrl) && (
            <View style={styles.section}>
                 {service.workingHours && <View style={styles.infoRow}><Text style={styles.infoText}>{service.workingHours}</Text><ClockIcon color="#64748b" width={20} height={20} /></View>}
                 {service.locationUrl && <View style={styles.infoRow}><Text style={[styles.infoText, styles.linkText]} onPress={() => Linking.openURL(service.locationUrl!)}>عرض على الخريطة</Text><MapPinIcon color="#64748b" width={20} height={20} /></View>}
            </View>
        )}

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>التقييمات</Text>
            {service.reviews.length > 0 ? (
                service.reviews.map(review => (
                    <View key={review.id} style={styles.reviewCard}>
                        <Text style={styles.reviewUser}>{review.username}</Text>
                        <RatingDisplay rating={review.rating} />
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                ))
            ) : <Text style={styles.infoText}>لا توجد تقييمات بعد.</Text>}
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
  title: { fontSize: 28, fontWeight: 'bold', color: '#1e293b', textAlign: 'right' },
  address: { fontSize: 16, color: '#64748b', marginTop: 4, textAlign: 'right' },
  ratingContainer: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: 12 },
  ratingDisplayContainer: { flexDirection: 'row' },
  ratingText: { fontSize: 16, fontWeight: 'bold', color: '#475569', marginLeft: 8 },
  actionsContainer: { flexDirection: 'row-reverse', justifyContent: 'space-around', marginBottom: 16 },
  actionButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#0ea5e9', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  section: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, textAlign: 'right' },
  aboutText: { fontSize: 16, lineHeight: 24, color: '#475569', textAlign: 'right' },
  infoRow: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 16, color: '#475569', marginRight: 8, textAlign: 'right' },
  linkText: { color: '#0ea5e9', textDecorationLine: 'underline' },
  reviewCard: { borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 12 },
  reviewUser: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  reviewComment: { fontSize: 15, color: '#475569', marginTop: 4, textAlign: 'right' },
  reviewDate: { fontSize: 12, color: '#94a3b8', marginTop: 8, textAlign: 'right' },
});

export default ServiceDetailScreen;
