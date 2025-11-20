
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useUI } from '../../shared';
import { CheckCircleIcon, XCircleIcon } from '../Icons';
import type { ToastMessage } from '../../shared';

const ToastItem: React.FC<{ message: ToastMessage; onDismiss: (id: number) => void; index: number }> = ({ message, onDismiss, index }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();

        const timer = setTimeout(() => {
            handleDismiss();
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: -20, duration: 300, useNativeDriver: true }),
        ]).start(() => onDismiss(message.id));
    };

    const backgroundColor = message.type === 'success' ? '#ffffff' : '#ffffff';
    const borderColor = message.type === 'success' ? '#22c55e' : '#ef4444';
    const icon = message.type === 'success' ? <CheckCircleIcon color="#22c55e" width={24} height={24} /> : <XCircleIcon color="#ef4444" width={24} height={24} />;

    return (
        <Animated.View style={[
            styles.toastContainer, 
            { opacity, transform: [{ translateY }], backgroundColor, borderLeftColor: borderColor, marginTop: index === 0 ? 0 : 8 }
        ]}>
            <TouchableOpacity onPress={handleDismiss} style={styles.touchable}>
                <View style={styles.iconContainer}>{icon}</View>
                <Text style={styles.messageText}>{message.message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const Toast: React.FC = () => {
    const { toasts, dismissToast } = useUI();

    if (toasts.length === 0) return null;

    return (
        <View style={styles.container} pointerEvents="box-none">
            {toasts.map((toast, index) => (
                <ToastItem key={toast.id} message={toast} onDismiss={dismissToast} index={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50, // Safe area offset
        left: 16,
        right: 16,
        zIndex: 9999,
    },
    toastContainer: {
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderLeftWidth: 6,
    },
    touchable: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        marginLeft: 12,
    },
    messageText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        textAlign: 'right',
    },
});

export default Toast;