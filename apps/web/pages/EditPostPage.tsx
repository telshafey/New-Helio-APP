import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunity } from '@helio/shared-logic';
import type { PostCategory } from '@helio/shared-logic';
import { TrashIcon, PlusIcon, ArrowLeftIcon } from '../components/common/Icons';
import Spinner from '../components/common/Spinner';

const EditPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const { posts, editPost } = useCommunity();
    const post = posts.find(p => p.id === Number(postId));

    const [category, setCategory] = useState<PostCategory>('نقاش');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

    useEffect(() => {
        if (post) {
            setCategory(post.category);
            setTitle(post.title || '');
            setContent(post.content);
            setPollOptions(post.pollOptions?.map(opt => opt.option) || ['', '']);
        }
    }, [post]);

    const handlePollOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => setPollOptions([...pollOptions, '']);
    const removePollOption = (index: number) => setPollOptions(pollOptions.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;
        if (!content.trim() && category !== 'استطلاع رأي') return;
        if (!title.trim() && category === 'استطلاع رأي') return;

        let postData: any = { 
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
            // Preserve existing votes if possible, or reset them. For simplicity, reset.
            postData.pollOptions = validOptions.map(opt => ({ option: opt, votes: [] }));
        } else {
            postData.pollOptions = undefined;
        }

        editPost(post.id, postData);
        navigate(-1);
    };
    
    if (!post) {
        return <Spinner />;
    }
    
    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            <div className="max-w-2xl mx-auto">
                 <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span>العودة</span>
                </button>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">تعديل المنشور</h1>
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
                            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">حفظ التعديلات</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostPage;