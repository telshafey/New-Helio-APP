import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// FIX: Corrected import path depth (5 levels up to reach root, then packages)
import type { ListingStatus, UserStatus } from '../../../../../packages/shared-logic/src/types';
import * as Icons from '../Icons';

interface StatusBadgeProps {
    status: ListingStatus | UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap: Record<ListingStatus | UserStatus, { text: string; colors: { bg: string; text: string }; icon: React.ReactNode }> = {
        pending: { text: 'قيد المراجعة', colors: { bg: '#fef9c3', text: '#ca8a04' }, icon: <Icons.ClockIcon color="#ca8a04" width={14} height={14}/> },
        approved: { text: 'مقبول', colors: { bg: '#dcfce7', text: '#16a34a' }, icon: <Icons.CheckCircleIcon color="#16a34a" width={14} height={14}/> },
        active: { text: 'مفعل', colors: { bg: '#dcfce7', text: '#16a34a' }, icon: <Icons.CheckCircleIcon color="#16a34a" width={14} height={14}/> },
        rejected: { text: 'مرفوض', colors: { bg: '#fee2e2', text: '#dc2626' }, icon: <Icons.XCircleIcon color="#dc2626" width={14} height={14}/> },
        banned: { text: 'محظور', colors: { bg: '#fee2e2', text: '#dc2626' }, icon: <Icons.XCircleIcon color="#dc2626" width={14} height={14}/> },
        expired: { text: 'منتهي', colors: { bg: '#f1f5f9', text: '#475569' }, icon: <Icons.ClockIcon color="#475569" width={14} height={14}/> },
        deletion_requested: { text: 'طلب حذف', colors: { bg: '#ffedd5', text: '#f97316' }, icon: <Icons.UserMinusIcon color="#f97316" width={14} height={14}/> },
    };

    const statusInfo = statusMap[status] || statusMap.pending;

    return (
        <View style={[styles.badge, { backgroundColor: statusInfo.colors.bg }]}>
            {statusInfo.icon}
            <Text style={[styles.badgeText, { color: statusInfo.colors.text }]}>{statusInfo.text}</Text>
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
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default StatusBadge;