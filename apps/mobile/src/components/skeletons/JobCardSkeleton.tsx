import React from 'react';
import { View, StyleSheet } from 'react-native';

const JobCardSkeleton = () => (
    <View style={styles.card}>
        <View style={styles.header}>
            <View style={{ flex: 1 }}>
                <View style={styles.lineLg} />
                <View style={[styles.lineMd, { width: '60%' }]} />
            </View>
            <View style={styles.badge} />
        </View>
        <View style={styles.lineMd} />
        <View style={[styles.lineMd, { width: '80%' }]} />
        <View style={styles.footer}>
            <View style={[styles.lineSm, { width: '40%' }]} />
            <View style={[styles.lineSm, { width: '30%' }]} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', padding: 16, borderRadius: 12, opacity: 0.5 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    badge: { width: 60, height: 24, backgroundColor: '#e2e8f0', borderRadius: 12 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    lineLg: { height: 18, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 6, width: '80%' },
    lineMd: { height: 14, backgroundColor: '#e2e8f0', borderRadius: 4, marginBottom: 6 },
    lineSm: { height: 12, backgroundColor: '#e2e8f0', borderRadius: 4 },
});

export default JobCardSkeleton;
