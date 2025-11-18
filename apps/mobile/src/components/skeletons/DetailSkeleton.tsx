import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DetailSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.lineLg} />
                    <View style={[styles.lineMd, { width: '60%' }]} />
                </View>
                <View style={styles.section}>
                    <View style={[styles.lineMd, { marginBottom: 12 }]} />
                    <View style={styles.lineSm} />
                    <View style={styles.lineSm} />
                    <View style={styles.lineSm} />
                    <View style={[styles.lineSm, { width: '80%' }]} />
                </View>
                <View style={styles.section}>
                    <View style={[styles.lineMd, { marginBottom: 12 }]} />
                     <View style={styles.row}>
                        <View style={styles.button} />
                        <View style={styles.button} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    image: {
        width: width,
        height: 250,
        backgroundColor: '#e2e8f0',
    },
    content: { padding: 16 },
    header: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    section: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    lineLg: {
        height: 24,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        marginBottom: 8,
        width: '80%',
        alignSelf: 'flex-end',
    },
    lineMd: {
        height: 18,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        width: '40%',
        alignSelf: 'flex-end',
    },
    lineSm: {
        height: 14,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        marginBottom: 6,
        alignSelf: 'flex-end',
        width: '100%',
    },
    row: {
        flexDirection: 'row-reverse',
        gap: 12,
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#e2e8f0',
    }
});

export default DetailSkeleton;