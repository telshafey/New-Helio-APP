import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServicesContext';
import { useProperties } from '../context/PropertiesContext';
import { useNews } from '../context/NewsContext';
import { ArrowLeftIcon, StarIcon, EyeIcon, ChatBubbleOvalLeftIcon, WrenchScrewdriverIcon, ChartPieIcon, ChartBarIcon, HomeModernIcon, NewspaperIcon, MagnifyingGlassIcon, StarIconOutline, ArrowTrendingUpIcon } from '../components/common/Icons';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Service, Property, News, Category } from '../types';

const KpiCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 rtl:space-x-reverse">
        <div className="p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; icon: React.ReactNode }> = ({ active, onClick, children, icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-md transition-colors focus:outline-none text-sm ${
            active
                ? 'bg-cyan-500 text-white shadow'
                : 'bg-slate-200/50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
        {icon}
        {children}
    </button>
);

const ServiceReports: React.FC<{ data: Service[]; categories: Category[] }> = ({ data, categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<number>(0); // 0 for 'All'
    
    const filteredData = useMemo(() => {
        if (categoryFilter === 0) return data;
        const subCategoryIds = categories.find(c => c.id === categoryFilter)?.subCategories.map(sc => sc.id) || [];
        return data.filter(s => subCategoryIds.includes(s.subCategoryId));
    }, [data, categoryFilter, categories]);

    const kpiData = useMemo(() => {
        if (filteredData.length === 0) return { total: 0, avgRating: 'N/A', totalReviews: 0, topFav: 'N/A' };
        const total = filteredData.length;
        const servicesWithReviews = filteredData.filter(s => s.reviews.length > 0);
        const avgRating = servicesWithReviews.length > 0 ? (servicesWithReviews.reduce((acc, s) => acc + s.rating, 0) / servicesWithReviews.length).toFixed(1) : '0.0';
        const totalReviews = filteredData.reduce((acc, s) => acc + s.reviews.length, 0);
        const topFav = [...filteredData].filter(s => s.isFavorite).sort((a,b) => b.rating - a.rating)[0]?.name || 'لا يوجد';
        return { total, avgRating, totalReviews, topFav };
    }, [filteredData]);

    const topRated = useMemo(() => [...filteredData].sort((a, b) => b.rating - a.rating).slice(0, 5).map(s => ({ name: s.name, التقييم: s.rating })), [filteredData]);
    const mostViewed = useMemo(() => [...filteredData].sort((a, b) => b.views - a.views).slice(0, 5).map(s => ({ name: s.name, المشاهدات: s.views })), [filteredData]);

    const searchedData = useMemo(() => {
        if (!searchTerm) return filteredData;
        return filteredData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [filteredData, searchTerm]);

    const Rating: React.FC<{ rating: number }> = ({ rating }) => (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-4 h-4 ${ i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }`} />
            ))}
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="إجمالي الخدمات" value={kpiData.total} icon={<WrenchScrewdriverIcon className="w-6 h-6 text-cyan-500"/>} />
                <KpiCard title="متوسط التقييم" value={kpiData.avgRating} icon={<StarIcon className="w-6 h-6 text-yellow-500"/>} />
                <KpiCard title="إجمالي التقييمات" value={kpiData.totalReviews} icon={<ChatBubbleOvalLeftIcon className="w-6 h-6 text-purple-500"/>} />
                <KpiCard title="الأكثر تفضيلاً" value={kpiData.topFav} icon={<EyeIcon className="w-6 h-6 text-pink-500"/>} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                     <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">الخدمات الأعلى تقييماً</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topRated} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                            <XAxis type="number" stroke="#9ca3af" />
                            <YAxis type="category" dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} width={80} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Bar dataKey="التقييم" fill="#06b6d4" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">الخدمات الأكثر مشاهدة</h3>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={mostViewed} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                            <XAxis type="number" stroke="#9ca3af" />
                            <YAxis type="category" dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} width={80} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                            <Bar dataKey="المشاهدات" fill="#8b5cf6" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">بيانات الخدمات التفصيلية</h3>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <select value={categoryFilter} onChange={e => setCategoryFilter(Number(e.target.value))} className="w-full sm:w-48 bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
                            <option value="0">كل الفئات</option>
                            {categories.filter(c => c.name !== "المدينة والجهاز").map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <div className="relative w-full sm:w-auto">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
                            <input type="text" placeholder="بحث في الخدمات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-64 bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"/>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">الخدمة</th>
                                <th scope="col" className="px-6 py-3">التقييم</th>
                                <th scope="col" className="px-6 py-3">المراجعات</th>
                                <th scope="col" className="px-6 py-3">المشاهدات</th>
                                <th scope="col" className="px-6 py-3">مفضلة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedData.map(service => (
                                <tr key={service.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{service.name}</td>
                                    <td className="px-6 py-4"><Rating rating={service.rating} /></td>
                                    <td className="px-6 py-4">{service.reviews.length}</td>
                                    <td className="px-6 py-4">{service.views}</td>
                                    <td className="px-6 py-4 text-center">{service.isFavorite ? <StarIcon className="w-5 h-5 text-yellow-400"/> : <StarIconOutline className="w-5 h-5 text-gray-400"/>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {searchedData.length === 0 && <div className="text-center py-8 text-gray-500 dark:text-gray-400">لا توجد بيانات تطابق البحث.</div>}
                </div>
            </div>
        </div>
    );
};

const PropertyReports: React.FC<{ data: Property[] }> = ({ data }) => {
     const [searchTerm, setSearchTerm] = useState('');
    const kpiData = useMemo(() => {
        const total = data.length;
        const forSale = data.filter(p => p.type === 'sale');
        const forRent = data.filter(p => p.type === 'rent');
        const avgSalePrice = forSale.length > 0 ? (forSale.reduce((acc, p) => acc + p.price, 0) / forSale.length).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }) : 'N/A';
        const avgRentPrice = forRent.length > 0 ? (forRent.reduce((acc, p) => acc + p.price, 0) / forRent.length).toLocaleString('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }) : 'N/A';
        return { total, avgSalePrice, avgRentPrice };
    }, [data]);

    const propertyTypes = useMemo(() => [
        { name: 'للبيع', value: data.filter(p => p.type === 'sale').length },
        { name: 'للإيجار', value: data.filter(p => p.type === 'rent').length },
    ], [data]);
    
    const searchedData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [data, searchTerm]);

    const TypeBadge: React.FC<{ type: 'sale' | 'rent' }> = ({ type }) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${ type === 'sale' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}>
            {type === 'sale' ? 'بيع' : 'إيجار'}
        </span>
    );

    return (
         <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <KpiCard title="إجمالي العقارات" value={kpiData.total} icon={<HomeModernIcon className="w-6 h-6 text-amber-500"/>} />
                <KpiCard title="متوسط سعر البيع" value={kpiData.avgSalePrice} icon={<ChartBarIcon className="w-6 h-6 text-green-500"/>} />
                <KpiCard title="متوسط سعر الإيجار" value={kpiData.avgRentPrice} icon={<ChartBarIcon className="w-6 h-6 text-indigo-500"/>} />
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">توزيع أنواع العقارات</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={propertyTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            <Cell fill="#06b6d4" />
                            <Cell fill="#8b5cf6" />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">بيانات العقارات التفصيلية</h3>
                    <div className="relative w-full sm:w-auto">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
                        <input type="text" placeholder="بحث في العقارات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-64 bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"/>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">العنوان</th>
                                <th scope="col" className="px-6 py-3">النوع</th>
                                <th scope="col" className="px-6 py-3">السعر</th>
                                <th scope="col" className="px-6 py-3">المشاهدات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedData.map(prop => (
                                <tr key={prop.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{prop.title}</td>
                                    <td className="px-6 py-4"><TypeBadge type={prop.type} /></td>
                                    <td className="px-6 py-4">{prop.price.toLocaleString('ar-EG')} جنيه</td>
                                    <td className="px-6 py-4">{prop.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {searchedData.length === 0 && <div className="text-center py-8 text-gray-500 dark:text-gray-400">لا توجد بيانات تطابق البحث.</div>}
                </div>
            </div>
        </div>
    );
};


const NewsReports: React.FC<{ data: News[] }> = ({ data }) => {
    const kpiData = useMemo(() => {
        const total = data.length;
        const totalViews = data.reduce((acc, n) => acc + n.views, 0);
        const avgViews = total > 0 ? (totalViews / total).toFixed(0) : '0';
        const mostViewed = [...data].sort((a,b) => b.views - a.views)[0]?.title || 'N/A';
        return { total, totalViews, avgViews, mostViewed };
    }, [data]);

    const topViewed = useMemo(() => [...data].sort((a, b) => b.views - a.views).slice(0, 5).map(n => ({ name: n.title, المشاهدات: n.views })), [data]);

    return (
         <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="إجمالي الأخبار" value={kpiData.total} icon={<NewspaperIcon className="w-6 h-6 text-indigo-500"/>} />
                <KpiCard title="إجمالي المشاهدات" value={kpiData.totalViews.toLocaleString()} icon={<EyeIcon className="w-6 h-6 text-pink-500"/>} />
                <KpiCard title="متوسط المشاهدات" value={kpiData.avgViews} icon={<ChartBarIcon className="w-6 h-6 text-green-500"/>} />
                <KpiCard title="الخبر الأكثر مشاهدة" value={kpiData.mostViewed} icon={<ArrowTrendingUpIcon className="w-6 h-6 text-red-500"/>} />
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">الأخبار الأكثر مشاهدة</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topViewed} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0}/>
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '0.5rem' }}/>
                        <Bar dataKey="المشاهدات" fill="#ec4899" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                 <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">بيانات الأخبار التفصيلية</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">العنوان</th>
                                <th scope="col" className="px-6 py-3">الكاتب</th>
                                <th scope="col" className="px-6 py-3">التاريخ</th>
                                <th scope="col" className="px-6 py-3">المشاهدات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.title}</td>
                                    <td className="px-6 py-4">{item.author}</td>
                                    <td className="px-6 py-4">{item.date}</td>
                                    <td className="px-6 py-4">{item.views.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const ReportsPage: React.FC = () => {
    const navigate = useNavigate();
    const { news } = useNews();
    const { properties } = useProperties();
    const { services, categories } = useServices();
    const [activeTab, setActiveTab] = useState<'services' | 'properties' | 'news'>('services');

    const renderContent = () => {
        switch (activeTab) {
            case 'services':
                return <ServiceReports data={services} categories={categories} />;
            case 'properties':
                return <PropertyReports data={properties} />;
            case 'news':
                return <NewsReports data={news} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="animate-fade-in">
             <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">التقارير والإحصائيات</h1>
            <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                <TabButton active={activeTab === 'services'} onClick={() => setActiveTab('services')} icon={<WrenchScrewdriverIcon className="w-5 h-5" />}>الخدمات</TabButton>
                <TabButton active={activeTab === 'properties'} onClick={() => setActiveTab('properties')} icon={<HomeModernIcon className="w-5 h-5" />}>العقارات</TabButton>
                <TabButton active={activeTab === 'news'} onClick={() => setActiveTab('news')} icon={<NewspaperIcon className="w-5 h-5" />}>الأخبار</TabButton>
            </div>
            
            {renderContent()}
        </div>
    );
};

export default ReportsPage;