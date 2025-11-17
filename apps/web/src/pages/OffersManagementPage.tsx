import React from 'react';
import { useCommunity } from '../../packages/shared-logic/src/context/AppContext';
import { useServices } from '../../packages/shared-logic/src/context/ServicesContext';
import ListingManagementPage from '../components/common/ListingManagementPage';
import { TagIcon } from '../components/common/Icons';
// Type import is fine as it's stripped at compile time.
import type { ExclusiveOffer } from '../../packages/shared-logic/src/types';

const OffersManagementPage: React.FC = () => {
    const { offers, handleUpdateOfferStatus, handleDeleteOffer } = useCommunity();
    const { services } = useServices();

    const getServiceName = (serviceId: number): string => {
        return services.find(s => s.id === serviceId)?.name || 'خدمة محذوفة';
    };

    return (
        <ListingManagementPage
            title="إدارة العروض الحصرية"
            icon={<TagIcon className="w-8 h-8"/>}
            items={offers}
            onUpdateStatus={handleUpdateOfferStatus}
            onDeleteItem={handleDeleteOffer}
            itemType="العرض"
            renderItem={(item: ExclusiveOffer) => (
                <>
                    <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">للخدمة: {getServiceName(item.serviceId)}</p>
                        <p className="text-xs text-gray-400">تنتهي في: {item.endDate}</p>
                    </div>
                </>
            )}
        />
    );
};

export default OffersManagementPage;
