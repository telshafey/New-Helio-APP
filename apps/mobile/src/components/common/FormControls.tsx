import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, ...props }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={onChangeText}
            {...props}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        textAlign: 'right',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        textAlign: 'right',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
});

export default InputField;
