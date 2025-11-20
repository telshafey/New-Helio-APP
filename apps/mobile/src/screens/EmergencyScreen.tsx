
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useData } from '../shared';
import { PhoneIcon } from '../components/Icons';

const EmergencyScreen = () => {
    const { emergencyContacts } = useData();
    const [activeTab, setActiveTab] = useState<'city' | 'national'>('city');

    const cityContacts = emergencyContacts.filter(c => c.type === 'city');
    const nationalContacts = emergencyContacts.filter(c => c.type === 'national');
    const contactsToShow = activeTab === 'city' ? cityContacts : nationalContacts;

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'city' && styles.activeTab]}
                    onPress={() => setActiveTab('city')}
                >
                    <Text style={[styles.tabText, activeTab === 'city' && styles.activeTabText]}>خاصة بالمدينة ({cityContacts.length})</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'national' && styles.activeTab]}
                    onPress={() => setActiveTab('national')}
                >
                    <Text style={[styles.tabText, activeTab === 'national' && styles.activeTabText]}>أرقام قومية ({nationalContacts.length})</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {contactsToShow.map(contact => (
                    <View key={contact.id} style={styles.card}>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>{contact.title}</Text>
                            <Text style={styles.cardNumber}>{contact.number}</Text>
                        </View>
                        <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${contact.number}`)}>
                            <PhoneIcon color="#fff" width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    tabContainer: {
        flexDirection: 'row-reverse',
        padding: 16,
        backgroundColor: 'white'
    },
    tabButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#0891b2',
    },
    tabText: {
        fontWeight: 'bold',
        color: '#334155'
    },
    activeTabText: {
        color: 'white'
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    cardInfo: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b'
    },
    cardNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#475569',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        marginTop: 4,
    },
    callButton: {
        backgroundColor: '#22c55e',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
});

export default EmergencyScreen;
