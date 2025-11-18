import React, { useMemo } from 'react';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/common/NewsCard';
import { NewspaperIcon } from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';
import AdSlider from '../components/common/AdSlider';
import CardGridPageSkeleton from '../components/skeletons/CardGridPageSkeleton';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PublicNewsPage: React.FC = () => {
    const { news, advertisements, loading } = useNews();
    const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const sliderAds = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return advertisements.filter(ad => {
            const start = new Date(ad.startDate);
            const end = new Date(ad.endDate);
            return today >= start && today <= end;
        });
    }, [advertisements]);

    return (
        <div className="animate-fade-in" dir="rtl">
            <PageBanner
                title="أخبار المدينة"
                subtitle="كن على اطلاع بآخر المستجدات والأحداث في هليوبوليس الجديدة."
                icon={<NewspaperIcon className="w-12 h-12 text-purple-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {sliderAds.length > 0 && (
                    <div className="mb-8">
                        <AdSlider ads={sliderAds} />
                    </div>
                )}
                {loading ? (
                    <CardGridPageSkeleton />
                ) : sortedNews.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {sortedNews.map(newsItem => (
                           <motion.div key={newsItem.id} variants={itemVariants}>
                                <NewsCard newsItem={newsItem} />
                           </motion.div>
                        ))}
                    </motion.div>
                ) : (
                     <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">لا توجد أخبار حالياً</h3>
                        <p className="mt-2">يرجى التحقق مرة أخرى قريباً.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicNewsPage;