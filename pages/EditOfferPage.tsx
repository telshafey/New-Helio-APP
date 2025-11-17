import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunity } from '../context/AppContext';
import { useServices } from '../context/ServicesContext';
import { useAuth } from '../context/AuthContext';
import OfferForm from '../components/business/OfferForm';
import { ArrowLeftIcon } from '../components/common/Icons';
import Spinner from '../components/common/Spinner';

const EditOfferPage: React.FC = () => {
    const navigate = useNavigate();
    const { offerId } = useParams<{ offerId?: string }>();
    const { offers, handleSaveOffer } = useCommunity();
    const { services } = useServices();
    const { currentPublicUser } = useAuth();

    const offer = offerId ? offers.find(o => o.id === Number(offerId)) : null;
    const myServices = services.filter(s => s.ownerId === currentPublicUser?.id);

    if (offerId && !offer) {
        return <Spinner />;
    }
    
    // Security check: ensure user can only edit their own offers.
    if (offer && currentPublicUser && offer.ownerId !== currentPublicUser.id) {
         navigate('/my-business', { replace: true });
         return null;
    }

    const handleSave = (data: any) => {
        handleSaveOffer(data);
        navigate(-1);
    };

    return (
        <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            <div className="max-w-2xl mx-auto">
                 <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span>العودة</span>
                </button>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                     <h1 className="text-2xl font-bold mb-6">{offerId ? 'تعديل العرض' : 'إضافة عرض جديد'}</h1>
                     <OfferForm 
                        onClose={() => navigate(-1)} 
                        onSave={handleSave} 
                        services={myServices} 
                        offer={offer || null} 
                     />
                </div>
            </div>
        </div>
    );
};

export default EditOfferPage;