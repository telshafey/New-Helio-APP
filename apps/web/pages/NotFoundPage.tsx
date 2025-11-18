import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '../components/common/Icons';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 px-4 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full"
            >
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">الصفحة غير موجودة</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    عذراً، الصفحة التي تبحث عنها قد تكون نُقلت أو حُذفت أو الرابط الذي استخدمته غير صحيح.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-semibold"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>العودة للخلف</span>
                    </button>
                    
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-semibold shadow-lg shadow-cyan-500/30"
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>الرئيسية</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;