
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { useAuth, useServices, useCommunity } from '../shared';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingBagIcon, TagIcon, ChatBubbleOvalLeftIcon, StarIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '../components/Icons';
import type { Review } from '../shared';
import EmptyState from '../components/common/EmptyState';
import StatusBadge from '../components/common/StatusBadge';

// Simple Modal Component for this screen
const ReplyModal: React.FC<{ isVisible: boolean; onClose: () => void; children: React.ReactNode }> = ({ isVisible, onClose, children }) => (
    <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
                {children}
            </View>
        </View>
    </Modal>
);

const ReplyForm: React.FC<{ review: Review; onSave: (reply: string) => void; onClose: () => void; }> = ({ review, onSave, onClose }) => {
    const [reply, setReply] = useState(review.adminReply || '');
    const handleSubmit = () => { onSave(reply); };
    return (
        <View>
            <Text style={styles.modalTitle}>الرد على {review.username}</Text>
            <TextInput
                value={reply}
                onChangeText={setReply}
                multiline
                numberOfLines={4}
                style={styles.replyInput}
                placeholder="اكتب ردك هنا..."
            />
            <View style={styles.replyActions}>
                <TouchableOpacity onPress={onClose} style={[styles.replyButtonAction, styles.cancelButton]}>
                    <Text style={styles.cancelButtonText}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={[styles.replyButtonAction, styles.saveButton]}>
                    <Text style={styles.saveButtonText}>حفظ الرد</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const MyBusinessScreen: React.FC = () => {
    const { currentPublicUser } = useAuth();
    const { services, handleReplyToReview } = useServices();
    const { offers, handleDeleteOffer } = useCommunity();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [replyingToReview, setReplyingToReview] = useState<{ review: Review; serviceId: number } | null>(null);

    const myServices = useMemo(() => {
        if (!currentPublicUser) return [];
        return services.filter(s => s.ownerId === currentPublicUser.id);
    }, [services, currentPublicUser]);

    const myOffers = useMemo(() => {
        if (!currentPublicUser) return [];
        return offers.filter(o => o.ownerId === currentPublicUser.id)
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [offers, currentPublicUser]);

    const myReviews = useMemo(() => {
        if (myServices.length === 0) return [];
        return myServices.flatMap(service =>
            service.reviews.map(review => ({
                ...review,
                serviceId: service.id,
                serviceName: service.name,
            }))
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5); // show latest 5
    }, [myServices]);

    const handleOpenReplyForm = (review: Review, serviceId: number) => {
        setReplyingToReview({ review, serviceId });
        setReplyModalOpen(true);
    };

    const handleSaveReply = (reply: string) => {
        if (replyingToReview) {
            handleReplyToReview(replyingToReview.serviceId, replyingToReview.review.id, reply);
            setReplyModalOpen(false);
            setReplyingToReview(null);
        }
    };
    
    if (!currentPublicUser) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.innerContent}>
                    
                    {/* My Services */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <ShoppingBagIcon color="#334155" width={24} height={24} />
                            <Text style={styles.sectionTitle}>خدماتي</Text>
                        </View>
                        <View style={styles.sectionBody}>
                             {myServices.length > 0 ? myServices.map(service => (
                                <View key={service.id} style={styles.card}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.cardTitle}>{service.name}</Text>
                                        <View style={styles.cardStats}>
                                            <StarIcon color="#facc15" width={16} height={16}/> 
                                            <Text style={styles.cardStatsText}>{service.rating.toFixed(1)}</Text>
                                            <Text style={styles.cardStatsSeparator}>|</Text>
                                            <ChatBubbleOvalLeftIcon color="#64748b" width={16} height={16}/> 
                                            <Text style={styles.cardStatsText}>{service.reviews.length} تقييم</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })} style={styles.viewButton}>
                                        <Text style={styles.viewButtonText}>عرض</Text>
                                    </TouchableOpacity>
                                </View>
                             )) : <EmptyState icon={<ShoppingBagIcon width={48} height={48} color="#9ca3af"/>} title="لا توجد خدمات" message="لم يتم ربط أي خدمات بحسابك."/>}
                        </View>
                    </View>

                    {/* My Offers */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <TagIcon color="#334155" width={24} height={24} />
                            <Text style={styles.sectionTitle}>عروضي الحصرية</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('NewOffer')} style={styles.addButton}>
                                <PlusIcon color="#fff" width={16} height={16}/>
                                <Text style={styles.addButtonText}>إضافة</Text>
                            </TouchableOpacity>
                        </View>
                         <View style={styles.sectionBody}>
                             {myOffers.length > 0 ? myOffers.map(offer => (
                                 <View key={offer.id} style={styles.card}>
                                    <View style={styles.offerContent}>
                                        <Image source={{ uri: offer.imageUrl }} style={styles.offerImage} />
                                        <View style={styles.offerDetails}>
                                            <Text style={styles.cardTitle}>{offer.title}</Text>
                                            <Text style={styles.cardSubtitle}>للخدمة: {services.find(s=> s.id === offer.serviceId)?.name}</Text>
                                            <Text style={styles.cardDate}>تنتهي في: {offer.endDate}</Text>
                                             {offer.status === 'rejected' && <Text style={styles.rejectionReason}>السبب: {offer.rejectionReason}</Text>}
                                        </View>
                                    </View>
                                    <View style={styles.offerActions}>
                                        <StatusBadge status={offer.status} />
                                        <View style={styles.offerActionButtons}>
                                            <TouchableOpacity onPress={() => handleDeleteOffer(offer.id)} style={styles.iconButton}>
                                                <TrashIcon color="#ef4444" width={20} height={20}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </div>
                             )) : <EmptyState icon={<TagIcon width={48} height={48} color="#9ca3af"/>} title="لا توجد عروض" message="ابدأ بإضافة أول عرض."/>}
                        </View>
                    </section>

                    {/* My Reviews */}
                    <View style={styles.section}>
                         <View style={styles.sectionHeader}>
                             <ChatBubbleOvalLeftIcon color="#334155" width={24} height={24} />
                             <Text style={styles.sectionTitle}>أحدث التقييمات</Text>
                         </View>
                         <View style={styles.sectionBody}>
                            {myReviews.length > 0 ? myReviews.map(review => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View>
                                        <Text style={styles.reviewUser}>{review.username} <Text style={styles.reviewOnService}>على "{review.serviceName}"</Text></Text>
                                        <View style={styles.cardStats}><StarIcon color="#facc15" width={16} height={16}/> 
                                            <Text style={styles.cardStatsText}>{review.rating}/5</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                    {review.adminReply ? (
                                        <Text style={styles.adminReply}>ردك: {review.adminReply}</Text>
                                    ) : (
                                        <TouchableOpacity style={styles.replyButton} onPress={() => handleOpenReplyForm(review, review.serviceId)}>
                                            <ChatBubbleOvalLeftIcon width={16} height={16} color="#0891b2" />
                                            <Text style={styles.replyButtonText}>أضف رداً</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )) : <EmptyState icon={<ChatBubbleOvalLeftIcon width={48} height={48} color="#9ca3af"/>} title="لا توجد تقييمات" message="لا توجد تقييمات جديدة."/>}
                         </div>
                    </View>
                </View>
            </View>
            
            <ReplyModal isVisible={isReplyModalOpen} onClose={() => setReplyModalOpen(false)}>
                {replyingToReview && <ReplyForm review={replyingToReview.review} onSave={handleSaveReply} onClose={() => setReplyModalOpen(false)} />}
            </ReplyModal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    mainContent: { padding: 16 },
    innerContent: { width: '100%' },
    section: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, marginBottom: 12 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'right', color: '#1e293b' },
    sectionBody: { gap: 12 },
    card: { backgroundColor: 'white', padding: 16, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', color: '#1e293b' },
    cardStats: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, marginTop: 4 },
    cardStatsText: { fontSize: 14, color: '#64748b' },
    cardStatsSeparator: { marginHorizontal: 6, color: '#cbd5e1' },
    viewButton: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    viewButtonText: { fontWeight: 'bold', color: '#334155' },
    addButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, backgroundColor: '#0891b2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
    offerContent: { flexDirection: 'row-reverse', gap: 12 },
    offerImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#e2e8f0' },
    offerDetails: { flex: 1 },
    cardSubtitle: { fontSize: 14, color: '#64748b', textAlign: 'right' },
    cardDate: { fontSize: 12, color: '#94a3b8', textAlign: 'right' },
    rejectionReason: { fontSize: 12, color: '#ef4444', textAlign: 'right' },
    offerActions: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 8 },
    offerActionButtons: { flexDirection: 'row-reverse', gap: 8 },
    iconButton: { padding: 4 },
    reviewCard: { backgroundColor: 'white', padding: 16, borderRadius: 12, elevation: 2 },
    reviewUser: { fontWeight: 'bold', textAlign: 'right', color: '#1e293b' },
    reviewOnService: { fontWeight: 'normal', fontSize: 12, color: '#64748b' },
    reviewComment: { marginTop: 8, textAlign: 'right', color: '#334155' },
    adminReply: { marginTop: 8, textAlign: 'right', fontStyle: 'italic', color: '#0891b2', borderRightWidth: 2, borderRightColor: '#0891b2', paddingRight: 8 },
    replyButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, marginTop: 12 },
    replyButtonText: { color: '#0891b2', fontWeight: 'bold' },
    modalBackdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 12, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 16 },
    replyInput: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16, textAlignVertical: 'top', minHeight: 100 },
    replyActions: { flexDirection: 'row-reverse', justifyContent: 'flex-start' },
    replyButtonAction: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    saveButton: { backgroundColor: '#0891b2' },
    saveButtonText: { color: 'white', fontWeight: 'bold' },
    cancelButton: { backgroundColor: '#e2e8f0', marginRight: 10 },
    cancelButtonText: { color: '334155', fontWeight: 'bold' },
});

export default MyBusinessScreen;
