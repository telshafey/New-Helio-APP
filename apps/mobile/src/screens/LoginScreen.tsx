import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/common/FormControls';
// FIX: Import NativeStackNavigationProp to fix navigation type error
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LoginScreen = () => {
    const { publicLogin } = useAuth();
    // FIX: Add generic type to useNavigation to fix navigate error
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');
        const success = publicLogin(email, password);
        if (success) {
            navigation.goBack();
        } else {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        }
    };

    const handleQuickLogin = (quickEmail: string, quickPass: string) => {
        setError('');
        const success = publicLogin(quickEmail, quickPass);
        if (success) {
            navigation.goBack();
        } else {
            setError('فشل تسجيل الدخول السريع.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>بوابة الدخول</Text>
            <Text style={styles.subtitle}>سجل الدخول للمشاركة في مجتمع هيليو.</Text>

            <View style={styles.form}>
                <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <InputField label="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />
                {error && <Text style={styles.errorText}>{error}</Text>}
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

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>ليس لديك حساب؟ <Text style={styles.registerLink}>أنشئ حساباً جديداً</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9', padding: 24, justifyContent: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 32 },
    form: { width: '100%' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 8 },
    button: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    separator: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 24 },
    quickLoginTitle: { textAlign: 'center', color: '#64748b', marginBottom: 12 },
    quickButtonUser: { backgroundColor: '#cffafe', marginTop: 0 },
    quickButtonTextUser: { color: '#0e7490', fontWeight: 'bold' },
    quickButtonProvider: { backgroundColor: '#ede9fe', marginTop: 12 },
    quickButtonTextProvider: { color: '#7c3aed', fontWeight: 'bold' },
    registerText: { textAlign: 'center', marginTop: 24, color: '#64748b' },
    registerLink: { color: '#0891b2', fontWeight: 'bold' }
});

export default LoginScreen;