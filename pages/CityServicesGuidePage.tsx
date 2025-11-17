import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeftIcon, PlusIcon, PencilSquareIcon, TrashIcon, 
    ChevronDownIcon, DocumentDuplicateIcon 
} from '../components/common/Icons';
// FIX: Corrected import path for types from the shared logic package.
import type { ServiceGuide } from '../packages/shared-logic/src/types';
// FIX: Corrected import paths for monorepo structure
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';
import AttachmentUploader from '../components/common/AttachmentUploader';
import EmptyState from '../components/common/EmptyState';

const GuideForm: React.FC<{
    onSave: (guide: Omit<ServiceGuide, 'id'> & { id?: number }) => void;
    onClose: () => void;
    guide: (Omit<ServiceGuide, 'id'> & { id?: number }) | null;
}> = ({ onSave, onClose, guide }) => {
    const [title, setTitle] = useState('');
    const [steps, setSteps] = useState('');
    const [documents, setDocuments] = useState('');
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
    const [attachmentType, setAttachmentType] = useState<'image' | 'pdf' | null>(null);

    useEffect(() => {
        if (guide) {
            setTitle(guide.title || '');
            setSteps(guide.steps?.join('\n') || '');
            setDocuments(guide.documents?.join('\n') || '');
            setAttachmentUrl(guide.attachmentUrl || null);
            setAttachmentType(guide.attachmentType || null);
        } else {
            setTitle('');
            setSteps('');
            setDocuments('');
            setAttachmentUrl(null);
            setAttachmentType(null);
        }
    }, [guide]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const stepsArray = steps.split('\n').filter(line => line.trim() !== '');
        const documentsArray = documents.split('\n').filter(line => line.trim() !== '');
        onSave({ 
            id: guide?.id, 
            title, 
            steps: stepsArray, 
            documents: documentsArray,
            attachmentUrl: attachmentUrl || undefined,
            attachmentType: attachmentType || undefined
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">عنوان الخدمة</label>
                <input
                    type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className="w-full bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="steps" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">خطوات التقديم (كل خطوة في سطر)</label>
                <textarea
                    id="steps" value={steps} onChange={(e) => setSteps(e.target.value)} required rows={5}
                    className="w-full bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="documents" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الأوراق المطلوبة (كل مستند في سطر)</label>
                <textarea
                    id="documents" value={documents} onChange={(e) => setDocuments(e.target.value)} required rows={5}
                    className="w-full bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                ></textarea>
            </div>
            
            <AttachmentUploader 
                initialUrl={attachmentUrl || ''}
                initialType={attachmentType || undefined}
                onAttachmentChange={(url, type) => {
                    setAttachmentUrl(url);
                    setAttachmentType(type);
                }}
            />

            <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600">حفظ</button>
            </div>
        </form>
