import React from 'react';
import { View, StyleSheet } from 'react-native';

const LostAndFoundSkeleton = () => (
    <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.content}>
            <View style={styles.header}>
                <View style={styles.avatar} />
                <View style={[styles.lineSm, { width: '40%' }]} />
            </View>
            <View style={styles.lineLg} />
            <View style={styles.lineMd} />
            <View style={[styles.lineMd, { width: '70%' }]} />
            <View style={styles.button} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', opacity: 0.5 },
    image: { width: '100%', height: 150, backgroundColor: '#e2e8f0' },
    content: { padding: 12 },
    header: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 8 },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e2e8f0' },
    button: { marginTop: 12, height: 40, backgroundColor: '#e2e8f0', borderRadius: 8 },
    lineLg: { height: 18, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 8 },
    lineMd: { height: 14, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 6 },
    lineSm: { height: 12, backgroundColor: '#e2e8f0', borderRadius: 4 },
});

export default LostAndFoundSkeleton;
