import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useServices } from '../../../../packages/shared-logic/src/context/ServicesContext';
import { useUI } from '../../../../packages/shared-logic/src/context/UIContext';
import type { AppUser, Theme } from '../../../../packages/shared-logic/src/types';
import ServiceCard from '../components/ServiceCard';
import EmptyState from '../components/common/EmptyState';
import { Cog6ToothIcon, HeartIconSolid, ChatBubbleOvalLeftIcon, StarIcon, PencilIcon, TrashIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '../components/Icons';
import InputField from '../components/common/FormControls';

const EditProfileModal: React.FC<{ user: AppUser; isVisible: boolean; onClose: () => void; onSave: (data: any) => void }> = ({ user, isVisible, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    // Image uploader would be more complex, skipping for now
    
    const handleSubmit = () => {
        onSave({ id: user.id, name, email, avatar: user.avatar });
        onClose();
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <Pressable style={styles.modalBackdrop} onPress={onClose}>
                <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                    <Text style={styles.modalTitle}>تعديل الملف الشخصي</Text>
                    <InputField label="الاسم" value={name} onChangeText={setName} />
                    <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <View style={styles.modalActions}>
                        <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}><Text style={styles.cancelButtonText}>إلغاء</Text></TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.saveButton]}><Text style={styles.saveButtonText}>حفظ</Text></TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useUI();
    const options: { value: Theme, label: string, icon: React.ReactNode }[] = [
        { value: 'light', label: 'فاتح', icon: <SunIcon color={theme === 'light' ? '#0891b2' : '#64748b'} width={20} height={20}/> },
        { value: 'dark', label: 'داكن', icon: <MoonIcon color={theme === 'dark' ? '#0891b2' : '#64748b'} width={20} height={20}/> },
        { value: 'system', label: 'النظام', icon: <ComputerDesktopIcon color={theme === 'system' ? '#0891b2' : '#64748b'} width={20} height={20}/> },
    ];
    return (
        <View style={styles.themeContainer}>
            {options.map(option => (
                <TouchableOpacity key={option.value} onPress={() => setTheme(option.value)} style={[styles.themeButton, theme === option.value && styles.themeButtonActive]}>
                    {option.icon}
                    <Text style={[styles.themeButtonText, theme === option.value && styles.themeButtonTextActive]}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const ProfileScreen = () => {
    const { currentPublicUser, updateProfile, publicLogout } = useAuth();
    const { services } = useServices();
    const { showConfirmation } = useUI();
    const [activeTab, setActiveTab] = useState<'activity' | 'favorites' | 'settings'>('activity');
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const userReviews = useMemo(() => {
        if (!currentPublicUser) return [];
        return services.flatMap(service =>
            service.reviews.filter(r => r.userId === currentPublicUser.id).map(r => ({ ...r, serviceName: service.name }))
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [currentPublicUser, services]);

    const favoriteServices = useMemo(() => services.filter(s => s.isFavorite), [services]);

    const handleSaveProfile = (data: any) => updateProfile(data);
    
    const handleRequestDeletion = () => {
        showConfirmation(
            'تأكيد طلب حذف الحساب',
            'سيتم إرسال طلبك للإدارة وسيتم حذف حسابك بشكل دائم بعد المراجعة. هل أنت متأكد؟',
            () => {
                // requestAccountDeletion(currentPublicUser.id);
                publicLogout();
            }
        );
    };

    if (!currentPublicUser) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.profileName}>{currentPublicUser.name}</Text>
                <Text style={styles.profileEmail}>{currentPublicUser.email}</Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('activity')} style={[styles.tab, activeTab === 'activity' && styles.activeTab]}><ChatBubbleOvalLeftIcon color={activeTab === 'activity' ? '#0891b2' : '#64748b'} width={24} height={24}/><Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>نشاطاتي</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('favorites')} style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}><HeartIconSolid color={activeTab === 'favorites' ? '#0891b2' : '#64748b'} width={24} height={24}/><Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>المفضلة</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('settings')} style={[styles.tab, activeTab === 'settings' && styles.activeTab]}><Cog6ToothIcon color={activeTab === 'settings' ? '#0891b2' : '#64748b'} width={24} height={24}/><Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>الإعدادات</Text></TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === 'activity' && (
                    userReviews.length > 0 ? userReviews.map(review => (
                        <View key={review.id} style={styles.reviewCard}>
                            <Text>تقييم لـ <Text style={{fontWeight: 'bold'}}>{review.serviceName}</Text></Text>
                            <View style={{flexDirection: 'row-reverse'}}>{[...Array(5)].map((_, i) => <StarIcon key={i} width={16} height={16} color={i < review.rating ? '#facc15' : '#d1d5db'}/>)}</View>
                            <Text>{review.comment}</Text>
                        </View>
                    )) : <EmptyState icon={<ChatBubbleOvalLeftIcon width={48} height={48} color="#9ca3af"/>} title="لا يوجد نشاط" message="لم تقم بإضافة أي تقييمات بعد."/>
                )}
                {activeTab === 'favorites' && (
                    <FlatList
                        data={favoriteServices}
                        numColumns={2}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <ServiceCard service={item} onPress={() => {}} />}
                        ListEmptyComponent={<EmptyState icon={<HeartIconSolid width={48} height={48} color="#9ca3af"/>} title="المفضلة فارغة" message="أضف خدماتك المفضلة لتجدها هنا."/>}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                )}
                {activeTab === 'settings' && (
                    <View style={styles.settingsContainer}>
                        <Text style={styles.sectionTitle}>المظهر</Text>
                        <ThemeSelector />
                        <Text style={styles.sectionTitle}>الحساب</Text>
                        <TouchableOpacity style={styles.settingsButton} onPress={() => setEditModalOpen(true)}><PencilIcon color="#334155" width={20} height={20}/><Text>تعديل الملف الشخصي</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.settingsButton} onPress={handleRequestDeletion}><TrashIcon color="#ef4444" width={20} height={20}/><Text style={{color: '#ef4444'}}>طلب حذف الحساب</Text></TouchableOpacity>
                    </View>
                )}
            </View>
            <EditProfileModal user={currentPublicUser} isVisible={isEditModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleSaveProfile} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    profileHeader: { backgroundColor: 'white', padding: 24, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    profileName: { fontSize: 24, fontWeight: 'bold' },
    profileEmail: { fontSize: 16, color: '#64748b', marginTop: 4 },
    tabContainer: { flexDirection: 'row-reverse', justifyContent: 'space-around', backgroundColor: 'white', paddingVertical: 8 },
    tab: { alignItems: 'center', padding: 8, borderRadius: 8, flex: 1, marginHorizontal: 4 },
    activeTab: { backgroundColor: '#cffafe' },
    tabText: { fontSize: 12, color: '#64748b' },
    activeTabText: { color: '#0891b2', fontWeight: 'bold' },
    content: { padding: 16 },
    reviewCard: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 12 },
    settingsContainer: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 12 },
    settingsButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, padding: 14, backgroundColor: '#f1f5f9', borderRadius: 8, marginTop: 12 },
    themeContainer: { backgroundColor: '#f1f5f9', borderRadius: 8, flexDirection: 'row-reverse', padding: 4 },
    themeButton: { flex: 1, padding: 10, borderRadius: 6, flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', gap: 8 },
    themeButtonActive: { backgroundColor: 'white', elevation: 1 },
    themeButtonText: { color: '#64748b' },
    themeButtonTextActive: { color: '#0891b2', fontWeight: 'bold' },
    // Modal Styles
    modalBackdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 12, padding: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 16 },
    modalActions: { flexDirection: 'row-reverse', justifyContent: 'flex-start', marginTop: 20 },
    button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    saveButton: { backgroundColor: '#0891b2' },
    saveButtonText: { color: 'white', fontWeight: 'bold' },
    cancelButton: { backgroundColor: '#e2e8f0', marginRight: 10 },
    cancelButtonText: { color: '#334155', fontWeight: 'bold' },
});

export default ProfileScreen;
