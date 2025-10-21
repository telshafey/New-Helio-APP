import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon } from './Icons';

const breadcrumbNameMap: { [key: string]: string } = {
  'services': 'الخدمات',
  'services-overview': 'هيكل الخدمات',
  'properties': 'إدارة العقارات',
  'emergency': 'إدارة الطوارئ',
  'users': 'المستخدمون',
  'news': 'أخبار المدينة',
  'notifications': 'إدارة الإشعارات',
  'advertisements': 'إدارة الإعلانات',
  'transportation': 'إدارة النقل',
  'city-services-guide': 'خدمات جهاز المدينة',
  'privacy-policy': 'سياسة الخصوصية',
  'reports': 'التقارير',
  'about-city': 'عن هليوبوليس الجديدة',
  'about-company': 'عن الشركة المالكة',
  'subcategory': 'فئة فرعية',
  'detail': 'تفاصيل',
  'reviews': 'إدارة التقييمات',
  'audit-log': 'سجل التدقيق',
  'content-management': 'إدارة المحتوى',
  'community-management': 'إدارة المجتمع',
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames[0] === 'admin-login') return null;

    return (
        <nav className="mb-6 flex items-center space-x-2 rtl:space-x-reverse text-sm font-sans" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex items-center gap-2">
                <HomeIcon className="w-5 h-5" />
                <span>الرئيسية</span>
            </Link>
            
            {pathnames.length > 0 && <span className="text-gray-400">/</span>}

            {pathnames.map((value, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                
                if (!isNaN(Number(value))) {
                    return null;
                }

                const displayName = breadcrumbNameMap[value as keyof typeof breadcrumbNameMap] || value.charAt(0).toUpperCase() + value.slice(1);

                return (
                    <React.Fragment key={to}>
                        {isLast ? (
                            <span className="font-semibold text-gray-700 dark:text-gray-200" aria-current="page">
                                {displayName}
                            </span>
                        ) : (
                            <Link to={to} className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                                {displayName}
                            </Link>
                        )}
                        {!isLast && pathnames[index+1] && isNaN(Number(pathnames[index+1])) && <span className="mx-2 text-gray-400">/</span>}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;