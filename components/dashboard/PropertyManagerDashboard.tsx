import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertiesContext';
import KpiCard from '../common/KpiCard';
import { HomeModernIcon, ChartPieIcon, EyeIcon, ArrowTrendingUpIcon, PlusIcon, ChartBarIcon } from '../common/Icons';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PropertyManagerDashboard: React.FC = () => {
    const { properties } = useProperties();

    const stats = useMemo(() => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const total = properties.length;
        const forSale = properties.filter(p => p.type === 'sale').length;
        const forRent = properties.filter(p => p.type === 'rent').length;
        const newLast30Days = properties.filter(p => new Date(p.creationDate) >= thirtyDaysAgo).length;
        const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
        
        const topViewed = [...properties].sort((a,b) => b.views - a.views).slice(0, 5);
        const latestAdded = [...properties].sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice(0, 5);
        
        const typeDistribution = [
            { name: 'للبيع', value: forSale },
            { name: 'للإيجار', value: forRent }
        ];

        return { total, forSale, forRent, newLast30Days, totalViews, topViewed, latestAdded, typeDistribution };
    }, [properties]);

    const COLORS = ['#06b6d4', '#a855f7'];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="إجمالي العقارات" value={stats.total.toString()} icon={<HomeModernIcon className="w-8 h-8 text-cyan-400"/>} />
                <KpiCard title="إجمالي المشاهدات" value={stats.totalViews.toLocaleString()} icon={<EyeIcon className="w-8 h-8 text-purple-400"/>} />
                <KpiCard title="عقارات للبيع/للإيجار" value={`${stats.forSale} / ${stats.forRent}`} icon={<ChartPieIcon className="w-8 h-8 text-amber-400"/>} />
                <KpiCard title="عقارات جديدة (30 يوم)" value={`+${stats.newLast30Days}`} icon={<ArrowTrendingUpIcon className="w-8 h-8 text-lime-400"/>} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2"><ChartBarIcon className="w-6 h-6"/> أكثر 5 عقارات مشاهدة</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.topViewed} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                            <XAxis dataKey="title" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0}/>
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Legend />
                            <Bar dataKey="views" name="المشاهدات" fill="#8b5cf6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                     <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2"><ChartPieIcon className="w-6 h-6"/> توزيع أنواع العقارات</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={stats.typeDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {stats.typeDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Recent Properties & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">أحدث العقارات المضافة</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                           <thead>
                             <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                <th className="p-2 text-right">العنوان</th>
                                <th className="p-2 text-center">النوع</th>
                                <th className="p-2 text-center">التاريخ</th>
                             </tr>
                           </thead>
                           <tbody>
                             {stats.latestAdded.map(prop => (
                                <tr key={prop.id} className="border-t border-slate-200 dark:border-slate-700">
                                   <td className="p-2 font-medium text-gray-800 dark:text-gray-200">{prop.title}</td>
                                   <td className="p-2 text-center">
                                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${prop.type === 'sale' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}>
                                       {prop.type === 'sale' ? 'بيع' : 'إيجار'}
                                     </span>
                                   </td>
                                   <td className="p-2 text-gray-500 dark:text-gray-400 text-center">{prop.creationDate}</td>
                                </tr>
                             ))}
                           </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
                    <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">إجراءات سريعة</h3>
                    <Link to="/properties" className="flex flex-col items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-cyan-600 transition-colors">
                        <PlusIcon className="w-8 h-8"/>
                        <span>إضافة عقار جديد</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PropertyManagerDashboard;