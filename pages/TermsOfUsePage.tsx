import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeftIcon, DocumentDuplicateIcon, ScaleIcon, KeyIcon, NoSymbolIcon, UserCircleIcon, PhoneIcon } from '../components/common/Icons';

const TermsOfUsePage: React.FC = () => {
    const navigate = useNavigate();
    const { publicPagesContent } = useData();
    const content = publicPagesContent.terms;

    const getSectionIcon = (title: string): React.ReactNode => {
        const lowerCaseTitle = title.toLowerCase();
        if (lowerCaseTitle.includes('ملكية') || lowerCaseTitle.includes('intellectual')) {
            return <KeyIcon className="w-6 h-6 text-cyan-500" />;
        }
        if (lowerCaseTitle.includes('محظور') || lowerCaseTitle.includes('prohibited')) {
            return <NoSymbolIcon className="w-6 h-6 text-cyan-500" />;
        }
        if (lowerCaseTitle.includes('قانون') || lowerCaseTitle.includes('law')) {
            return <ScaleIcon className="w-6 h-6 text-cyan-500" />;
        }
         if (lowerCaseTitle.includes('حسابات') || lowerCaseTitle.includes('accounts')) {
            return <UserCircleIcon className="w-6 h-6 text-cyan-500" />;
        }
        if (lowerCaseTitle.includes('اتصل') || lowerCaseTitle.includes('contact')) {
            return <PhoneIcon className="w-6 h-6 text-cyan-500" />;
        }
        return <DocumentDuplicateIcon className="w-6 h-6 text-cyan-500" />;
    }

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            window.history.pushState(null, '', `#${targetId}`);
        }
    };

    return (
        <div className="animate-fade-in py-10 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>العودة</span>
                </button>
                <div className="md:grid md:grid-cols-4 md:gap-8">
                    <div className="md:col-span-3">
                        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <div className="text-center mb-8">
                                <div className="inline-block p-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-full">
                                    <ScaleIcon className="w-12 h-12 text-cyan-500" />
                                </div>
                                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">{content.title}</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">آخر تحديث: {content.lastUpdated}</p>
                            </div>

                            <div className="space-y-6">
                            {content.sections.map((section, index) => (
                                    <div key={index} id={`terms-section-${index}`} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-6 scroll-mt-20">
                                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
                                            {getSectionIcon(section.title)}
                                            <span>{section.title}</span>
                                        </h2>
                                        <div className="prose dark:prose-invert max-w-none text-right leading-relaxed text-gray-600 dark:text-gray-300">
                                            {section.content.map((item, itemIndex) => {
                                                if (typeof item === 'string') {
                                                    return <p key={itemIndex} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                                                } else if (item.list) {
                                                    return (
                                                        <ul key={itemIndex} className="space-y-1">
                                                            {item.list.map((li, liIndex) => <li key={liIndex}>{li}</li>)}
                                                        </ul>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <aside className="hidden md:block md:col-span-1">
                        <nav className="sticky top-24">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-3">المحتويات</h3>
                            <ul className="space-y-2 border-r-2 border-slate-200 dark:border-slate-700 pr-4">
                                {content.sections.map((section, index) => (
                                    <li key={index}>
                                        <a href={`#terms-section-${index}`} onClick={(e) => handleNavClick(e, `terms-section-${index}`)} className="block text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-500 hover:border-cyan-500 dark:hover:border-cyan-400 py-1 transition-colors">
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;