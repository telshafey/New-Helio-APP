import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Corrected import path for types from the shared logic package.
import type { ExclusiveOffer, Service } from '../../packages/shared-logic/src/types';
import { TagIcon, CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { prefetchMap } from './AnimatedRoutes';
import { useCommunity } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const OffersHighlightCard: React.FC<{ offer: ExclusiveOffer; service: Service | undefined }> = ({ offer, service }) => {
    const { generateUserOffer } = useCommunity();
    const { isPublicAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleGetOffer = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isPublicAuthenticated) {
            navigate('/login-user');
            return;
        }
        const result = generateUserOffer(offer.id);
        if (result.success) {
            navigate('/my-offers');
        }
    };

    return (
        <div className="flex-shrink-0 w-80 h-full">
            <div 
                className="flex flex-col h-full group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
            >
                <Link 
                    to={`/service/${offer.serviceId}`} 
                    className="block"
                    onPointerDown={() => prefetchMap[`/service/${offer.serviceId}`]?.()}
                >
                    <div className="relative">
                        <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                    {service && (
                        <div className="flex items-center gap-2 mb-3">
                            <img src={service.images[0]} alt={service.name} className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-600" />
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{service.name}</span>
                        </div>
                    )}
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-cyan-500 flex-grow">{offer.title}</h3>
                    
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <span>ينتهي في: {new Date(offer.endDate).toLocaleDateString('ar-EG-u-nu-latn')}</span>
                        </div>
                        {offer.promoCode && (
                            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-md">
                                <span className="font-semibold">الكود:</span>
                                <span className="font-bold font-mono tracking-wider">{offer.promoCode}</span>
                            </div>
                        )}
                    </div>
                    <button onClick={handleGetOffer} className="w-full mt-4 bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                        احصل على العرض
                    </button>
                </div>
            </div>
        </div>
    );
};


interface OffersHighlightProps {
    offers: ExclusiveOffer[];
    services: Service[];
}

const OffersHighlight: React.FC<OffersHighlightProps> = ({ offers, services }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (offers.length === 0) {
        return null;
    }

    const getService = (serviceId: number): Service | undefined => {
        return services.find(s => s.id === serviceId);
    };

    return (
        <section className="py-12 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-3">
                    <TagIcon className="w-8 h-8 text-pink-500" />
                    عروض حصرية لسكان المدينة
                </h2>
                <div className="relative group">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide"
                    >
                        {offers.map(offer => (
                            <OffersHighlightCard key={offer.id} offer={offer} service={getService(offer.serviceId)} />
                        ))}
                    </div>
                    {/* Desktop Navigation Buttons */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white dark:bg-slate-800 shadow-lg rounded-full p-2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label="Scroll right"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white dark:bg-slate-800 shadow-lg rounded-full p-2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label="Scroll left"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="text-center mt-10">
                    <Link 
                        to="/offers" 
                        onPointerDown={() => prefetchMap['/offers']?.()}
                        className="inline-block px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-transform hover:scale-105"
                    >
                        عرض كل العروض
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OffersHighlight;