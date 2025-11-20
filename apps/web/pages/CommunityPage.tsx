import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers, useAuth, useCommunity, useNews } from '@helio/shared-logic';
import type { Circle } from '@helio/shared-logic';
import { 
    PlusIcon, ChatBubbleOvalLeftEllipsisIcon, UsersIcon, TrashIcon, 
    ShoppingBagIcon, BriefcaseIcon, ArchiveBoxIcon
} from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';
import AdSlider from '../components/common/AdSlider';

// Import newly created tab components
import CommunityFeedTab from '../components/community/CommunityFeedTab';
import MarketplaceTab from '../components/community/MarketplaceTab';
import JobsTab from '../components/community/JobsTab';
import LostAndFoundTab from '../components/community/LostAndFoundTab';

// --- MAIN COMMUNITY PAGE ---
const CommunityPage: React.FC = () => {
    const { users } = useUsers();
    const { posts, circles } = useCommunity();
    const { isPublicAuthenticated, currentPublicUser } = useAuth();
    const { advertisements } = useNews();
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'jobs' | 'lost-and-found'>('feed');
    const [activeCircleId, setActiveCircleId] = useState<number>(1);

    const sliderAds = React.useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return advertisements.filter(ad => {
            const start = new Date(ad.startDate);
            const end = new Date(ad.endDate);
            return today >= start && today <= end;
        });
    }, [advertisements]);
    
    const handleSidebarButtonClick = () => {
        if (!isPublicAuthenticated) {
            navigate('/login-user');
            return;
        }
        if (activeTab === 'feed') navigate('/community/new-post');
        else if (activeTab === 'marketplace') navigate('/community/new-item');
        else if (activeTab === 'jobs') navigate('/community/new-job');
        else if (activeTab === 'lost-and-found') navigate('/community/new-lost-found');
    };

    const getSidebarButtonText = () => {
        switch (activeTab) {
            case 'marketplace': return 'أضف إعلانك';
            case 'jobs': return 'أضف وظيفة';
            case 'lost-and-found': return 'أضف بلاغاً';
            case 'feed':
            default: return 'أضف منشوراً جديداً';
        }
    };

    const TabButton: React.FC<{ tabId: 'feed' | 'marketplace' | 'jobs' | 'lost-and-found', title: string, icon: React.ReactNode }> = ({ tabId, title, icon }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 font-semibold rounded-t-lg transition-colors focus:outline-none text-sm ${
                activeTab === tabId
                    ? 'bg-white dark:bg-slate-800 text-cyan-500 border-b-2 border-cyan-500'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
        >
            {icon}
            {title}
        </button>
    );

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen animate-fade-in" dir="rtl">
            <PageBanner
                title="مجتمع هليوبوليس"
                subtitle="شارك، تواصل، وكن جزءاً من مجتمع حيوي."
                icon={<ChatBubbleOvalLeftEllipsisIcon className="w-12 h-12 text-teal-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sliderAds.length > 0 && (
                    <div className="mb-8">
                        <AdSlider ads={sliderAds} />
                    </div>
                )}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Feed */}
                    <main className="w-full lg:w-8/12 xl:w-9/12">
                         <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                            <div className="overflow-x-auto scrollbar-hide">
                                <nav className="-mb-px flex gap-2 whitespace-nowrap" aria-label="Tabs">
                                    <TabButton tabId="feed" title="المنشورات" icon={<ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="marketplace" title="البيع والشراء" icon={<ShoppingBagIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="jobs" title="الوظائف" icon={<BriefcaseIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="lost-and-found" title="المفقودات" icon={<ArchiveBoxIcon className="w-5 h-5"/>} />
                                </nav>
                            </div>
                        </div>

                        {activeTab === 'feed' && <CommunityFeedTab posts={posts} circles={circles} />}
                        {activeTab === 'marketplace' && <MarketplaceTab />}
                        {activeTab === 'jobs' && <JobsTab />}
                        {activeTab === 'lost-and-found' && <LostAndFoundTab />}
                    </main>
                    
                    {/* Sidebar */}
                    <aside className="w-full lg:w-4/12 xl:w-3/12 space-y-6">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg text-center">
                            {currentPublicUser ? (
                                <>
                                    <img src={currentPublicUser.avatar} alt={currentPublicUser.name} className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-cyan-500/50" />
                                    <h3 className="mt-4 text-xl font-bold">مرحباً، {currentPublicUser.name}!</h3>
                                </>
                            ) : (
                                <h3 className="text-xl font-bold">مرحباً في مجتمع هليوبوليس</h3>
                            )}
                             <div className="mt-4 flex justify-around text-sm">
                                <div className="text-gray-500 dark:text-gray-400"><strong className="block text-lg text-gray-800 dark:text-white">{posts.length}</strong> منشور</div>
                                <div className="text-gray-500 dark:text-gray-400"><strong className="block text-lg text-gray-800 dark:text-white">{users.length}</strong> عضو</div>
                            </div>
                             <button onClick={handleSidebarButtonClick} className="w-full mt-6 flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-cyan-600 transition-transform hover:scale-105">
                                <PlusIcon className="w-5 h-5"/>
                                <span>{getSidebarButtonText()}</span>
                            </button>
                        </div>

                         <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><UsersIcon className="w-5 h-5"/> الدوائر</h3>
                            <div className="space-y-2">
                                {circles.map(circle => (
                                    <button key={circle.id} onClick={() => setActiveCircleId(circle.id)} className={`w-full text-right p-3 rounded-md font-semibold transition ${activeCircleId === circle.id ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        {circle.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

            </div>
        </div>
    );
};

export default CommunityPage;