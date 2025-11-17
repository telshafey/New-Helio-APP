import React, { useState } from 'react';
import { useCommunity } from '../../context/AppContext';
// FIX: Corrected import path for types.
import type { PostCategory } from '../../../packages/shared-logic/src/types';
import { TrashIcon, PlusIcon } from '../common/Icons';

const NewPostForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addPost, circles } = useCommunity();
    const [circleId, setCircleId] = useState<number>(circles[0]?.id || 1);
    const [category, setCategory] = useState<PostCategory>('نقاش');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);

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
        
        let postData: any = { category, title: title.trim() || undefined, content, circleId };
        
        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => ({ option: opt.trim(), votes: [] })).filter(opt => opt.option);
            if (validOptions.length < 2) {
                alert('يجب أن يحتوي الاستطلاع على خيارين على الأقل.');
                return;
            }
            postData.pollOptions = validOptions;
        }

        addPost(postData);
        onClose();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">اختر الدائرة</label>
                <select value={circleId} onChange={e => setCircleId(Number(e.target.value))} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2">
                    {circles.map(circle => (
                        <option key={circle.id} value={circle.id}>{circle.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">نوع المنشور</label>
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
                    <button type="button" onClick={addPollOption} className="text-sm text-cyan-600 font-semibold flex items-center gap-1"><PlusIcon className="w-4 h-4"/>إضافة خيار</button>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">نشر</button>
            </div>
        </form>
    );
};

export default NewPostForm;