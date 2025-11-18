
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/common/FormControls';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUI } from '../../../../packages/shared-logic/src/context/UIContext';

const LoginScreen = () => {
    const { publicLogin } = useAuth();
    const { showToast } = useUI();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const success = publicLogin(email, password);
        if (success) {
            navigation.goBack();
        }
    };

    const handleQuickLogin = (quickEmail: string, quickPass: string) => {
        const success = publicLogin(quickEmail, quickPass);
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
                <Text style={styles.title}>بوابة الدخول</Text>
                <Text style={styles.subtitle}>سجل الدخول للمشاركة في مجتمع هيليو.</Text>

                <View style={styles.form}>
                    <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    <InputField label="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />
                    
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>دخول</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.separator} />

                <Text style={styles.quickLoginTitle}>أو استخدم الدخول السريع (للتجربة)</Text>
                <TouchableOpacity style={[styles.button, styles.quickButtonUser]} onPress={() => handleQuickLogin('test@test.com', 'password')}>
                    <Text style={styles.quickButtonTextUser}>دخول كمستخدم</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={[styles.button, styles.quickButtonProvider]} onPress={() => handleQuickLogin('ahmed.masri@example.com', 'password')}>
                    <Text style={styles.quickButtonTextProvider}>دخول كمقدم خدمة</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 32, marginBottom: 20 }}>
                    <Text style={styles.registerText}>ليس لديك حساب؟ <Text style={styles.registerLink}>أنشئ حساباً جديداً</Text></Text>
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
    separator: { height: 1, backgroundColor: '#cbd5e1', marginVertical: 24 },
    quickLoginTitle: { textAlign: 'center', color: '#64748b', marginBottom: 12 },
    quickButtonUser: { backgroundColor: '#cffafe', marginTop: 0, elevation: 0 },
    quickButtonTextUser: { color: '#0e7490', fontWeight: 'bold' },
    quickButtonProvider: { backgroundColor: '#ede9fe', marginTop: 12, elevation: 0 },
    quickButtonTextProvider: { color: '#7c3aed', fontWeight: 'bold' },
    registerText: { textAlign: 'center', color: '#64748b' },
    registerLink: { color: '#0891b2', fontWeight: 'bold' }
});

export default LoginScreen;
