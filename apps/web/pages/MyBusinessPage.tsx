import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useServices } from '../context/ServicesContext';
import { useCommunity } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Replaced missing ChatBubbleLeftRightIcon with ChatBubbleOvalLeftIcon
import { BuildingStorefrontIcon, TagIcon, ChatBubbleOvalLeftIcon, StarIcon, PlusIcon, PencilSquareIcon, TrashIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';
// FIX: Corrected import path for types from the shared logic package.
import type { ExclusiveOffer, Service, Review, ListingStatus } from '../../packages/shared-logic/src/types';
import Modal from '../components/common/Modal';
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
    const { offers, handleDeleteOffer } = useCommunity();
    const navigate = useNavigate();

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
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><BuildingStorefrontIcon className="w-7 h-7"/>