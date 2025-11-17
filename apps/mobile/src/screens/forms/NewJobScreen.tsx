import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import type { JobPosting } from '../../../../../packages/shared-logic/src/types';

const NewJobScreen = () => {
    const navigation = useNavigation();
    const { handleSaveJobPosting } = useCommunity();
    const [formData, setFormData] = useState({
        title: '', companyName: '', description: '', location: 'هليوبوليس الجديدة',
        type: 'دوام كامل' as JobPosting['type'], contactInfo: ''
    });

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        handleSaveJobPosting({
            ...formData,
            duration: 30, // Default duration
        });
        navigation.goBack();
    };
    
    return (
        <ScrollView style={styles.container}>
            <TextInput style={styles.input} placeholder="المسمى الوظيفي" value={formData.title} onChangeText={v => handleChange('title', v)} />
            <TextInput style={styles.input} placeholder="اسم الشركة" value={formData.companyName} onChangeText={v => handleChange('companyName', v)} />
            <TextInput style={[styles.input, {height: 120}]} multiline placeholder="وصف الوظيفة" value={formData.description} onChangeText={v => handleChange('description', v)} />
            {/* Type would be a Picker in a real app */}
            <TextInput style={styles.input} placeholder="الموقع" value={formData.location} onChangeText={v => handleChange('location', v)} />
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

export default NewJobScreen;
