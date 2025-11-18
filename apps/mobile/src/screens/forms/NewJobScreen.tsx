
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import type { JobPosting } from '../../../../../packages/shared-logic/src/types';
import { useUI } from '../../../../../packages/shared-logic/src/context/UIContext';

const NewJobScreen = () => {
    const navigation = useNavigation();
    const { handleSaveJobPosting } = useCommunity();
    const { showToast } = useUI();
    const [formData, setFormData] = useState({
        title: '', companyName: '', description: '', location: 'هليوبوليس الجديدة',
        type: 'دوام كامل' as JobPosting['type'], contactInfo: ''
    });

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.companyName || !formData.contactInfo) {
            showToast('يرجى ملء الحقول الإلزامية.', 'error');
            return;
        }
        handleSaveJobPosting({
            ...formData,
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
                <TextInput style={styles.input} placeholder="المسمى الوظيفي" value={formData.title} onChangeText={v => handleChange('title', v)} placeholderTextColor="#94a3b8" />
                <TextInput style={styles.input} placeholder="اسم الشركة" value={formData.companyName} onChangeText={v => handleChange('companyName', v)} placeholderTextColor="#94a3b8" />
                <TextInput style={[styles.input, {height: 120, textAlignVertical: 'top'}]} multiline placeholder="وصف الوظيفة والمتطلبات" value={formData.description} onChangeText={v => handleChange('description', v)} placeholderTextColor="#94a3b8" />
                
                {/* Type would be a Picker in a real app */}
                <TextInput style={styles.input} placeholder="الموقع (افتراضي: هليوبوليس الجديدة)" value={formData.location} onChangeText={v => handleChange('location', v)} placeholderTextColor="#94a3b8" />
                <TextInput style={styles.input} placeholder="معلومات التواصل (هاتف/إيميل)" value={formData.contactInfo} onChangeText={v => handleChange('contactInfo', v)} placeholderTextColor="#94a3b8" />

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
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24, elevation: 2 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default NewJobScreen;
