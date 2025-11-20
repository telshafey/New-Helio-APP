
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { JobPosting } from '../../shared';
import { MapPinIcon } from '../Icons';

const JobPostingCard: React.FC<{ job: JobPosting }> = ({ job }) => (
    <View style={styles.card}>
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.companyName}</Text>
            </View>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{job.type}</Text>
            </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>{job.description}</Text>
        <View style={styles.footer}>
            <View style={styles.location}>
                <MapPinIcon color="#64748b" width={14} height={14} />
                <Text style={styles.footerText}>{job.location}</Text>
            </View>
            <Text style={styles.footerText}>{new Date(job.creationDate).toLocaleDateString('ar-EG-u-nu-latn')}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', padding: 16, borderRadius: 12, elevation: 2 },
    header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#0891b2', textAlign: 'right' },
    company: { fontSize: 16, fontWeight: '600', textAlign: 'right' },
    badge: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    badgeText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
    description: { color: '#475569', marginVertical: 12, textAlign: 'right', lineHeight: 22 },
    footer: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    location: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
    footerText: { fontSize: 12, color: '#64748b' },
});

export default JobPostingCard;