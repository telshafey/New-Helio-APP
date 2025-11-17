import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewLostAndFoundScreen = () => {
    const navigation = useNavigation();
    const { handleSaveLostAndFoundItem } = useCommunity();
    const [formData, setFormData] = useState({
        type: 'lost' as 'lost' | 'found', title: '', description: '', location: '', contactInfo: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>([]);
    
    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        handleSaveLostAndFoundItem({
            ...formData,
            imageUrl: image[0] || undefined,
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            {/* Type would be a Segmented Control/Picker */}
            <ImageUploader onImagesChange={setImage} multiple={false} label="صورة (اختياري)" />
            <TextInput style={styles.input} placeholder="العنوان (مثال: فقدت مفاتيح)" value={formData.title} onChangeText={v => handleChange('title', v)} />
            <TextInput style={[styles.input, {height: 100}]} multiline placeholder="الوصف" value={formData.description} onChangeText={v => handleChange('description', v)} />
            <TextInput style={styles.input} placeholder="الموقع التقريبي" value={formData.location} onChangeText={v => handleChange('location', v)} />
            <TextInput style={styles.input} placeholder="معلومات التواصل" value={formData.contactInfo} onChangeText={v => handleChange('contactInfo', v)} />

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

export default NewLostAndFoundScreen;
