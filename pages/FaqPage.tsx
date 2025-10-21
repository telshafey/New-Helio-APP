import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeftIcon, QuestionMarkCircleIcon, InformationCircleIcon, Cog6ToothIcon, MapPinIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowTrendingUpIcon } from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';

const FaqPage: React.FC = () => {
    const navigate = useNavigate();
    const { publicPagesContent } = useData();
    const content = publicPagesContent.faq;

     const getCategoryIcon = (category: string): React.ReactNode => {
        const lowerCaseCategory = category.toLowerCase();
        if (lowerCaseCategory.includes('تطبيق')) return <InformationCircleIcon className="w-7 h-7" />;
        if (lowerCaseCategory.includes('استخدام')) return <Cog6ToothIcon className="w-7 h-7" />;
        if (lowerCaseCategory.includes('أماكن')) return <MapPinIcon className="w-7 h-7" />;
        if (lowerCaseCategory.includes('تواصل')) return <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />;
        if (lowerCaseCategory.includes('تطوير')) return <ArrowTrendingUpIcon className="w-7 h-7" />;
        return <QuestionMarkCircleIcon className="w-7 h-7" />;
    };

    return (
        <div className="animate-fade-in" dir="rtl">
            <PageBanner
                title={content.title}
                subtitle={content.subtitle}
                icon={<QuestionMarkCircleIcon className="w-12 h-12 text-cyan-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                 <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-8 max-w-4xl mx-auto">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>العودة</span>
                </button>
                <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                    <div className="space-y-10">
                        {content.categories.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200 border-b-2 border-cyan-500/50 pb-3 flex items-center gap-3">
                                    <span className="text-cyan-500">{getCategoryIcon(category.category)}</span>
                                    {category.category}
                                </h2>
                                <div className="space-y-6">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0 last:pb-0">
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.q}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                     <div className="mt-12 text-center p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <p className="font-bold text-xl">☀️ مدينتك في جيبك = Helio APP</p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">كل الأماكن، كل الخدمات، كل التفاصيل... في تطبيق واحد. جربه دلوقتي، وخلي المدينة أسهل.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
