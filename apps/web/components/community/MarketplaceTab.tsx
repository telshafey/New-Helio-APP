import React, { useState, useMemo } from 'react';
import { useCommunity } from '../../../packages/shared-logic/context/AppContext';
import type { MarketplaceItem } from '../../../packages/shared-logic/types';
import { ShoppingBagIcon, MagnifyingGlassIcon, PhoneIcon } from '../common/Icons';
import EmptyState from '../common/EmptyState';

const MarketplaceItemCard: React.FC<{ item: MarketplaceItem }> = ({ item }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
        <div className="relative">
            <img src={item.images[0]} alt={item.title} className="w-full h-48 object-cover" />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{item.category}</div>
        </div>
        <div className="p-4">
            <h3 className="font-bold text-lg truncate">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm h-10 overflow-hidden">{item.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-extrabold text-cyan-500">{item.price.toLocaleString('ar-EG')} جنيه</p>
                <a href={`tel:${item.contactPhone}`} className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-green-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>تواصل</span>
                </a>
            </div>
        </div>
    </div>
);

const MarketplaceTab: React.FC = () => {
    const { marketplaceItems } = useCommunity();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedItems = useMemo(() => {
        return marketplaceItems
            .filter(item => item.status === 'approved')
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [marketplaceItems, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="relative flex-grow">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
                <input type="text" placeholder="ابحث عن منتج أو فئة..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white dark:bg-slate-700 rounded-lg py-2 pr-10 pl-4 focus:outline-none"/>
            </div>
            {approvedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedItems.map(item => <MarketplaceItemCard key={item.id} item={item} />)}
                </div>
            ) : (
                <div className="mt-10">
                    <EmptyState icon={<ShoppingBagIcon className="w-16 h-16 text-slate-400" />} title="لا توجد إعلانات متاحة" message="كن أول من يضيف إعلان بيع في المدينة!" />
                </div>
            )}
        </div>
    );
};

export default MarketplaceTab;
