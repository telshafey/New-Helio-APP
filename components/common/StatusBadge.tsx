import React from 'react';
import type { ListingStatus, UserStatus } from '../../types';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from './Icons';

interface StatusBadgeProps {
    status: ListingStatus | UserStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusMap = {
        // ListingStatus
        pending: { text: 'قيد المراجعة', classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: <ClockIcon className="w-4 h-4"/> },
        approved: { text: 'مقبول', classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: <CheckCircleIcon className="w-4 h-4"/> },
        rejected: { text: 'مرفوض', classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: <XCircleIcon className="w-4 h-4"/> },
        expired: { text: 'منتهي', classes: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300', icon: <ClockIcon className="w-4 h-4"/> },
        // UserStatus
        active: { text: 'مفعل', classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: <CheckCircleIcon className="w-4 h-4"/> },
        banned: { text: 'محظور', classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: <XCircleIcon className="w-4 h-4"/> },
        deletion_requested: { text: 'طلب حذف', classes: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', icon: <ClockIcon className="w-4 h-4"/> },
    };
    
    // Choose the correct map entry, defaulting to a neutral style if status is unknown
    const displayInfo = statusMap[status as keyof typeof statusMap] || { 
        text: status, 
        classes: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300', 
        icon: <ClockIcon className="w-4 h-4"/> 
    };
    
    const { text, classes, icon } = displayInfo;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${classes}`}>
            {icon}
            {text}
        </span>
    );
};

export default StatusBadge;
