import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Corrected import paths for monorepo structure
import { useUsers } from '../../packages/shared-logic/context/UsersContext';
import { 
    ArrowLeftIcon, TrashIcon, ChatBubbleOvalLeftEllipsisIcon, PinIcon, 
    ChatBubbleOvalLeftIcon, UserCircleIcon, XMarkIcon, HandThumbUpIcon, PencilSquareIcon, PlusIcon
} from '../components/common/Icons';
import EmptyState from '../components/common/EmptyState';
import KpiCard from '../components/common/KpiCard';
// FIX: Corrected import paths for monorepo structure
import type { Post, Comment, AppUser, PostCategory, Circle } from '../../packages/shared-logic/types';
import Modal from '../components/common/Modal';
// FIX: Corrected import paths for monorepo structure
import { useCommunity } from '../../packages/shared-logic/context/AppContext';

const CommentManagementModal: React.FC<{ 
    post: Post | null; 
    onClose: () => void; 
    onDeleteComment: (postId: number, commentId: number) => void;
}> = ({ post, onClose, onDeleteComment }) => {
    if (!post) return null;

    return (
        <Modal isOpen={!!post} onClose={onClose} title={`إدارة التعليقات على: "${post.title || 'منشور'}"`}>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {post.comments.length > 0 ? post.comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <img src={comment.avatar} alt={comment.username} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-gray-800 dark:text-white">{comment.username}</p>
                                <button onClick