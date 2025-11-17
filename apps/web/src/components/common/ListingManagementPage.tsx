import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from './Icons';
import type { ListingStatus } from '../../../packages/shared-logic/src/types';
import RejectReasonModal from './RejectReasonModal';
import StatusBadge from './StatusBadge';

interface ItemWithStatus {
    id: number;
    status: ListingStatus;
    rejectionReason?: string;
    [key: string]: any; // Allow other properties
}

interface ListingManagementPageProps<T extends ItemWithStatus> {
    title: string;
    icon: React.ReactNode;
    items: T[];
    onUpdateStatus: (itemId: number, status: ListingStatus, reason?: string) => void;
    onDeleteItem: (itemId: number) => void;
    renderItem: (item: T) => React.ReactNode;
    itemType: 'الإعلان' | 'الوظيفة' | 'العرض' | 'البلاغ';
}

const ListingManagementPage = <T extends ItemWithStatus>({
    title,
    icon,
    items,
    onUpdateStatus,
    onDeleteItem,
    renderItem,
    itemType
}: ListingManagementPageProps<T>) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ListingStatus>('pending');
    const [rejectingItem, setRejectingItem] = useState<T | null>(null);

    const filteredItems = useMemo(() => {
        return [...items].filter(item => item.status === activeTab)
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [items, activeTab]);

    const handleApprove = (itemId: number) => onUpdateStatus(itemId, 'approved');
    const handleRejectConfirm = (reason: string) => {
        if (rejectingItem) {
            onUpdateStatus(rejectingItem.id, 'rejected', reason);
        }
        setRejectingItem(null);
    };

    const tabs: { key: ListingStatus, name: string }[] = [
        { key: 'pending', name: 'قيد المراجعة' },
        { key: 'approved', name: 'المقبولة' },
        { key: 'rejected', name: 'المرفوضة' },
        { key: 'expired', name: 'المنتهية' },
    ];

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6"><ArrowLeftIcon className="w-5 h-5"/><span>العودة</span></button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">{icon}{title}</h1>
                <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                    <nav className="-mb-px flex gap-4" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab.key ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                {tab.name} ({items.filter(i => i.status === tab.key).length})
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="space-y-4">
                    {filteredItems.length > 0 ? filteredItems.map(item => (
                        <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between">
                            <div className="flex gap-4 flex-1">
                                {renderItem(item)}
                            </div>
                             <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2 flex-shrink-0">
                                <StatusBadge status={item.status} />
                                <div className="flex gap-2">
                                    {item.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleApprove(item.id)} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200" title="قبول"><CheckCircleIcon className="w-5 h-5"/></button>
                                            <button onClick={() => setRejectingItem(item)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200" title="رفض"><XCircleIcon className="w-5 h-5"/></button>
                                        </>
                                    )}
                                    <button onClick={() => onDeleteItem(item.id)} className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300" title="حذف"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center py-8 text-gray-500">لا توجد عناصر في هذه الفئة.</p>}
                </div>
            </div>
            {rejectingItem && <RejectReasonModal onClose={() => setRejectingItem(null)} onConfirm={handleRejectConfirm} itemType={itemType} />}
        </div>
    );
};

export default ListingManagementPage;
