import React from 'react';
import { useCommunity, useAuth, useServices } from '@helio/shared-logic';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { TagIcon, QrCodeIcon } from '../components/common/Icons';
import EmptyState from '../components/common/EmptyState';
import type { Service } from '@helio/shared-logic';

const MyOffersPage: React.FC = () => {
    const { userOffers, offers } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();

    const myActiveOffers = userOffers.filter(uo => uo.userId === currentPublicUser?.id && uo.status === 'active');
    
    const getOfferDetails = (offerId: number) => offers.find(o => o.id === offerId);
    const getServiceDetails = (serviceId: number): Service | undefined => services.find(s => s.id === serviceId);

    return (
        <div className="animate-fade-in" dir="rtl">
            <PageBanner
                title="عروضي"
                subtitle="هنا تجد جميع العروض التي حصلت عليها. أظهر هذه الشاشة لمقدم الخدمة للاستفادة من العرض."
                icon={<TagIcon className="w-12 h-12 text-pink-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-3xl mx-auto">
                    {myActiveOffers.length > 0 ? (
                        <div className="space-y-6">
                            {myActiveOffers.map(userOffer => {
                                const offerDetails = getOfferDetails(userOffer.offerId);
                                if (!offerDetails) return null;
                                const serviceDetails = getServiceDetails(offerDetails.serviceId);
                                
                                return (
                                    <div key={userOffer.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
                                        <div className="flex-shrink-0 text-center">
                                            {/* Placeholder for QR Code */}
                                             <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                                <QrCodeIcon className="w-20 h-20 text-slate-400 dark:text-slate-500"/>
                                             </div>
                                            <p className="mt-2 text-xs text-gray-500">امسح الرمز لدى مقدم الخدمة</p>
                                        </div>
                                        <div className="flex-grow text-center sm:text-right">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{offerDetails.title}</h3>
                                            {serviceDetails && <p className="text-gray-500 dark:text-gray-400"> لدى <Link to={`/service/${serviceDetails.id}`} className="font-semibold text-cyan-500 hover:underline">{serviceDetails.name}</Link></p>}
                                            <div className="my-4">
                                                <p className="text-sm text-gray-500">أو استخدم الرمز التالي:</p>
                                                <p className="text-2xl font-mono tracking-widest bg-slate-100 dark:bg-slate-700 inline-block px-4 py-2 rounded-lg mt-1">{userOffer.redeemCode}</p>
                                            </div>
                                            <p className="text-xs text-gray-400">تم الحصول على العرض في: {new Date(userOffer.generatedDate).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<TagIcon className="w-16 h-16 text-slate-400" />}
                            title="ليس لديك عروض نشطة"
                            message="ابدأ بتصفح العروض الحصرية واحصل على ما يناسبك!"
                        >
                            <Link to="/offers" className="inline-block bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors">
                                تصفح العروض
                            </Link>
                        </EmptyState>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOffersPage;