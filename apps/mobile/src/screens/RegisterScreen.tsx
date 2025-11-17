import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/common/FormControls';
// FIX: Import NativeStackNavigationProp to fix navigation type error
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const RegisterScreen = () => {
    const { register } = useAuth();
    // FIX: Add generic type to useNavigation to fix navigate error
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');
        if (password.length < 6) {
            setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل.');
            return;
        }
        const success = register({ name, email, password });
        if (success) {
            navigation.goBack();
        } else {
            setError('هذا البريد الإلكتروني مسجل بالفعل.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            <Text style={styles.subtitle}>انضم إلى مجتمع هليوبوليس الجديدة.</Text>

            <View style={styles.form}>
                <InputField label="الاسم الكامل" value={name} onChangeText={setName} />
                <InputField label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <InputField label="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>إنشاء الحساب</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>لديك حساب بالفعل؟ <Text style={styles.loginLink}>سجل الدخول</Text></Text>
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
    loginText: { textAlign: 'center', marginTop: 24, color: '#64748b' },
    loginLink: { color: '#0891b2', fontWeight: 'bold' }
});

export default RegisterScreen;