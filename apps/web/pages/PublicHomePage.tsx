import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    MagnifyingGlassIcon, TruckIcon, ChatBubbleOvalLeftEllipsisIcon,
    WrenchScrewdriverIcon, HomeModernIcon, NewspaperIcon, PhoneIcon, MapIcon
} from '../components/common/Icons';
import { useData, useServices, useProperties, useNews, useCommunity, useTransportation } from '@helio/shared-logic';
import AdSlider from '../components/common/AdSlider';
import ServicesCarousel from '../components/common/ServicesCarousel';
import PropertyCarousel from '../components/common/PropertyCarousel';
import NewsCarousel from '../components/common/NewsCarousel';
import { prefetchMap } from '../components/common/AnimatedRoutes';
import type { Driver, SearchResult } from '@helio/shared-logic';
import OffersHighlight from '../components/common/OffersHighlight';
import HomePageSkeleton from '../components/skeletons/HomePageSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// New inline component for Transportation Highlight
const TransportationHighlight: React.FC = () => {
    const handlePrefetch = () => prefetchMap['/transportation']?.();
    const { transportation } = useTransportation();

    const todayString = new Date().toISOString().split('T')[0];
    const todaySchedule = transportation.weeklySchedule.find(d => d.date === todayString);
    
    const todaysDrivers = (todaySchedule?.drivers || [])
        .map(scheduledDriver => {
            return transportation.internalDrivers.find(d => d.name === scheduledDriver.name);
        })
        .filter((driver): driver is Driver => driver !== undefined);

    const internalRoutes = transportation.internalRoutes || [];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                        <TruckIcon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">المواصلات الداخلية</h3>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">مناوبة اليوم:</h4>
                        {todaysDrivers && todaysDrivers.length > 0 ? (
                            <div className="space-y-3">
                                {todaysDrivers.map(driver => (
                                    <div key={driver.id} className="flex items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                                        <div className="flex items-center gap-3">
                                            <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{driver.name}</p>
                                                <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{driver.phone}</p>
                                            </div>
                                        </div>
                                        <a href={`tel:${driver.phone}`} className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors text-sm">
                                            <PhoneIcon className="w-4 h-4" />
                                            <span>اتصال</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">لا يوجد سائقين مناوبين اليوم.</p>
                        )}
                    </div>
                    
                    {internalRoutes.length > 0 && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                             <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">المسارات الداخلية:</h4>
                             <div className="space-y-2">
                                {internalRoutes.map(route => (
                                    <div key={route.id} className="text-sm">
                                        <p className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                            <MapIcon className="w-4 h-4 text-purple-400"/>
                                            {route.name}:
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 pr-5">{route.path}</p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                </div>
            </div>
            <Link to="/transportation" onPointerDown={handlePrefetch} className="mt-6 block w-full text-center bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition-colors">
                عرض دليل المواصلات الكامل
            </Link>
        </div>
    );
};

// New inline component for Community Updates
const CommunityUpdates: React.FC = () => {
    const { posts } = useCommunity();
    const latestPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
    const handlePostPrefetch = (id: number) => prefetchMap[`/post/${id}`]?.();
    const handleCommunityPrefetch = () => prefetchMap['/community']?.();

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-full">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">آخر مستجدات المجتمع</h3>
            </div>
            <div className="space-y-3 flex-grow">
                {latestPosts.map(post => (
                    <Link key={post.id} to={`/post/${post.id}`} onPointerDown={() => handlePostPrefetch(post.id)} className="block p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50">
                        <div className="flex items-center gap-3">
                            <img src={post.avatar} alt={post.username} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{post.title || post.content}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">بواسطة {post.username}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
             <Link to="/community" onPointerDown={handleCommunityPrefetch} className="mt-6 block w-full text-center bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition-colors">
                تصفح كل المنشورات
            </Link>
        </div>
    );
};


const PublicHomePage: React.FC = () => {
    const { publicPagesContent, loading: dataLoading } = useData();
    const { services, loading: servicesLoading } = useServices();
    const { properties, loading: propertiesLoading } = useProperties();
    const { advertisements, news, loading: newsLoading } = useNews();
    const { offers, loading: communityLoading } = useCommunity();
    const content = publicPagesContent.home;
    const navigate = useNavigate();

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const isLoading = dataLoading || servicesLoading || propertiesLoading || newsLoading || communityLoading;

    // Debounce search term
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);
    
    // Perform search
    useEffect(() => {
        if (debouncedSearchTerm.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        const lowercasedTerm = debouncedSearchTerm.toLowerCase();
        
        const serviceResults: SearchResult[] = services
            .filter(s => s.name.toLowerCase().includes(lowercasedTerm))
            .map(s => ({
                id: `service-${s.id}`,
                type: 'خدمة',
                title: s.name,
                subtitle: s.address,
                link: `/service/${s.id}`,
                icon: <WrenchScrewdriverIcon className="w-5 h-5 text-cyan-500" />
            }));

        const propertyResults: SearchResult[] = properties
            .filter(p => p.title.toLowerCase().includes(lowercasedTerm))
            .map(p => ({
                id: `property-${p.id}`,
                type: 'عقار',
                title: p.title,
                subtitle: p.location.address,
                link: `/property/${p.id}`,
                icon: <HomeModernIcon className="w-5 h-5 text-amber-500" />
            }));
        
        const newsResults: SearchResult[] = news
            .filter(n => n.title.toLowerCase().includes(lowercasedTerm))
            .map(n => ({
                id: `news-${n.id}`,
                type: 'خبر',
                title: n.title,
                subtitle: `بواسطة ${n.author}`,
                link: `/news/${n.id}`,
                icon: <NewspaperIcon className="w-5 h-5 text-purple-500" />
            }));

        setSearchResults([...serviceResults, ...propertyResults, ...newsResults].slice(0, 15));
    }, [debouncedSearchTerm, services, properties, news]);

    const groupedResults = useMemo(() => {
        return searchResults.reduce<Record<string, SearchResult[]>>((acc, result) => {
            const type = result.type;
            (acc[type] = acc[type] || []).push(result);
            return acc;
        }, {});
    }, [searchResults]);

    // Handle click outside to close results
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    const handleResultClick = (link: string) => {
        setIsSearchFocused(false);
        setSearchTerm('');
        navigate(link);
    };

    const sliderAds = React.useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return advertisements.filter(ad => {
            const start = new Date(ad.startDate);
            const end = new Date(ad.endDate);
            return today >= start && today <= end;
        });
    }, [advertisements]);

    const activeOffers = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return offers
            .filter(offer => {
                const start = new Date(offer.startDate);
                const end = new Date(offer.endDate);
                return offer.status === 'approved' && today >= start && today <= end;
            })
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [offers]);

    if (isLoading) {
        return <HomePageSkeleton />;
    }

    const recentServices = [...services].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 10);
    const recentNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
    const recentProperties = [...properties].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 8);

    return (
        <div className="animate-fade-in" dir="rtl">
            <AnimatePresence>
                {isSearchFocused && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 z-10"
                    onClick={() => setIsSearchFocused(false)}
                    />
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative bg-slate-100 dark:bg-slate-900 pt-6 pb-10 md:pt-10 md:pb-16 text-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5" style={{backgroundImage: `url('https://picsum.photos/1600/900?grayscale')`}}></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            {content.heroTitleLine1}
                        </span>
                    </h1>
                    <p className="max-w-xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                        {content.heroSubtitle}
                    </p>
                    <div className="relative max-w-xl mx-auto z-20" ref={searchContainerRef}>
                        <div className="relative">
                           <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-4 -translate-y-1/2" />
                           <input 
                                type="search" 
                                placeholder="ابحث عن مطعم، صيدلية، أو أي خدمة..." 
                                className="w-full pl-4 pr-12 py-3 text-base rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                           />
                        </div>
                        <AnimatePresence>
                            {isSearchFocused && searchTerm.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl max-h-96 overflow-y-auto text-right"
                                >
                                    {(searchResults.length > 0 && debouncedSearchTerm.trim().length > 1) ? (
                                        <div className="p-2">
                                            {Object.keys(groupedResults).map((type) => (
                                                <div key={type} className="mb-2">
                                                    <h3 className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 px-4 py-2">{type}</h3>
                                                    <ul>
                                                        {groupedResults[type].map(result => (
                                                            <li key={result.id}>
                                                                <button onClick={() => handleResultClick(result.link)} className="w-full text-right flex items-center gap-4 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                                                                    <div className="flex-shrink-0">{result.icon}</div>
                                                                    <div>
                                                                        <p className="font-semibold text-gray-800 dark:text-white">{result.title}</p>
                                                                        {result.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{result.subtitle}</p>}
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (debouncedSearchTerm.trim().length > 1 &&
                                        <p className="p-8 text-center text-gray-500">لا توجد نتائج بحث.</p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {sliderAds.length > 0 && <AdSlider ads={sliderAds} />}
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TransportationHighlight />
                    <CommunityUpdates />
                </div>
            </motion.div>

            {activeOffers.length > 0 && <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}><OffersHighlight offers={activeOffers} services={services} /></motion.div>}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}><ServicesCarousel title="أحدث الخدمات" services={recentServices} /></motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}><PropertyCarousel title="أحدث العقارات" properties={recentProperties} /></motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}><NewsCarousel title="آخر الأخبار" news={recentNews} /></motion.div>
            
        </div>
    );
};

export default PublicHomePage;