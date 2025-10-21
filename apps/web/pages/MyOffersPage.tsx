import React from 'react';
// FIX: Corrected import paths for monorepo structure
import { useCommunity } from '../../../packages/shared-logic/context/AppContext';
import { useAuth } from '../../../packages/shared-logic/context/AuthContext';
import { useServices } from '../../../packages/shared-logic/context/ServicesContext';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { TagIcon, QrCodeIcon } from '../components/common/Icons';
import EmptyState from '../components/common/EmptyState';
// FIX: Corrected import paths for monorepo structure
import type { Service } from '../../../packages/shared-logic/types';

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
                                            <p className