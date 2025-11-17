import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
    return (
        <View style={styles.container}>
            {icon}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        minHeight: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#334155',
        marginTop: 16,
    },
    message: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default EmptyState;
