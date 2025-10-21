import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import KpiCard from '../common/KpiCard';
import { NewspaperIcon, BellAlertIcon, EyeIcon, ArrowTrendingUpIcon, PlusIcon, ChartBarIcon, ChartPieIcon } from '../common/Icons';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatusBadge: React.FC<{ startDate: string, endDate: string }> = ({ startDate, endDate }) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">مجدول</span>;
    } else if (today >= start && today <= end) {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">نشط</span>;
    } else {
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">منتهي</span>;
    }
};

const NewsManagerDashboard: React.FC = () => {
    const { news, notifications, advertisements } = useNews();

    const stats = useMemo(() => {
        // News Stats
        const totalNews = news.length;
        const totalNewsViews = news.reduce((sum, item) => sum + item.views, 0);
        const topViewedNews = [...news].sort((a, b) => b.views - a.views).slice(0, 5);
        const latestNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        // Notifications & Ads Stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalNotifications = notifications.length;
        const activeNotifications = notifications.filter(n => new Date(n.startDate) <= today && new Date(n.endDate) >= today).length;
        const totalAds = advertisements.length;
        const activeAds = advertisements.filter(ad => new Date(ad.startDate) <= today && new Date(ad.endDate) >= today).length;
        
        const notificationStatusData = [
            { name: 'نشطة', value: activeNotifications },
            { name: 'مجدولة', value: notifications.filter(n => new Date(n.startDate) > today).length },
            { name: 'منتهية', value: notifications.filter(n => new Date(n.endDate) < today).length }
        ];

        const latestNotifications = [...notifications].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).slice(0, 5);

        return {
            totalNews,
            totalNewsViews,
            topViewedNews,
            latestNews,
            totalNotifications,
            activeNotifications,
            totalAds,
            activeAds,
            notificationStatusData,
            latestNotifications,
        };
    }, [news, notifications, advertisements]);

    const COLORS = ['#10b981', '#3b82f6', '#ef4444']; // Green, Blue, Red

    return (
        <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="إجمالي الأخبار" value={stats.totalNews.toString()} icon={<NewspaperIcon className="w-8 h-8 text-cyan-400"/>} />
                <KpiCard title="إجمالي المشاهدات" value={stats.totalNewsViews.toLocaleString()} icon={<EyeIcon className="w-8 h-8 text-purple-400"/>} />
                <KpiCard title="الإشعارات (نشطة/إجمالي)" value={`${stats.activeNotifications}/${stats.totalNotifications}`} icon={<BellAlertIcon className="w-8 h-8 text-amber-400"/>} />
                <KpiCard title="الإعلانات (نشطة/إجمالي)" value={`${stats.activeAds}/${stats.totalAds}`} icon={<ArrowTrendingUpIcon className="w-8 h-8 text-lime-400"/>} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2"><ChartBarIcon className="w-6 h-6"/> أكثر 5 أخبار مشاهدة</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.topViewedNews} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                            <XAxis dataKey="title" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Legend />
                            <Bar dataKey="views" name="المشاهدات" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                     <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2"><ChartPieIcon className="w-6 h-6"/> حالة الإشعارات</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={stats.notificationStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {stats.notificationStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">أحدث الأخبار</h3>
                        <Link to="/news" className="text-sm text-cyan-500 hover:underline">إدارة الأخبار</Link>
                    </div>
                    <ul className="space-y-3">
                        {stats.latestNews.map(item => (
                            <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                                </div>
                                <span className="text-sm font-mono text-purple-500">{item.views.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">أحدث الإشعارات</h3>
                        <Link to="/notifications" className="text-sm text-cyan-500 hover:underline">إدارة الإشعارات</Link>
                    </div>
                     <ul className="space-y-3">
                        {stats.latestNotifications.map(item => (
                            <li key={item.id} className="flex justify-between items-center p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">ينتهي في: {item.endDate}</p>
                                </div>
                                <StatusBadge startDate={item.startDate} endDate={item.endDate} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsManagerDashboard;
