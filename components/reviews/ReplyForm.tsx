import React, { useState } from 'react';
// FIX: Corrected import path for types from the shared logic package.
import type { Review } from '../../packages/shared-logic/src/types';

const ReplyForm: React.FC<{ review: Review; onSave: (reply: string) => void; onClose: () => void; }> = ({ review, onSave, onClose }) => {
    const [reply, setReply] = useState(review.adminReply || '');
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(reply); };
    return (
        <form onSubmit={handleSubmit}>
            <textarea value={reply} onChange={e => setReply(e.target.value)} required rows={5} className="w-full bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="اكتب ردك هنا..."></textarea>
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ الرد</button>
            </div>
        </form>
    );
};

export default ReplyForm;