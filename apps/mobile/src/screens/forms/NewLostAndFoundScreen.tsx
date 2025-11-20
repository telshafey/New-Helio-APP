
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity, useUI } from '../../shared';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewLostAndFoundScreen = () => {
    const navigation = useNavigation();
    const { handleSaveLostAndFoundItem } = useCommunity();
    const { showToast } = useUI();
    const [formData, setFormData] = useState({
        type: 'lost' as 'lost' | 'found', title: '', description: '', location: '', contactInfo: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>([]);
    
    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.contactInfo) {
            showToast('يرجى ملء العنوان ومعلومات التواصل.', 'error');
            return;
        }
        handleSaveLostAndFoundItem({
            ...formData,
            imageUrl: image[0] || undefined,
        });
        navigation.goBack();
    };

    return (
         <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.typeSelector}>
                    <TouchableOpacity onPress={() => handleChange('type', 'lost')} style={[styles.typeButton, formData.type === 'lost' && styles.activeTypeLost]}>
                        <Text style={[styles.typeText, formData.type === 'lost' && styles.activeTypeText]}>مفقود</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChange('type', 'found')} style={[styles.typeButton, formData.type === 'found' && styles.activeTypeFound]}>
                        <Text style={[styles.typeText, formData.type === 'found' && styles.activeTypeText]}>موجود</Text>
                    </TouchableOpacity>
                </View>

                <ImageUploader onImagesChange={setImage} multiple={false} label="صورة (اختياري)" />
                
                <TextInput 
                    style={styles.input} 
                    placeholder={formData.type === 'lost' ? "ماذا فقدت؟ (مثال: مفاتيح)" : "ماذا وجدت؟ (مثال: محفظة)"} 
                    value={formData.title} 
                    onChangeText={v => handleChange('title', v)} 
                    placeholderTextColor="#94a3b8"
                />
                <TextInput 
                    style={[styles.input, {height: 100, textAlignVertical: 'top'}]} 
                    multiline 
                    placeholder="وصف إضافي..." 
                    value={formData.description} 
                    onChangeText={v => handleChange('description', v)} 
                    placeholderTextColor="#94a3b8"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="الموقع التقريبي" 
                    value={formData.location} 
                    onChangeText={v => handleChange('location', v)} 
                    placeholderTextColor="#94a3b8"
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="معلومات التواصل (هاتف)" 
                    value={formData.contactInfo} 
                    onChangeText={v => handleChange('contactInfo', v)} 
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>إرسال للمراجعة</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    contentContainer: { padding: 16, paddingBottom: 40 },
    typeSelector: { flexDirection: 'row-reverse', marginBottom: 16, gap: 12 },
    typeButton: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
    activeTypeLost: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
    activeTypeFound: { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
    typeText: { fontWeight: 'bold', color: '#64748b' },
    activeTypeText: { color: '#1e293b' },
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24, elevation: 2 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NewLostAndFoundScreen;
