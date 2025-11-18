import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ListingStatus, UserStatus } from '../../../../packages/shared-logic/src/types';
// FIX: Corrected import path to remove .tsx extension and added missing icon imports.
import { ClockIcon, CheckCircleIcon, XCircleIcon, UserMinusIcon } from '../Icons';

interface StatusBadgeProps {
    status: ListingStatus | UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap: Record<ListingStatus | UserStatus, { text: string; colors: { bg: string; text: string }; icon: React.ReactNode }> = {
        pending: { text: 'قيد المراجعة', colors: { bg: '#fef9c3', text: '#ca8a04' }, icon: <ClockIcon color="#ca8a04" width={14} height={14}/> },
        approved: { text: 'مقبول', colors: { bg: '#dcfce7', text: '#16a34a' }, icon: <CheckCircleIcon color="#16a34a" width={14} height={14}/> },
        active: { text: 'مفعل', colors: { bg: '#dcfce7', text: '#16a34a' }, icon: <CheckCircleIcon color="#16a34a" width={14} height={14}/> },
        rejected: { text: 'مرفوض', colors: { bg: '#fee2e2', text: '#dc2626' }, icon: <XCircleIcon color="#dc2626" width={14} height={14}/> },
        banned: { text: 'محظور', colors: { bg: '#fee2e2', text: '#dc2626' }, icon: <XCircleIcon color="#dc2626" width={14} height={14}/> },
        expired: { text: 'منتهي', colors: { bg: '#f1f5f9', text: '#475569' }, icon: <ClockIcon color="#475569" width={14} height={14}/> },
        // FIX: Used UserMinusIcon for deletion_requested status to align with web.
        deletion_requested: { text: 'طلب حذف', colors: { bg: '#ffedd5', text: '#f97316' }, icon: <UserMinusIcon color="#f97316" width={14} height={14}/> },
    };

    const { text, colors, icon } = statusMap[status] || statusMap.pending;

    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            {icon}
            <Text style={[styles.badgeText, { color: colors.text }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default StatusBadge;
