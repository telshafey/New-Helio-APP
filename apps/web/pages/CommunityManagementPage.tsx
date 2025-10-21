import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../packages/shared-logic/context/UsersContext';
import { 
    ArrowLeftIcon, TrashIcon, ChatBubbleOvalLeftEllipsisIcon, PinIcon, 
    ChatBubbleOvalLeftIcon, UserCircleIcon, XMarkIcon, HandThumbUpIcon, PencilSquareIcon, PlusIcon
} from '../components/common/Icons';
import EmptyState from '../components/common/EmptyState';
import KpiCard from '../components/common/KpiCard';
import type { Post, Comment, AppUser, PostCategory, Circle } from '../../packages/shared-logic/types';
import Modal from '../components/common/Modal';
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
                                <button onClick={() => onDeleteComment(post.id, comment.id)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(comment.date).toLocaleDateString()}</p>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                    </div>
                )) : (
                    <p className="text-center py-8 text-gray-500">لا توجد تعليقات على هذا المنشور.</p>
                )}
            </div>
        </Modal>
    );
};

const EditPostForm: React.FC<{ 
    post: Post; 
    onClose: () => void;
    onSave: (postId: number, data: Omit<Post, 'id' | 'date' | 'userId' | 'username' | 'avatar' | 'likes' | 'comments' | 'isPinned'>) => void;
}> = ({ post, onClose, onSave }) => {
    const [category, setCategory] = useState<PostCategory>(post.category);
    const [title, setTitle] = useState(post.title || '');
    const [content, setContent] = useState(post.content);
    const [pollOptions, setPollOptions] = useState(post.pollOptions?.map(opt => opt.option) || ['', '']);

    useEffect(() => {
        if (category !== 'استطلاع رأي') {
            setPollOptions(['', '']);
        } else if (post.category !== 'استطلاع رأي') {
            setPollOptions(['', '']);
        }
    }, [category, post.category]);

    const handlePollOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => setPollOptions([...pollOptions, '']);
    const removePollOption = (index: number) => setPollOptions(pollOptions.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && category !== 'استطلاع رأي') return;
        if (!title.trim() && category === 'استطلاع رأي') return;

        let postData: Omit<Post, 'id' | 'date' | 'userId' | 'username' | 'avatar' | 'likes' | 'comments'| 'isPinned'> = { 
            category, 
            title: title.trim() || undefined, 
            content,
            circleId: post.circleId,
        };

        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => opt.trim()).filter(Boolean);
            if (validOptions.length < 2) {
                alert('يجب أن يحتوي الاستطلاع على خيارين على الأقل.');
                return;
            }
            postData.pollOptions = validOptions.map(opt => ({ option: opt, votes: [] }));
        } else {
            postData.pollOptions = undefined;
        }

        onSave(post.id, postData);
        onClose();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">الفئة</label>
                <select value={category} onChange={e => setCategory(e.target.value as PostCategory)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2">
                    {postCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{category === 'استطلاع رأي' ? 'السؤال الرئيسي للاستطلاع' : 'العنوان (اختياري)'}</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={category === 'استطلاع رأي' ? 'ما هو سؤالك؟' : 'مثال: تجمع ملاك الحي الأول'} required={category === 'استطلاع رأي'} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">المحتوى</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} required={category !== 'استطلاع رأي'} rows={4} placeholder="اكتب ما يدور في ذهنك..." className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2"></textarea>
            </div>
            
            {category === 'استطلاع رأي' && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium">خيارات الاستطلاع</label>
                    {pollOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="text" value={option} onChange={e => handlePollOptionChange(index, e.target.value)} placeholder={`خيار ${index + 1}`} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
                            {pollOptions.length > 2 && <button type="button" onClick={() => removePollOption(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4"/></button>}
                        </div>
                    ))}
                    {pollOptions.length < 10 && <button type="button" onClick={addPollOption} className="text-sm text-cyan-600 font-semibold flex items-center gap-1"><PlusIcon className="w-4 h-4"/>إضافة خيار</button>}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">حفظ التعديلات</button>
            </div>
        </form>
    );
};


const CommunityManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const { users } = useUsers();
    const { posts, circles, deletePost, deleteComment, togglePinPost, editPost } = useCommunity();
    const [commentPost, setCommentPost] = useState<Post | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const communityStats = useMemo(() => {
        const totalPosts = posts.length;
        const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);
        
        const activityMap = new Map<number, number>();
        posts.forEach(post => {
            activityMap.set(post.userId, (activityMap.get(post.userId) || 0) + 1);
            post.comments.forEach(comment => {
                activityMap.set(comment.userId, (activityMap.get(comment.userId) || 0) + 1);
            });
        });

        let mostActiveUserId: number | null = null;
        let maxActivity = 0;
        activityMap.forEach((activity, userId) => {
            if (activity > maxActivity) {
                maxActivity = activity;
                mostActiveUserId = userId;
            }
        });

        const mostActiveUser = users.find(u => u.id === mostActiveUserId);

        return { totalPosts, totalComments, mostActiveUser };
    }, [posts, users]);

    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [posts]);


    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5"/>
                <span>العودة</span>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8"/>
                    إدارة المجتمع
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    