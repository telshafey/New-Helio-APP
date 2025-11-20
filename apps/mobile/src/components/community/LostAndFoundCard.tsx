
import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { LostAndFoundItem } from '../../shared';
import { MapPinIcon } from '../Icons';

const LostAndFoundCard: React.FC<{ item: LostAndFoundItem }> = ({ item }) => {
    const [showContact, setShowContact] = useState(false);
    return (
        <View style={styles.card}>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <Text style={styles.username}>{item.username}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.infoRow}>
                    <MapPinIcon color="#64748b" width={14} height={14} />
                    <Text style={styles.infoText}>الموقع: {item.location}</Text>
                </View>
                <Text style={styles.infoText}>التاريخ: {new Date(item.date).toLocaleDateString('ar-EG-u-nu-latn')}</Text>
                <Pressable onPress={() => setShowContact(!showContact)} style={styles.button}>
                    <Text style={styles.buttonText}>{showContact ? item.contactInfo : 'إظهار معلومات التواصل'}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 12, elevation: 2, overflow: 'hidden' },
    image: { width: '100%', height: 150 },
    content: { padding: 12 },
    header: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: 8 },
    avatar: { width: 32, height: 32, borderRadius: 16 },
    username: { fontWeight: '600' },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'right' },
    description: { color: '#475569', marginVertical: 8, textAlign: 'right' },
    infoRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
    infoText: { fontSize: 12, color: '#64748b', textAlign: 'right' },
    button: { marginTop: 12, backgroundColor: '#0891b2', padding: 10, borderRadius: 8 },
    buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});

export default LostAndFoundCard;