import React from 'react';
import { useCommunity } from '../../packages/shared-logic/src/context/AppContext';
import ListingManagementPage from '../components/common/ListingManagementPage';
import { BriefcaseIcon } from '../components/common/Icons';

const JobsManagementPage: React.FC = () => {
    const { jobPostings, handleUpdateJobPostingStatus, handleDeleteJobPosting } = useCommunity();

    return (
        <ListingManagementPage
            title="إدارة الوظائف"
            icon={<BriefcaseIcon className="w-8 h-8"/>}
            items={jobPostings}
            onUpdateStatus={handleUpdateJobPostingStatus}
            onDeleteItem={handleDeleteJobPosting}
            itemType="الوظيفة"
            renderItem={(item) => (
                <div className="flex-1">
                    <p className="font-bold">{item.title} - <span className="font-normal text-gray-600 dark:text-gray-300">{item.companyName}</span></p>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">بواسطة: {item.username}</p>
                </div>
            )}
        />
    );
};

export default JobsManagementPage;
