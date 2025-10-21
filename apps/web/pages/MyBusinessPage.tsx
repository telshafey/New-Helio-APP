import React, { useMemo, useState } from 'react';
// FIX: Corrected import paths for monorepo structure
import { useAuth } from '../../../packages/shared-logic/context/AuthContext';
import { useServices } from '../../../packages/shared-logic/context/ServicesContext';
import { useCommunity } from '../../../packages/shared-logic/context/AppContext';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon, TagIcon, ChatBubbleOvalLeftIcon, StarIcon, PlusIcon, PencilSquareIcon, TrashIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ChatBubbleLeftRightIcon } from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';
// FIX: Corrected import paths for monorepo structure
import type { ExclusiveOffer, Service, Review, ListingStatus } from '../../../packages/shared-logic/types';
import Modal from '../components/common/Modal';
import { InputField, TextareaField } from '../components/common/FormControls';
import ImageUploader from '../components/common/ImageUploader';
import EmptyState from '../components/common/EmptyState';

const StatusBadge: React.FC<{ status: ListingStatus }> = ({ status }) => {
    const statusMap = {
        pending: { text: 'قيد المراجعة', classes: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: <ClockIcon className="w-4 h-4"/> },
        approved: { text: 'مقبول', classes: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: <CheckCircleIcon className="w-4 h-4"/> },
        rejected: { text: 'مرفوض', classes: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: <XCircleIcon className="w-4 h-4"/> },
        expired: { text: 'منتهي', classes: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300', icon: <ClockIcon className="w-4 h-4"/> },
    };
    const { text, classes, icon } = statusMap[status];
    return <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${classes}`}>{icon}{text}</span>;
};

const OfferForm: React.FC<{
    onClose: () => void;
    onSave: (data: any) => void;
    services: Service[];
    offer: ExclusiveOffer | null;
}> = ({ onClose, onSave, services, offer }) => {
    const [formData, setFormData] = useState({
        title: offer?.title || '',
        description: offer?.description || '',
        serviceId: offer?.serviceId || (services.length > 0 ? services[0].id : ''),
        promoCode: offer?.promoCode || '',
        startDate: offer?.startDate || new Date().toISOString().split('T')[0],
        endDate: offer?.endDate || new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>(offer?.imageUrl ? [offer.imageUrl] : []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image.length === 0) { alert('الرجاء إضافة صورة للعرض.'); return; }
        if (!formData.serviceId) { alert('الرجاء اختيار الخدمة المرتبطة بالعرض.'); return; }
        
        onSave({
            id: offer?.id,
            ...formData,
            serviceId: Number(formData.serviceId),
            imageUrl: image[0],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader initialImages={image} onImagesChange={setImage} multiple={false} label="صورة العرض" />
            <InputField name="title" label="عنوان العرض" value={formData.title} onChange={handleChange} required />
            <TextareaField name="description" label="وصف العرض" value={formData.description} onChange={handleChange} required />
            <div>
                <label className="block text-sm font-medium mb-1">الخدمة المرتبطة</label>
                <select name="serviceId" value={formData.serviceId} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </div>
            <InputField name="promoCode" label="كود الخصم (اختياري)" value={formData.promoCode} onChange={handleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="startDate" label="تاريخ البدء" type="date" value={formData.startDate} onChange={handleChange} required />
                <InputField name="endDate" label="تاريخ الانتهاء" type="date" value={formData.endDate} onChange={handleChange} required />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
            </div>
        </form>
    );
};

const ReplyForm: React.FC<{ review: Review; onSave: (reply: string) => void; onClose: () => void; }> = ({ review, onSave, onClose }) => {
    const [reply, setReply] = useState(review.adminReply || '');
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(reply); };
    return (
        <form onSubmit={handleSubmit}>
            <textarea value={reply} onChange={e => setReply(e.target.value)} required rows={4} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" placeholder="اكتب ردك هنا..."></textarea>
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md">حفظ الرد</button>
            </div>
        </form>
    );
};


const MyBusinessPage: React.FC = () => {
    const { currentPublicUser } = useAuth();
    const { services, handleReplyToReview } = useServices();
    const { offers, handleSaveOffer, handleDeleteOffer } = useCommunity();

    const [isOfferModalOpen, setOfferModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<ExclusiveOffer | null>(null);
    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [replyingToReview, setReplyingToReview] = useState<{ review: Review; serviceId: number } | null>(null);

    const myServices = useMemo(() => {
        if (!currentPublicUser) return [];
        return services.filter(s => s.ownerId === currentPublicUser.id);
    }, [services, currentPublicUser]);

    const myOffers = useMemo(() => {
        if (!currentPublicUser) return [];
        return offers.filter(o => o.ownerId === currentPublicUser.id)
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [offers, currentPublicUser]);

    const myReviews = useMemo(() => {
        if (myServices.length === 0) return [];
        return myServices.flatMap(service =>
            service.reviews.map(review => ({
                ...review,
                serviceId: service.id,
                serviceName: service.name,
            }))
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5); // show latest 5
    }, [myServices]);

    const handleOpenOfferForm = (offer: ExclusiveOffer | null) => {
        setEditingOffer(offer);
        setOfferModalOpen(true);
    };

    const handleOpenReplyForm = (review: Review, serviceId: number) => {
        setReplyingToReview({ review, serviceId });
        setReplyModalOpen(true);
    };

    const handleSaveReply = (reply: string) => {
        if (replyingToReview) {
            handleReplyToReview(replyingToReview.serviceId, replyingToReview.review.id, reply);
            setReplyModalOpen(false);
            setReplyingToReview(null);
        }
    };
    
    if (!currentPublicUser) return null;

    return (
        <div className="animate-fade-in" dir="rtl">
            <PageBanner
                title="إدارة أعمالي"
                subtitle={`مرحباً ${currentPublicUser?.name}, هنا يمكنك إدارة خدماتك وعروضك.`}
                icon={<BuildingStorefrontIcon className="w-12 h-12 text-green-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-4xl mx-auto space-y-12">
                    
                    {/* My Services */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><BuildingStorefrontIcon className="w-7 h-7"/>خدماتي</h2>
                        <div className="space-y-4">
                             {myServices.length > 0 ? myServices.map(service => (
                                <div key={service.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{service.name}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <StarIcon className="w-4 h-4 text-yellow-400"/> {service.rating.toFixed(1)}
                                            <span className="mx-1">|</span>
                                            <ChatBubbleOvalLeftIcon className="w-4 h-4"/> {service.reviews.length} تقييم
                                        </div>
                                    </div>
                                    <Link to={`/service/${service.id}`} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-semibold rounded-md hover:bg-slate-200">عرض</Link>
                                </div>
                             )) : <EmptyState icon={<BuildingStorefrontIcon className="w-12 h-12 text-slate-400"/>} title="لا توجد خدمات" message="لم يتم ربط أي خدمات بحسابك. يرجى التواصل مع الإدارة."/>}
                        </div>
                    </section>

                    {/* My Offers */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><TagIcon className="w-7 h-7"/>عروضي الحصرية</h2>
                            <button onClick={() => handleOpenOfferForm(null)} className="flex items-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600"><PlusIcon className="w-5 h-5"/>إضافة عرض</button>
                        </div>
                         <div className="space-y-4">
                             {myOffers.length > 0 ? myOffers.map(offer => (
                                 <div key={offer.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 justify-between">
                                    <div className="flex gap-4">
                                        <img src={offer.imageUrl} alt={offer.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                        <div>
                                            <p className="font-bold">{offer.title}</p>
                                            <p className="text-sm text-gray-500">للخدمة: {services.find(s=> s.id === offer.serviceId)?.name}</p>
                                            <p className="text-xs text-gray-400">تنتهي في: {offer.endDate}</p>
                                             {offer.status === 'rejected' && <p className="text-xs text-red-500">السبب: {offer.rejectionReason}</p>}
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2">
                                        <StatusBadge status={offer.status} />
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenOfferForm(offer)} className="p-2 text-blue-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><PencilSquareIcon className="w-5 h-5"/></button>
                                            <button onClick={() => handleDeleteOffer(offer.id)} className="p-2 text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                    </div>
                                </div>
                             )) : <EmptyState icon={<TagIcon className="w-12 h-12 text-slate-400"/>} title="لا توجد عروض" message="ابدأ بإضافة أول عرض حصري لجذب المزيد من العملاء."/>}
                        </div>
                    </section>

                    {/* My Reviews */}
                    <section>
                         <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><ChatBubbleOvalLeftIcon className="w-7 h-7"/>أحدث التقييمات</h2>
                         <div className="space-y-4">
                            {myReviews.length > 0 ? myReviews.map(review => (
                                <div key={review.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{review.username} <span className="font-normal text-sm text-gray-500">على "{review.serviceName}"</span></p>
                                            <div className="flex items-center gap-1 text-sm"><StarIcon className="w-4 h-4 text-yellow-400"/> {review.rating}/5</div>
                                        </div>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                                    {review.adminReply ? (
                                        <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-500 border-r-2 border-cyan-500 pr-2">ردك: {review.adminReply}</p>
                                    ) : (
                                        <button onClick={() => handleOpenReplyForm(review, review.serviceId)} className="mt-3 flex items-center gap-1 text-sm text-cyan-600 font-semibold hover:underline">
                                            <ChatBubbleLeftRightIcon className="w-4 h-4"/>
                                            أضف رداً
                                        </button>
                                    )}
                                </div>
                            )) : <EmptyState icon={<ChatBubbleOvalLeftIcon className="w-12 h-12 text-slate-400"/>} title="لا توجد تقييمات" message="عندما يضيف العملاء تقييمات لخدماتك، ستظهر هنا."/>}
                         </div>
                    </section>
                </div>
            </div>
            
            <Modal isOpen={isOfferModalOpen} onClose={() => setOfferModalOpen(false)} title={editingOffer ? "تعديل العرض" : "إضافة عرض جديد"}>
                <OfferForm onClose={() => setOfferModalOpen(false)} onSave={handleSaveOffer} services={myServices} offer={editingOffer} />
            </Modal>
            
            {replyingToReview && (
                <Modal isOpen={isReplyModalOpen} onClose={() => setReplyModalOpen(false)} title={`الرد على تقييم ${replyingToReview.review.username}`}>
                    <ReplyForm review={replyingToReview.review} onSave={handleSaveReply} onClose={() => setReplyModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
};

export default MyBusinessPage;