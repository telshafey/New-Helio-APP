import React from 'react';
import { useCommunity } from '../../packages/shared-logic/src/context/AppContext';
import ListingManagementPage from '../components/common/ListingManagementPage';
import { ShoppingBagIcon } from '../components/common/Icons';

const MarketplaceManagementPage: React.FC = () => {
    const { marketplaceItems, handleUpdateMarketplaceItemStatus, handleDeleteMarketplaceItem } = useCommunity();

    return (
        <ListingManagementPage
            title="إدارة إعلانات البيع والشراء"
            icon={<ShoppingBagIcon className="w-8 h-8"/>}
            items={marketplaceItems}
            onUpdateStatus={handleUpdateMarketplaceItemStatus}
            onDeleteItem={handleDeleteMarketplaceItem}
            itemType="الإعلان"
            renderItem={(item) => (
                <>
                    <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" loading="lazy" decoding="async" />
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-sm font-semibold text-cyan-600">{item.price.toLocaleString()} جنيه</p>
                        <p className="text-xs text-gray-400">بواسطة: {item.username}</p>
                    </div>
                </>
            )}
        />
    );
};

export default MarketplaceManagementPage;
