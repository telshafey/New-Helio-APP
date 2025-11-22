import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { useServices } from '../context/ServicesContext';
import { ArrowLeftIcon, TagIcon, CheckCircleIcon, XCircleIcon, ClockIcon, TrashIcon, PlusIcon } from '../components/common/Icons';
import type { ExclusiveOffer, ListingStatus, Service } from '../types';
import RejectReasonModal from '../components/common/RejectReasonModal';
import Modal from '../components/common/Modal';
import OfferForm from '../components/business/OfferForm';
import StatusBadge from '../components/common/StatusBadge';

const OffersManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { offers, handleSaveOffer, handleUpdateOfferStatus, handleDeleteOffer } = useCommunity();
    const { services } = useServices();
    const [activeTab, setActiveTab] = useState<ListingStatus>('pending');
    const [rejectingOffer, setRejectingOffer] = useState<ExclusiveOffer | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<ExclusiveOffer | null>(null);

    const filteredOffers = useMemo(() => {
        return offers.filter(offer => offer.status === activeTab);
    }, [offers, activeTab]);

    const tabs: { key: ListingStatus, name: string }[] = [
        { key: 'pending', name: 'قيد المراجعة' },
        { key: 'approved', name: 'المقبولة' },
        { key: 'rejected', name: 'المرفوضة' },
        { key: 'expired', name: 'المنتهية' },
    ];
    
    const handleOpenForm = (offer: ExclusiveOffer | null) => {
        setEditingOffer(offer);
        setIsFormOpen(true);
    };

    const handleSaveAndClose = (data: any) => {
        handleSaveOffer(data);
        setIsFormOpen(false);
    }

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6"><ArrowLeftIcon className="w-5 h-5"/><span>العودة</span></button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold flex items-center gap-3"><TagIcon className="w-8 h-8"/>إدارة العروض الحصرية</h1>
                    <button onClick={() => handleOpenForm(null)} className="flex items-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600"><PlusIcon className="w-5 h-5"/>إضافة عرض</button>
                </div>
                
                <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                    <nav className="-mb-px flex gap-4" aria-label="Tabs">{tabs.map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab.key ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            {tab.name} ({offers.filter(i => i.status === tab.key).length})
                        </button>
                    ))}</nav>
                </div>
                
                <div className="space-y-4">{filteredOffers.length > 0 ? filteredOffers.map(offer => (
                    <div key={offer.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="flex gap-4">
                            <img src={offer.imageUrl} alt={offer.title} className="w-24 h-24 object-cover rounded-md" />
                            <div>
                                <p className="font-bold">{offer.title}</p>
                                <p className="text-sm text-gray-500">للخدمة: {services.find(s=> s.id === offer.serviceId)?.name}</p>
                                <p className="text-xs text-gray-400">تنتهي في: {offer.endDate}</p>
                                 {offer.status === 'rejected' && <p className="text-xs text-red-500">السبب: {offer.rejectionReason}</p>}
                            </div>
                        </div>
                        <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2">
                            <StatusBadge status={offer.status} />
                            <div className="flex gap-2">
                                {offer.status === 'pending' && <>
                                    <button onClick={() => handleUpdateOfferStatus(offer.id, 'approved')} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"><CheckCircleIcon className="w-5 h-5"/></button>
                                    <button onClick={() => setRejectingOffer(offer)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><XCircleIcon className="w-5 h-5"/></button>
                                </>}
                                <button onClick={() => handleDeleteOffer(offer.id)} className="p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center py-8 text-gray-500">لا توجد عروض في هذه الفئة.</p>}</div>
            </div>

            {isFormOpen && <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingOffer ? "تعديل العرض" : "إضافة عرض جديد"}>
                <OfferForm onClose={() => setIsFormOpen(false)} onSave={handleSaveAndClose} services={services} offer={editingOffer} />
            </Modal>}

            {rejectingOffer && <RejectReasonModal onClose={() => setRejectingOffer(null)} onConfirm={(reason) => { handleUpdateOfferStatus(rejectingOffer.id, 'rejected', reason); setRejectingOffer(null);}} itemType="العرض" />}
        </div>
    );
};

export default OffersManagementPage;