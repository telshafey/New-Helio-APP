import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewPostForm from '../components/community/NewPostForm';
import { ArrowLeftIcon } from '../components/common/Icons';

const NewPostPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-500 hover:underline mb-6">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span>العودة إلى المجتمع</span>
                </button>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">إنشاء منشور جديد</h1>
                    <NewPostForm onClose={() => navigate('/community')} />
                </div>
            </div>
        </div>
    );
};

export default NewPostPage;