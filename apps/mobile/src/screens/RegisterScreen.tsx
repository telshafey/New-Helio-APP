
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/common/FormControls';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUI } from '../../../../packages/shared-logic/src/context/UIContext';

const RegisterScreen = () => {
    const { register } = useAuth();
    const { showToast } = useUI();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (password.length < 6) {
            showToast('يجب أن تكون كلمة المرور 6 أحرف على الأقل.', 'error');
            return;
        }
        const success = register({ name, email, password });
        if (success) {
            navigation.goBack();
        }
    };

    return (
         <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={ Platform.OS === "ios" ? 64 : 0 }
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>إنشاء حساب جديد</Text>
                <Text style={styles.subtitle}>انضم إلى مجتمع هليوبوليس الجديدة.</Text>

                <View style={styles.form}>
                    <InputField label="الاسم الكامل" value={name} onChangeText={setName} />
                    <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
                    <InputField label="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>إنشاء الحساب</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 32 }}>
                    <Text style={styles.loginText}>لديك حساب بالفعل؟ <Text style={styles.loginLink}>سجل الدخول</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#f1f5f9', padding: 24, justifyContent: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#1e293b' },
    subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 32 },
    form: { width: '100%' },
    button: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16, elevation: 2 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    loginText: { textAlign: 'center', color: '#64748b' },
    loginLink: { color: '#0891b2', fontWeight: 'bold' }
});

export default RegisterScreen;
