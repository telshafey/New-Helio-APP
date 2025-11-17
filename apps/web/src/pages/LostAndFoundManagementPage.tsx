import React from 'react';
import { useCommunity } from '../../packages/shared-logic/src/context/AppContext';
import ListingManagementPage from '../components/common/ListingManagementPage';
import { ArchiveBoxIcon } from '../components/common/Icons';
// Type import is fine
import type { LostAndFoundItem } from '../../packages/shared-logic/src/types';


const LostAndFoundManagementPage: React.FC = () => {
    const { lostAndFoundItems, handleUpdateLostAndFoundItemStatus, handleDeleteLostAndFoundItem } = useCommunity();

    return (
        <ListingManagementPage
            title="إدارة المفقودات والموجودات"
            icon={<ArchiveBoxIcon className="w-8 h-8"/>}
            items={lostAndFoundItems}
            onUpdateStatus={handleUpdateLostAndFoundItemStatus}
            onDeleteItem={handleDeleteLostAndFoundItem}
            itemType="البلاغ"
            renderItem={(item: LostAndFoundItem) => (
                 <>
                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />}
                    <div>
                        <p className="font-bold">{item.title} <span className={`text-xs font-semibold ${item.type === 'lost' ? 'text-red-500' : 'text-green-500'}`}>({item.type === 'lost' ? 'مفقود' : 'موجود'})</span></p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">بواسطة: {item.username}</p>
                    </div>
                </>
            )}
        />
    );
};

export default LostAndFoundManagementPage;
