import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Review } from '../types';
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon, ChatBubbleLeftRightIcon } from '../components/common/Icons';
import { useServices } from '../context/ServicesContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import Rating from '../components/reviews/Rating';
import ReplyForm from '../components/reviews/ReplyForm';
import EditReviewForm from '../components/reviews/EditReviewForm';


const ServiceDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { serviceId: serviceIdStr } = useParams<{ serviceId: string }>();
    const serviceId = Number(serviceIdStr);
    
    const { services, handleUpdateReview, handleDeleteReview, handleReplyToReview } = useServices();
    const { hasPermission } = useAuth();
    const canManage = hasPermission(['مسؤول ادارة الخدمات']);
    const service = services.find(s => s.id === serviceId);

    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const handleOpenReplyModal = (review: Review) => {
        setSelectedReview(review);
        setReplyModalOpen(true);
    };
    
    const handleOpenEditModal = (review: Review) => {
        setSelectedReview(review);
        setEditModalOpen(true);
    };

    if (!service) return <div>Service not found!</div>;
    
    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة إلى قائمة الخدمات</span>
            </button>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                    <img src={service.images[0]} alt={service.name} className="w-full h-48 sm:h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 p-4 sm:p-6">
                        <h1 className="text-3xl font-bold text-white">{service.name}</h1>
                        <p className="text-gray-200">{service.address}</p>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    <h2 className="text-2xl font-bold mb-6">إدارة التقييمات ({service.reviews.length})</h2>
                    <div className="space-y-6">
                        {service.reviews.map(review => (
                            <div key={review.id} className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                     <div className="flex items-center gap-4">
                                        <img src={review.avatar} alt={review.username} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{review.username}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                                            <Rating rating={review.rating} size="w-4 h-4" />
                                        </div>
                                    </div>
                                    {canManage && (
                                        <div className="flex items-center gap-1 self-end sm:self-center">
                                            <button onClick={() => handleOpenReplyModal(review)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900/50 rounded-md" title="الرد"><ChatBubbleLeftRightIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleOpenEditModal(review)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md" title="تعديل"><PencilSquareIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteReview(service.id, review.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md" title="حذف"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    )}
                                </div>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">{review.comment}</p>
                                {review.adminReply && (
                                    <div className="mt-4 mr-10 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                        <p className="font-bold text-sm text-cyan-600 dark:text-cyan-400">رد المدير:</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{review.adminReply}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedReview && (
                <>
                    <Modal isOpen={isReplyModalOpen} onClose={() => setReplyModalOpen(false)} title={`الرد على تقييم ${selectedReview.username}`}>
                        <ReplyForm review={selectedReview} onClose={() => setReplyModalOpen(false)} onSave={(reply) => { handleReplyToReview(serviceId, selectedReview.id, reply); setReplyModalOpen(false); }} />
                    </Modal>
                    <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title={`تعديل تقييم ${selectedReview.username}`}>
                        <EditReviewForm review={selectedReview} onClose={() => setEditModalOpen(false)} onSave={(comment) => { handleUpdateReview(serviceId, selectedReview.id, comment); setEditModalOpen(false); }} />
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ServiceDetailPage;