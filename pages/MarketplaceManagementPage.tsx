import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { ArrowLeftIcon, ShoppingBagIcon, CheckCircleIcon, XCircleIcon, ClockIcon, TrashIcon } from '../components/common/Icons';
import type { MarketplaceItem, ListingStatus } from '../types';
import RejectReasonModal from '../components/common/RejectReasonModal';
import StatusBadge from '../components/common/StatusBadge';

const MarketplaceManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { marketplaceItems, handleUpdateMarketplaceItemStatus, handleDeleteMarketplaceItem } = useCommunity();
    const [activeTab, setActiveTab] = useState<ListingStatus>('pending');
    const [rejectingItem, setRejectingItem] = useState<MarketplaceItem | null>(null);

    const filteredItems = useMemo(() => {
        return marketplaceItems.filter(item => item.status === activeTab);
    }, [marketplaceItems, activeTab]);

    const handleApprove = (itemId: number) => {
        handleUpdateMarketplaceItemStatus(itemId, 'approved');
    };
    
    const handleRejectConfirm = (reason: string) => {
        if (rejectingItem) {
            handleUpdateMarketplaceItemStatus(rejectingItem.id, 'rejected', reason);
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
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3"><ShoppingBagIcon className="w-8 h-8"/>إدارة إعلانات البيع والشراء</h1>

                <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                    <nav className="-mb-px flex gap-4" aria-label="Tabs">
                        {tabs.map(tab => (
                             <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab.key ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                                {tab.name} ({marketplaceItems.filter(i => i.status === tab.key).length})
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="space-y-4">
                    {filteredItems.length > 0 ? filteredItems.map(item => (
                        <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between">
                            <div className="flex gap-4">
                                <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" loading="lazy" decoding="async" />
                                <div>
                                    <p className="font-bold">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                    <p className="text-sm font-semibold text-cyan-600">{item.price.toLocaleString()} جنيه</p>
                                    <p className="text-xs text-gray-400">بواسطة: {item.username}</p>
                                    {item.status === 'rejected' && <p className="text-xs text-red-500">السبب: {item.rejectionReason}</p>}
                                </div>
                            </div>
                            <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2 flex-shrink-0">
                                <StatusBadge status={item.status} />
                                <div className="flex gap-2">
                                    {item.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleApprove(item.id)} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"><CheckCircleIcon className="w-5 h-5"/></button>
                                            <button onClick={() => setRejectingItem(item)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><XCircleIcon className="w-5 h-5"/></button>
                                        </>
                                    )}
                                    <button onClick={() => handleDeleteMarketplaceItem(item.id)} className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center py-8 text-gray-500">لا توجد إعلانات في هذه الفئة.</p>}
                </div>
            </div>

            {rejectingItem && <RejectReasonModal onClose={() => setRejectingItem(null)} onConfirm={handleRejectConfirm} itemType="الإعلان" />}
        </div>
    );
};

export default MarketplaceManagementPage;