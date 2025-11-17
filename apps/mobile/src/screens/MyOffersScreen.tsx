import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCommunity } from '../../../../packages/shared-logic/src/context/AppContext';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useServices } from '../../../../packages/shared-logic/src/context/ServicesContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EmptyState from '../components/common/EmptyState';
import { TagIcon, QrCodeIcon } from '../components/Icons';

type RootStackParamList = {
    Offers: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyOffersScreen = () => {
    const { userOffers, offers } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();
    const navigation = useNavigation<NavigationProp>();

    const myActiveOffers = userOffers.filter(uo => uo.userId === currentPublicUser?.id && uo.status === 'active');

    return (
        <View style={styles.container}>
            <FlatList
                data={myActiveOffers}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: userOffer }) => {
                    const offerDetails = offers.find(o => o.id === userOffer.offerId);
                    if (!offerDetails) return null;
                    const serviceDetails = services.find(s => s.id === offerDetails.serviceId);
                    return (
                        <View style={styles.card}>
                            <View style={styles.qrContainer}>
                                <QrCodeIcon color="#9ca3af" width={80} height={80}/>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.title}>{offerDetails.title}</Text>
                                {serviceDetails && <Text style={styles.serviceName}>لدى {serviceDetails.name}</Text>}
                                <Text style={styles.codeLabel}>استخدم الرمز:</Text>
                                <Text style={styles.redeemCode}>{userOffer.redeemCode}</Text>
                            </View>
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <EmptyState
                            icon={<TagIcon width={64} height={64} color="#9ca3af" />}
                            title="ليس لديك عروض نشطة"
                            message="ابدأ بتصفح العروض الحصرية واحصل على ما يناسبك!"
                        />
                         <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Offers')}>
                            <Text style={styles.browseButtonText}>تصفح العروض</Text>
                         </TouchableOpacity>
                    </View>
                }
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    card: { backgroundColor: 'white', borderRadius: 12, margin: 16, flexDirection: 'row-reverse', alignItems: 'center', padding: 16 },
    qrContainer: { padding: 12, backgroundColor: '#f1f5f9', borderRadius: 8 },
    detailsContainer: { flex: 1, marginRight: 16 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
    serviceName: { color: '#64748b', textAlign: 'right', marginTop: 4 },
    codeLabel: { color: '#64748b', textAlign: 'right', marginTop: 12, fontSize: 12 },
    redeemCode: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', color: '#0891b2', fontFamily: 'monospace' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    browseButton: { marginTop: 24, backgroundColor: '#0891b2', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 },
    browseButtonText: { color: 'white', fontWeight: 'bold' }
});

export default MyOffersScreen;