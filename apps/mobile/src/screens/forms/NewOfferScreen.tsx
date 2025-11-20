
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity, useServices, useAuth, useUI } from '../../shared';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewOfferScreen = () => {
    const navigation = useNavigation();
    const { handleSaveOffer } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();
    const { showToast } = useUI();

    const myServices = services.filter(s => s.ownerId === currentPublicUser?.id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        serviceId: myServices[0]?.id.toString() || '',
        promoCode: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>([]);

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (image.length === 0) {
            showToast('يرجى إضافة صورة للعرض.', 'error');
            return;
        }
        if (!formData.serviceId) {
            showToast('يجب أن يكون لديك خدمة مسجلة لإضافة عرض.', 'error');
            return;
        }
        if (!formData.title || !formData.description) {
            showToast('يرجى ملء العنوان والوصف.', 'error');
            return;
        }

        handleSaveOffer({
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: image[0],
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
                <ImageUploader onImagesChange={setImage} multiple={false} label="صورة العرض" />
                
                <TextInput style={styles.input} placeholder="عنوان العرض" value={formData.title} onChangeText={v => handleChange('title', v)} placeholderTextColor="#94a3b8" />
                <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} multiline placeholder="وصف العرض" value={formData.description} onChangeText={v => handleChange('description', v)} placeholderTextColor="#94a3b8" />
                
                <Text style={styles.label}>الخدمة المرتبطة:</Text>
                {myServices.length > 0 ? (
                    <View style={styles.readOnlyInput}>
                        <Text style={styles.readOnlyText}>{myServices[0].name}</Text>
                    </View>
                ) : (
                    <Text style={styles.errorText}>ليس لديك خدمات مسجلة.</Text>
                )}

                <TextInput style={styles.input} placeholder="كود الخصم (اختياري)" value={formData.promoCode} onChangeText={v => handleChange('promoCode', v)} placeholderTextColor="#94a3b8" />
                
                <View style={styles.row}>
                    <TextInput style={[styles.input, { flex: 1, marginLeft: 8 }]} placeholder="تاريخ البدء (YYYY-MM-DD)" value={formData.startDate} onChangeText={v => handleChange('startDate', v)} placeholderTextColor="#94a3b8" />
                    <TextInput style={[styles.input, { flex: 1 }]} placeholder="تاريخ الانتهاء (YYYY-MM-DD)" value={formData.endDate} onChangeText={v => handleChange('endDate', v)} placeholderTextColor="#94a3b8" />
                </View>

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
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    row: { flexDirection: 'row-reverse' },
    label: { textAlign: 'right', marginBottom: 8, color: '#64748b', fontSize: 14 },
    readOnlyInput: { backgroundColor: '#e2e8f0', padding: 12, borderRadius: 8, marginBottom: 12 },
    readOnlyText: { textAlign: 'right', color: '#475569' },
    errorText: { textAlign: 'right', color: '#ef4444', marginBottom: 12 },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24, elevation: 2 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NewOfferScreen;
