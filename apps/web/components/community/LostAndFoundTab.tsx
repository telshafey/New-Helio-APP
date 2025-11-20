import React, { useState, useMemo } from 'react';
import { useCommunity } from '@helio/shared-logic';
import type { LostAndFoundItem } from '@helio/shared-logic';
import { ArchiveBoxIcon, MapPinIcon } from '../common/Icons';
import EmptyState from '../common/EmptyState';

const LostAndFoundCard: React.FC<{ item: LostAndFoundItem }> = ({ item }) => {
    const [showContact, setShowContact] = useState(false);
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />}
            <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                     <img src={item.avatar} alt={item.username} className="w-8 h-8 rounded-full" />
                     <span className="font-semibold text-sm">{item.username}</span>
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm my-2">{item.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-3">
                    <p className="flex items-center gap-1"><MapPinIcon className="w-4 h-4"/> <strong>الموقع:</strong> {item.location}</p>
                    <p><strong>التاريخ:</strong> {new Date(item.date).toLocaleDateString('ar-EG-u-nu-latn')}</p>
                </div>
                 <button onClick={() => setShowContact(!showContact)} className="w-full mt-4 bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600">
                    {showContact ? item.contactInfo : 'إظهار معلومات التواصل'}
                </button>
            </div>
        </div>
    );
}

const LostAndFoundTab: React.FC = () => {
    const { lostAndFoundItems } = useCommunity();
    const [activeSubTab, setActiveSubTab] = useState<'lost' | 'found'>('lost');

    const filteredItems = useMemo(() => {
        return lostAndFoundItems
            .filter(item => item.status === 'approved' && item.type === activeSubTab)
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [lostAndFoundItems, activeSubTab]);

    return (
        <div className="space-y-6">
            <div className="bg-slate-100 dark:bg-slate-700 p-1 rounded-lg flex gap-1">
                <button onClick={() => setActiveSubTab('lost')} className={`flex-1 px-4 py-2 font-semibold rounded-md ${activeSubTab === 'lost' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}>مفقودات</button>
                <button onClick={() => setActiveSubTab('found')} className={`flex-1 px-4 py-2 font-semibold rounded-md ${activeSubTab === 'found' ? 'bg-white dark:bg-slate-800 shadow' : ''}`}>تم العثور عليها</button>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => <LostAndFoundCard key={item.id} item={item} />)}
                </div>
            ) : (
                <div className="mt-10">
                    <EmptyState icon={<ArchiveBoxIcon className="w-16 h-16 text-slate-400" />} title={`لا توجد ${activeSubTab === 'lost' ? 'مفقودات' : 'موجودات'} حالياً`} message="كن أول من يضيف بلاغاً لمساعدة جيرانك." />
                </div>
            )}
        </div>
    );
};

export default LostAndFoundTab;