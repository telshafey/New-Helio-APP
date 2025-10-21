import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, BellIcon, UserCircleIcon, SunIcon, Cog6ToothIcon, MoonIcon, ComputerDesktopIcon } from '../components/common/Icons';
import { useUI } from '../context/UIContext';
import type { Theme } from '../types';

type Tab = 'general' | 'notifications' | 'account' | 'appearance';

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('general');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'account':
                return <AccountSettings />;
            case 'appearance':
                return <AppearanceSettings />;
            default:
                return null;
        }
    };

    const TabButton: React.FC<{ tab: Tab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-right rounded-lg transition-colors ${
                activeTab === tab 
                ? 'bg-cyan-500 text-white shadow' 
                : 'hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            {icon}
            <span className="font-semibold">{label}</span>
        </button>
    );

    return (
        <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة إلى لوحة التحكم</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">الإعدادات</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs Navigation */}
                <div className="lg:w-1/4">
                    <div className="space-y-2">
                        <TabButton tab="general" label="عام" icon={<Cog6ToothIcon className="w-6 h-6" />} />
                        <TabButton tab="notifications" label="الإشعارات" icon={<BellIcon className="w-6 h-6" />} />
                        <TabButton tab="account" label="الحساب" icon={<UserCircleIcon className="w-6 h-6" />} />
                        <TabButton tab="appearance" label="المظهر" icon={<SunIcon className="w-6 h-6" />} />
                    </div>
                </div>

                {/* Tab Content */}
                <div className="lg:w-3/4">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormRow: React.FC<{ label: string; children: React.ReactNode; description?: string; }> = ({ label, children, description }) => (
    <div className="py-4 border-b border-slate-200 dark:border-slate-700 sm:grid sm:grid-cols-3 sm:gap-4">
        <div className="sm:col-span-1">
            <label className="text-base font-medium text-gray-900 dark:text-white">{label}</label>
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        <div className="mt-2 sm:mt-0 sm:col-span-2">{children}</div>
    </div>
);

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (e: boolean) => void }> = ({ enabled, setEnabled }) => (
    <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`${enabled ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
    >
        <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}/>
    </button>
);


const GeneralSettings = () => (
    <div>
        <h2 className="text-2xl font-bold mb-6">الإعدادات العامة</h2>
        <FormRow label="اسم التطبيق">
            <input type="text" defaultValue="تطبيق هيليو" className="w-full max-w-md bg-slate-100 dark:bg-slate-700 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
        </FormRow>
        <FormRow label="المنطقة الزمنية">
            <select className="w-full max-w-md bg-slate-100 dark:bg-slate-700 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                <option>Africa/Cairo (UTC+2)</option>
                <option>Asia/Riyadh (UTC+3)</option>
            </select>
        </FormRow>
    </div>
);

const NotificationSettings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">إعدادات الإشعارات</h2>
            <FormRow label="إشعارات البريد الإلكتروني" description="تلقي ملخصات وتقارير عبر البريد الإلكتروني.">
                <ToggleSwitch enabled={emailNotifications} setEnabled={setEmailNotifications} />
            </FormRow>
             <FormRow label="إشعارات لحظية" description="تلقي تنبيهات فورية على لوحة التحكم.">
                 <ToggleSwitch enabled={pushNotifications} setEnabled={setPushNotifications} />
            </FormRow>
        </div>
    );
};

const AccountSettings = () => (
    <div>
        <h2 className="text-2xl font-bold mb-6">إعدادات الحساب</h2>
        <FormRow label="البريد الإلكتروني">
             <input type="email" defaultValue="admin@helio.com" className="w-full max-w-md bg-slate-100 dark:bg-slate-700 rounded-md p-2 border border-transparent focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
        </FormRow>
        <FormRow label="كلمة المرور">
            <button className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600">
                تغيير كلمة المرور
            </button>
        </FormRow>
    </div>
);

const AppearanceSettings = () => {
    const { theme, setTheme } = useUI();

    const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
        { value: 'light', label: 'فاتح', icon: <SunIcon className="w-5 h-5"/> },
        { value: 'dark', label: 'داكن', icon: <MoonIcon className="w-5 h-5"/> },
        { value: 'system', label: 'النظام', icon: <ComputerDesktopIcon className="w-5 h-5"/> },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">المظهر</h2>
            <FormRow label="وضع المظهر" description="اختر المظهر المفضل لواجهة التحكم.">
                 <div className="bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg flex gap-1 max-w-xs">
                    {options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setTheme(option.value)}
                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                                theme === option.value 
                                ? 'bg-white dark:bg-slate-800 shadow text-cyan-500' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                        >
                            {option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            </FormRow>
        </div>
    );
};

export default SettingsPage;