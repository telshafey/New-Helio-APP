import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewMarketplaceItemScreen = () => {
    const navigation = useNavigation();
    const { handleSaveMarketplaceItem } = useCommunity();
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', contactPhone: '' });
    const [images, setImages] = useState<string[]>([]);
    
    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (images.length === 0) return;
        handleSaveMarketplaceItem({
            ...formData,
            price: parseFloat(formData.price) || 0,
            images,
            duration: 30, // Default duration
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <ImageUploader onImagesChange={setImages} multiple maxFiles={5} label="صور المنتج" />
            <TextInput style={styles.input} placeholder="عنوان الإعلان" value={formData.title} onChangeText={v => handleChange('title', v)} />
            <TextInput style={[styles.input, { height: 100 }]} multiline placeholder="الوصف" value={formData.description} onChangeText={v => handleChange('description', v)} />
            <TextInput style={styles.input} placeholder="السعر (بالجنيه)" value={formData.price} onChangeText={v => handleChange('price', v)} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="الفئة (مثال: أثاث)" value={formData.category} onChangeText={v => handleChange('category', v)} />
            <TextInput style={styles.input} placeholder="رقم هاتف للتواصل" value={formData.contactPhone} onChangeText={v => handleChange('contactPhone', v)} keyboardType="phone-pad" />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>إرسال للمراجعة</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16 },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NewMarketplaceItemScreen;
