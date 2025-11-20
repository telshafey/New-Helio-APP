
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity, useUI } from '../../shared';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewMarketplaceItemScreen = () => {
    const navigation = useNavigation();
    const { handleSaveMarketplaceItem } = useCommunity();
    const { showToast } = useUI();
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', contactPhone: '' });
    const [images, setImages] = useState<string[]>([]);
    
    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (images.length === 0) {
            showToast('يرجى إضافة صورة واحدة على الأقل.', 'error');
            return;
        }
        if (!formData.title || !formData.price || !formData.contactPhone) {
            showToast('يرجى ملء الحقول الإلزامية.', 'error');
            return;
        }

        handleSaveMarketplaceItem({
            ...formData,
            price: parseFloat(formData.price) || 0,
            images,
            duration: 30, // Default duration
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
                <ImageUploader onImagesChange={setImages} multiple maxFiles={5} label="صور المنتج" />
                
                <TextInput 
                    style={styles.input} 
                    placeholder="عنوان الإعلان" 
                    value={formData.title} 
                    onChangeText={v => handleChange('title', v)} 
                    placeholderTextColor="#94a3b8"
                />
                <TextInput 
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
                    multiline 
                    placeholder="الوصف" 
                    value={formData.description} 
                    onChangeText={v => handleChange('description', v)} 
                    placeholderTextColor="#94a3b8"
                />
                <View style={styles.row}>
                    <TextInput 
                        style={[styles.input, { flex: 1, marginLeft: 8 }]} 
                        placeholder="السعر (بالجنيه)" 
                        value={formData.price} 
                        onChangeText={v => handleChange('price', v)} 
                        keyboardType="numeric" 
                        placeholderTextColor="#94a3b8"
                    />
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="الفئة (مثال: أثاث)" 
                        value={formData.category} 
                        onChangeText={v => handleChange('category', v)} 
                        placeholderTextColor="#94a3b8"
                    />
                </View>
                <TextInput 
                    style={styles.input} 
                    placeholder="رقم هاتف للتواصل" 
                    value={formData.contactPhone} 
                    onChangeText={v => handleChange('contactPhone', v)} 
                    keyboardType="phone-pad" 
                    placeholderTextColor="#94a3b8"
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
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    row: { flexDirection: 'row-reverse' },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24, elevation: 2 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NewMarketplaceItemScreen;
