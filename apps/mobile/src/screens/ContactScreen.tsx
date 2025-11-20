
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { EnvelopeIcon, WhatsAppIcon } from '../components/Icons';
import { CONTACT_INFO } from '../shared';

const ContactScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${CONTACT_INFO.EMAIL}`)} style={styles.contactItem}>
                    <EnvelopeIcon color="#0891b2" width={32} height={32} />
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.contactTitle}>البريد الإلكتروني</Text>
                        <Text style={styles.contactValue}>{CONTACT_INFO.EMAIL}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity onPress={() => Linking.openURL(CONTACT_INFO.WHATSAPP_LINK)} style={styles.contactItem}>
                    <WhatsAppIcon color="#25D366" width={32} height={32} />
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.contactTitle}>واتساب</Text>
                        <Text style={styles.contactValue}>+{CONTACT_INFO.WHATSAPP_NUMBER}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f5f9',
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  contactItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1e293b'
  },
  contactValue: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 24,
  },
});

export default ContactScreen;
