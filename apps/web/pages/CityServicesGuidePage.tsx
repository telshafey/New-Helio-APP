
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeftIcon, PlusIcon, PencilSquareIcon, TrashIcon, 
    ChevronDownIcon, DocumentDuplicateIcon 
} from '../components/common/Icons';
import type { ServiceGuide } from '@helio/shared-logic';
import { useData, useAuth } from '@helio/shared-logic';
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
    );
};


const CityServicesGuidePage: React.FC = () => {
    const navigate = useNavigate();
    const { serviceGuides, handleSaveServiceGuide, handleDeleteServiceGuide } = useData();
    const { hasPermission } = useAuth();
    const canManage = hasPermission(['مسؤول ادارة الخدمات']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGuide, setEditingGuide] = useState<ServiceGuide | null>(null);
    const [openGuideId, setOpenGuideId] = useState<number | null>(null);

    const handleAddClick = () => {
        setEditingGuide(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (guide: ServiceGuide) => {
        setEditingGuide(guide);
        setIsModalOpen(true);
    };

    const handleToggleGuide = (id: number) => {
        setOpenGuideId(openGuideId === id ? null : id);
    };
    
    return (
        <div className="animate-fade-in">
             <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة</span>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <DocumentDuplicateIcon className="w-8 h-8 text-sky-500" />
                        دليل خدمات جهاز المدينة
                    </h1>
                    {canManage && (
                        <button onClick={handleAddClick} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            <span>إضافة دليل جديد</span>
                        </button>
                    )}
                </div>

                {serviceGuides.length > 0 ? (
                    <div className="space-y-4">
                        {serviceGuides.map(guide => (
                            <div key={guide.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/30">
                                    <button onClick={() => handleToggleGuide(guide.id)} className="flex-1 text-right flex justify-between items-center">
                                        <span className="font-semibold text-lg text-gray-800 dark:text-white">{guide.title}</span>
                                        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${openGuideId === guide.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {canManage && (
                                        <div className="flex items-center gap-2 mr-4">
                                            <button onClick={() => handleEditClick(guide)} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md"><PencilSquareIcon className="w-5 h-5" /></button>
                                            <button onClick={() => handleDeleteServiceGuide(guide.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md"><TrashIcon className="w-5 h-5" /></button>
                                        </div>
                                    )}
                                </div>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openGuideId === guide.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-800">
                                        <div>
                                            <h3 className="text-md font-bold mb-3 text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500/30 pb-2 inline-block">خطوات التقديم</h3>
                                            <ul className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-300 text-sm">
                                                {guide.steps.map((step, i) => <li key={i}>{step}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-bold mb-3 text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500/30 pb-2 inline-block">الأوراق المطلوبة</h3>
                                            <ul className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-300 text-sm">
                                                {guide.documents.map((doc, i) => <li key={i}>{doc}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<DocumentDuplicateIcon className="w-16 h-16 text-slate-400" />}
                        title="لا توجد أدلة مضافة"
                        message="ابدأ بإضافة أدلة الخدمات لتسهيل الإجراءات على السكان."
                    />
                )}
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingGuide ? 'تعديل الدليل' : 'إضافة دليل جديد'}
            >
                <GuideForm 
                    onSave={handleSaveServiceGuide}
                    onClose={() => setIsModalOpen(false)}
                    guide={editingGuide}
                />
            </Modal>
        </div>
    );
};

export default CityServicesGuidePage;
