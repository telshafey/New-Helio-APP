import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useServices } from '../../../../packages/shared-logic/src/context/ServicesContext';
import { useCommunity } from '../../../../packages/shared-logic/src/context/AppContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/common/EmptyState';
import StatusBadge from '../components/common/StatusBadge';
import { BuildingStorefrontIcon, TagIcon, PlusIcon, StarIcon, ChatBubbleOvalLeftIcon } from '../components/Icons';

type MoreStackParamList = {
    NewOffer: undefined;
    ServiceDetail: { serviceId: number };
};
type NavigationProp = NativeStackNavigationProp<MoreStackParamList>;

const MyBusinessScreen = () => {
    const { currentPublicUser } = useAuth();
    const { services } = useServices();
    const { offers } = useCommunity();
    const navigation = useNavigation<NavigationProp>();

    const myServices = React.useMemo(() => services.filter(s => s.ownerId === currentPublicUser?.id), [services, currentPublicUser]);
    const myOffers = React.useMemo(() => offers.filter(o => o.ownerId === currentPublicUser?.id), [offers, currentPublicUser]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>خدماتي</Text>
                {myServices.length > 0 ? myServices.map(service => (
                    <TouchableOpacity key={service.id} style={styles.card} onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}>
                        <Text style={styles.cardTitle}>{service.name}</Text>
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}><StarIcon color="#facc15" width={16} height={16} /><Text>{service.rating.toFixed(1)}</Text></View>
                            <View style={styles.statItem}><ChatBubbleOvalLeftIcon color="#64748b" width={16} height={16} /><Text>{service.reviews.length} تقييم</Text></View>
                        </View>
                    </TouchableOpacity>
                )) : <EmptyState icon={<BuildingStorefrontIcon width={48} height={48} color="#9ca3af"/>} title="لا توجد خدمات" message="لم يتم ربط خدمات بحسابك."/>}
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>عروضي الحصرية</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewOffer')}>
                        <PlusIcon color="#fff" width={16} height={16} />
                        <Text style={styles.addButtonText}>إضافة عرض</Text>
                    </TouchableOpacity>
                </View>
                {myOffers.length > 0 ? myOffers.map(offer => (
                    <View key={offer.id} style={styles.card}>
                        <View style={styles.offerHeader}>
                            <Text style={styles.cardTitle}>{offer.title}</Text>
                            <StatusBadge status={offer.status} />
                        </View>
                        <Text style={styles.offerService}>للخدمة: {services.find(s => s.id === offer.serviceId)?.name}</Text>
                        <Text style={styles.offerDate}>ينتهي في: {offer.endDate}</Text>
                    </View>
                )) : <EmptyState icon={<TagIcon width={48} height={48} color="#9ca3af"/>} title="لا توجد عروض" message="أضف عروضاً حصرية لجذب العملاء."/>}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    section: { margin: 16 },
    sectionHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold' },
    addButton: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#0891b2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, gap: 4 },
    addButtonText: { color: 'white', fontWeight: 'bold' },
    card: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
    statsContainer: { flexDirection: 'row-reverse', gap: 16, marginTop: 8 },
    statItem: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
    offerHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
    offerService: { textAlign: 'right', color: '#64748b', marginTop: 4 },
    offerDate: { textAlign: 'right', color: '#94a3b8', fontSize: 12, marginTop: 2 },
});

export default MyBusinessScreen;