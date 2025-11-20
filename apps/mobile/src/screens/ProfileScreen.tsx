
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { useAuth, useUI } from '../shared';
import type { AppUser, Theme } from '../shared';
import { PencilIcon, TrashIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '../components/Icons';
import InputField from '../components/common/FormControls';
import ImageUploader from '../components/common/ImageUploader.native';

const EditProfileModal: React.FC<{ user: AppUser; isVisible: boolean; onClose: () => void; onSave: (data: any) => void }> = ({ user, isVisible, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState([user.avatar]);

    const handleSubmit = () => {
        onSave({ id: user.id, name, email, avatar: avatar[0] });
        onClose();
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <Pressable style={styles.modalBackdrop} onPress={onClose}>
                <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
                    <Text style={styles.modalTitle}>تعديل الملف الشخصي</Text>
                    <ImageUploader initialImages={avatar} onImagesChange={setAvatar} multiple={false} label="الصورة الرمزية" />
                    <InputField label="الاسم" value={name} onChangeText={setName} />
                    <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
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
    const { currentPublicUser, updateProfile } = useAuth();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    
    if (!currentPublicUser) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={{ uri: currentPublicUser.avatar }} style={styles.avatar} />
                <Text style={styles.profileName}>{currentPublicUser.name}</Text>
                <Text style={styles.profileEmail}>{currentPublicUser.email}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>المظهر</Text>
                    <ThemeSelector />
                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>الحساب</Text>
                    <TouchableOpacity style={styles.settingsButton} onPress={() => setEditModalOpen(true)}>
                        <PencilIcon color="#334155" width={20} height={20}/>
                        <Text style={styles.settingsButtonText}>تعديل الملف الشخصي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsButton, { backgroundColor: '#fee2e2' }]}>
                        <TrashIcon color="#ef4444" width={20} height={20}/>
                        <Text style={[styles.settingsButtonText, { color: '#ef4444' }]}>طلب حذف الحساب</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <EditProfileModal user={currentPublicUser} isVisible={isEditModalOpen} onClose={() => setEditModalOpen(false)} onSave={updateProfile} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    profileHeader: { backgroundColor: 'white', padding: 24, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#0891b2' },
    profileName: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
    profileEmail: { fontSize: 16, color: '#64748b', marginTop: 4 },
    content: { padding: 16 },
    settingsContainer: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 12 },
    settingsButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12, padding: 14, backgroundColor: '#f1f5f9', borderRadius: 8, marginTop: 12 },
    settingsButtonText: { color: '#334155', fontWeight: '600' },
    themeContainer: { backgroundColor: '#f1f5f9', borderRadius: 8, flexDirection: 'row-reverse', padding: 4 },
    themeButton: { flex: 1, padding: 10, borderRadius: 6, flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', gap: 8 },
    themeButtonActive: { backgroundColor: 'white', elevation: 1, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    themeButtonText: { color: '#64748b' },
    themeButtonTextActive: { color: '#0891b2', fontWeight: 'bold' },
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
