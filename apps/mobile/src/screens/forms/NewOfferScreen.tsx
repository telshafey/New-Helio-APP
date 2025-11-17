import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import { useServices } from '../../../../../packages/shared-logic/src/context/ServicesContext';
import { useAuth } from '../../../../../packages/shared-logic/src/context/AuthContext';
import ImageUploader from '../../components/common/ImageUploader.native';

const NewOfferScreen = () => {
    const navigation = useNavigation();
    const { handleSaveOffer } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();

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
        if (image.length === 0) { return; }
        if (!formData.serviceId) { return; }

        handleSaveOffer({
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: image[0],
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <ImageUploader onImagesChange={setImage} multiple={false} label="صورة العرض" />
            <TextInput style={styles.input} placeholder="عنوان العرض" value={formData.title} onChangeText={v => handleChange('title', v)} />
            <TextInput style={[styles.input, { height: 100 }]} multiline placeholder="وصف العرض" value={formData.description} onChangeText={v => handleChange('description', v)} />
            {/* Service ID would be a Picker component */}
            <TextInput style={styles.input} placeholder="كود الخصم (اختياري)" value={formData.promoCode} onChangeText={v => handleChange('promoCode', v)} />
            <TextInput style={styles.input} placeholder="تاريخ البدء (YYYY-MM-DD)" value={formData.startDate} onChangeText={v => handleChange('startDate', v)} />
            <TextInput style={styles.input} placeholder="تاريخ الانتهاء (YYYY-MM-DD)" value={formData.endDate} onChangeText={v => handleChange('endDate', v)} />

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

export default NewOfferScreen;