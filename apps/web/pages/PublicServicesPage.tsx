import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Corrected import paths for monorepo structure
import { useServices } from '../../../packages/shared-logic/context/ServicesContext';
import { 
    Squares2X2Icon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '../components/common/Icons';
import { getIcon } from '../components/common/iconUtils';
import PageBanner from '../components/common/PageBanner';
// FIX: Corrected import paths for monorepo structure
import { useNews } from '../../../packages/shared-logic/context/NewsContext';
import AdSlider from '../components/common/AdSlider';

const PublicServicesPage: React.FC = () => {
    const { categories, services } = useServices();
    const { advertisements } = useNews();
    const serviceCategories = categories.filter(c => c.name !== "المدينة والجهاز");
    const [openCategoryId, setOpenCategoryId] = useState<number | null>(serviceCategories.length > 0 ? serviceCategories[0].id : null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const searchResults = useMemo(() => {
        if (searchTerm.trim().length < 2) {
            return [];
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return services.filter(service => service.name.toLowerCase().includes(lowercasedTerm));
    }, [searchTerm, services]);

    const handleResultClick = (serviceId: number) => {
        setSearchTerm('');
        navigate(`/service/${serviceId}`);
    };

    const sliderAds = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return advertisements.filter(ad => {
            const start = new Date(ad.startDate);
            const end = new Date(ad.endDate);
            return today >= start && today <= end;
        });
    }, [advertisements]);

    const handleToggleCategory = (id: number) => {
        setOpenCategoryId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="animate-fade-in" dir="rtl">
             <PageBanner
                title="تصفح الخدمات"
                subtitle="اكتشف كل ما تقدمه مدينة هليوبوليس الجديدة."
                icon={<Squares2X2Icon className="w-12 h-12 text-cyan-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {sliderAds.length > 0 && (
                    <div className="mb-8">
                        <AdSlider ads={sliderAds} />
                    </div>
                )}
                
                <div className="relative max-w-2xl mx-auto mb-8">
                    <div className="relative">
                       <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-4 -translate-y-1/2 z-10" />
                       <input 
                            type="search" 
                            placeholder="ابحث عن خدمة محددة (مثال: مطعم, صيدلية...)" 
                            className="w-full pl-4 pr-12 py-3 text-base rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition bg-white dark:bg-slate-800"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                    {searchTerm.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl max-h-80 overflow-y-auto z-20 text-right">
                            {searchResults.length > 0 ? (
                                <ul>
                                    {searchResults.map(service => (
                                        <li key={service.id}>
                                            <button onClick={() => handleResultClick(service.id)} className="w-full text-right flex items-center gap-4 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{service.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.address}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (searchTerm.trim().length > 1 &&
                                <p className="p-8 text-center text-gray-500">لا توجد خدمات تطابق بحثك.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCategories.map(category => (
                        <div key={category.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                            <button onClick={() => handleToggleCategory(category.id)} className="w-full flex justify-between items-center p-5 text-right hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    {getIcon(category.icon, { className: "w-8 h-8 text-cyan-500" })}
                                    <span className="font-semibold text-xl text-gray-800 dark:text-white">{category.name}</span>
                                </div>
                                <ChevronDownIcon className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${openCategoryId === category.id ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openCategoryId === category.id ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
                                        {category.subCategories.map(sub => (
                                            <Link 
                                                key={sub.id} 
                                                to={`/services/subcategory/${sub.id}`} 
                                                className="block p-4 text-center rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-sm hover:shadow-md"
                                            >
                                                <span className="font-semibold">{sub.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PublicServicesPage;