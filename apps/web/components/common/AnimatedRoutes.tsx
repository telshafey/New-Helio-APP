import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { lazyWithPrefetch } from './lazyWithPrefetch';

// Lazy-loaded page components with prefetching capability
const EmergencyPage = lazyWithPrefetch(() => import('../../pages/EmergencyPage'));
const PrivacyPolicyPage = lazyWithPrefetch(() => import('../../pages/PrivacyPolicyPage'));
const AboutPage = lazyWithPrefetch(() => import('../../pages/AboutPage'));
const FaqPage = lazyWithPrefetch(() => import('../../pages/FaqPage'));
const TermsOfUsePage = lazyWithPrefetch(() => import('../../pages/TermsOfUsePage'));
const PublicHomePage = lazyWithPrefetch(() => import('../../pages/PublicHomePage'));
const PublicLoginPage = lazyWithPrefetch(() => import('../../pages/PublicLoginPage'));
const RegisterPage = lazyWithPrefetch(() => import('../../pages/RegisterPage'));
const ProfilePage = lazyWithPrefetch(() => import('../../pages/ProfilePage'));
const PublicServicesPage = lazyWithPrefetch(() => import('../../pages/PublicServicesPage'));
const PublicServiceListPage = lazyWithPrefetch(() => import('../../pages/PublicServiceListPage'));
const PublicServiceDetailPage = lazyWithPrefetch(() => import('../../pages/PublicServiceDetailPage'));
const PublicPropertiesPage = lazyWithPrefetch(() => import('../../pages/PublicPropertiesPage'));
const PublicPropertyDetailPage = lazyWithPrefetch(() => import('../../pages/PublicPropertyDetailPage'));
const PublicNewsPage = lazyWithPrefetch(() => import('../../pages/PublicNewsPage'));
const PublicNewsDetailPage = lazyWithPrefetch(() => import('../../pages/PublicNewsDetailPage'));
const PublicCityServicesGuidePage = lazyWithPrefetch(() => import('../../pages/PublicCityServicesGuidePage'));
const AboutCityPage = lazyWithPrefetch(() => import('../../pages/AboutCityPage'));
const PublicProfilePage = lazyWithPrefetch(() => import('../../pages/PublicProfilePage'));
const CommunityPage = lazyWithPrefetch(() => import('../../pages/CommunityPage'));
const PostDetailPage = lazyWithPrefetch(() => import('../../pages/PostDetailPage'));
const FavoritesPage = lazyWithPrefetch(() => import('../../pages/FavoritesPage'));
const UserNotificationsPage = lazyWithPrefetch(() => import('../../pages/UserNotificationsPage'));
const PublicTransportationPage = lazyWithPrefetch(() => import('../../pages/PublicTransportationPage'));
const ContactPage = lazyWithPrefetch(() => import('../../pages/ContactPage'));
const MarketplaceManagementPage = lazyWithPrefetch(() => import('../../pages/MarketplaceManagementPage'));
const JobsManagementPage = lazyWithPrefetch(() => import('../../pages/JobsManagementPage'));
const OffersManagementPage = lazyWithPrefetch(() => import('../../pages/OffersManagementPage'));
const LostAndFoundManagementPage = lazyWithPrefetch(() => import('../../pages/LostAndFoundManagementPage'));
const ReviewsPage = lazyWithPrefetch(() => import('../../pages/ReviewsPage'));
const PublicOffersPage = lazyWithPrefetch(() => import('../../pages/PublicOffersPage'));
const MyBusinessPage = lazyWithPrefetch(() => import('../../pages/MyBusinessPage'));
const MyOffersPage = lazyWithPrefetch(() => import('../../pages/MyOffersPage'));
const NotFoundPage = lazyWithPrefetch(() => import('../../pages/NotFoundPage'));
const ServicesOverviewPage = lazyWithPrefetch(() => import('../../pages/ServicesOverviewPage'));
const DashboardPage = lazyWithPrefetch(() => import('../../pages/DashboardPage'));
const UsersPage = lazyWithPrefetch(() => import('../../pages/UsersPage'));
const NewsPage = lazyWithPrefetch(() => import('../../pages/NewsPage'));
const AdvertisementsPage = lazyWithPrefetch(() => import('../../pages/AdvertisementsPage'));
const NotificationsPage = lazyWithPrefetch(() => import('../../pages/NotificationsPage'));
const CityServicesGuidePage = lazyWithPrefetch(() => import('../../pages/CityServicesGuidePage'));
const TransportationPage = lazyWithPrefetch(() => import('../../pages/TransportationPage'));
const AuditLogPage = lazyWithPrefetch(() => import('../../pages/AuditLogPage'));
const CommunityManagementPage = lazyWithPrefetch(() => import('../../pages/CommunityManagementPage'));
const ContentManagementPage = lazyWithPrefetch(() => import('../../pages/ContentManagementPage'));
const SettingsPage = lazyWithPrefetch(() => import('../../pages/SettingsPage'));
const ServicePage = lazyWithPrefetch(() => import('../../pages/ServicePage'));
const PropertiesPage = lazyWithPrefetch(() => import('../../pages/PropertiesPage'));
const ServiceDetailPage = lazyWithPrefetch(() => import('../../pages/ServiceDetailPage'));
const ReportsPage = lazyWithPrefetch(() => import('../../pages/ReportsPage'));


// New form pages
const NewPostPage = lazyWithPrefetch(() => import('../../pages/NewPostPage'));
const NewMarketplaceItemPage = lazyWithPrefetch(() => import('../../pages/NewMarketplaceItemPage'));
const NewJobPage = lazyWithPrefetch(() => import('../../pages/NewJobPage'));
const NewLostAndFoundPage = lazyWithPrefetch(() => import('../../pages/NewLostAndFoundPage'));
const EditOfferPage = lazyWithPrefetch(() => import('../../pages/EditOfferPage'));
const EditPostPage = lazyWithPrefetch(() => import('../../pages/EditPostPage'));


export const prefetchMap: { [path: string]: () => Promise<any> } = {
  '/': PublicHomePage.preload,
  '/services': PublicServicesPage.preload,
  '/properties': PublicPropertiesPage.preload,
  '/news': PublicNewsPage.preload,
  '/community': CommunityPage.preload,
  '/transportation': PublicTransportationPage.preload,
  '/emergency': EmergencyPage.preload,
  '/favorites': FavoritesPage.preload,
  '/about': AboutPage.preload,
  '/faq': FaqPage.preload,
  '/city-services-guide': PublicCityServicesGuidePage.preload,
  '/about-city': AboutCityPage.preload,
  '/contact': ContactPage.preload,
  '/privacy-policy': PrivacyPolicyPage.preload,
  '/terms-of-use': TermsOfUsePage.preload,
  '/login-user': PublicLoginPage.preload,
  '/register': RegisterPage.preload,
  '/marketplace-management': MarketplaceManagementPage.preload,
  '/jobs-management': JobsManagementPage.preload,
  '/offers-management': OffersManagementPage.preload,
  '/lost-and-found-management': LostAndFoundManagementPage.preload,
  '/offers': PublicOffersPage.preload,
  '/reviews': ReviewsPage.preload,
  '/my-business': MyBusinessPage.preload,
  '/my-offers': MyOffersPage.preload,
  // Add dynamic prefetch handlers
  ...(() => {
    const dynamicPrefetches: { [key: string]: () => Promise<any> } = {};
    // Preload for up to 20 potential detail pages to improve performance.
    for (let i = 1; i <= 20; i++) {
        dynamicPrefetches[`/service/${i}`] = PublicServiceDetailPage.preload;
        dynamicPrefetches[`/property/${i}`] = PublicPropertyDetailPage.preload;
        dynamicPrefetches[`/news/${i}`] = PublicNewsDetailPage.preload;
        dynamicPrefetches[`/post/${i}`] = PostDetailPage.preload;
    }
    return dynamicPrefetches;
  })()
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const { isPublicAuthenticated, currentPublicUser, isAuthenticated } = useAuth();
    const isServiceProvider = isPublicAuthenticated && currentPublicUser?.role === 'service_provider';

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Specific and dynamic routes first */}
                <Route path="/login-user" element={<AnimatedPage><PublicLoginPage /></AnimatedPage>} />
                <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
                <Route path="/profile" element={isPublicAuthenticated ? <AnimatedPage><ProfilePage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/my-business/offer/new" element={isServiceProvider ? <AnimatedPage><EditOfferPage /></AnimatedPage> : <Navigate to="/" />} />
                <Route path="/my-business/offer/edit/:offerId" element={isServiceProvider ? <AnimatedPage><EditOfferPage /></AnimatedPage> : <Navigate to="/" />} />
                <Route path="/my-business" element={isServiceProvider ? <AnimatedPage><MyBusinessPage /></AnimatedPage> : <Navigate to="/" />} />
                <Route path="/my-offers" element={isPublicAuthenticated ? <AnimatedPage><MyOffersPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/favorites" element={isPublicAuthenticated ? <AnimatedPage><FavoritesPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/user-notifications" element={<AnimatedPage><UserNotificationsPage /></AnimatedPage>} />
                <Route path="/user/:userId" element={<AnimatedPage><PublicProfilePage /></AnimatedPage>} />
                <Route path="/services/subcategory/:subCategoryId" element={<AnimatedPage><PublicServiceListPage /></AnimatedPage>} />
                <Route path="/service/:serviceId" element={<AnimatedPage><PublicServiceDetailPage /></AnimatedPage>} />
                <Route path="/property/:propertyId" element={<AnimatedPage><PublicPropertyDetailPage /></AnimatedPage>} />
                <Route path="/news/:newsId" element={<AnimatedPage><PublicNewsDetailPage /></AnimatedPage>} />
                <Route path="/post/edit/:postId" element={isPublicAuthenticated ? <AnimatedPage><EditPostPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/post/:postId" element={<AnimatedPage><PostDetailPage /></AnimatedPage>} />
                <Route path="/community/new-post" element={isPublicAuthenticated ? <AnimatedPage><NewPostPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/community/new-item" element={isPublicAuthenticated ? <AnimatedPage><NewMarketplaceItemPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/community/new-job" element={isPublicAuthenticated ? <AnimatedPage><NewJobPage /></AnimatedPage> : <Navigate to="/login-user" />} />
                <Route path="/community/new-lost-found" element={isPublicAuthenticated ? <AnimatedPage><NewLostAndFoundPage /></AnimatedPage> : <Navigate to="/login-user" />} />

                {/* Top-level static routes */}
                <Route path="/services" element={<AnimatedPage><PublicServicesPage /></AnimatedPage>} />
                <Route path="/properties" element={<AnimatedPage><PublicPropertiesPage /></AnimatedPage>} />
                <Route path="/news" element={<AnimatedPage><PublicNewsPage /></AnimatedPage>} />
                <Route path="/community" element={<AnimatedPage><CommunityPage /></AnimatedPage>} />
                <Route path="/transportation" element={<AnimatedPage><PublicTransportationPage /></AnimatedPage>} />
                <Route path="/emergency" element={<AnimatedPage><EmergencyPage /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
                <Route path="/about-city" element={<AnimatedPage><AboutCityPage /></AnimatedPage>} />
                <Route path="/privacy-policy" element={<AnimatedPage><PrivacyPolicyPage /></AnimatedPage>} />
                <Route path="/faq" element={<AnimatedPage><FaqPage /></AnimatedPage>} />
                <Route path="/terms-of-use" element={<AnimatedPage><TermsOfUsePage /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
                <Route path="/city-services-guide" element={<AnimatedPage><PublicCityServicesGuidePage /></AnimatedPage>} />
                <Route path="/offers" element={<AnimatedPage><PublicOffersPage /></AnimatedPage>} />
                <Route path="/reviews" element={<AnimatedPage><ReviewsPage /></AnimatedPage>} />
                <Route path="/marketplace-management" element={<AnimatedPage><MarketplaceManagementPage /></AnimatedPage>} />
                <Route path="/jobs-management" element={<AnimatedPage><JobsManagementPage /></AnimatedPage>} />
                <Route path="/offers-management" element={<AnimatedPage><OffersManagementPage /></AnimatedPage>} />
                <Route path="/lost-and-found-management" element={<AnimatedPage><LostAndFoundManagementPage /></AnimatedPage>} />

                {/* Dashboard Routes (Protected) - Usually handled by checking currentUser but simplified here */}
                {/* Assuming 'dashboard' route or similar is the entry point for admin */}
                {/* Since we are using role-based access inside DashboardPage, we route there. */}
                {/* Note: In a real app, we'd have a separate layout or nested routes for admin dashboard */}
                
                 {/* Admin Pages (Hidden from public navigation, accessible via direct link or future admin login) */}
                 {/* For now, we map them to allow build, but access control is inside components or not linked */}
                 <Route path="/admin-dashboard" element={isAuthenticated ? <AnimatedPage><DashboardPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/services-overview" element={isAuthenticated ? <AnimatedPage><ServicesOverviewPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/users" element={isAuthenticated ? <AnimatedPage><UsersPage /></AnimatedPage> : <Navigate to="/" />} />
                 {/* Overriding public news/properties route for admin? No, admin usually has separate management pages. */}
                 {/* Reusing the same path might be confusing. Let's assume these management pages are what was meant */}
                 
                 {/* Mapping management pages to routes if they are different from public ones */}
                 <Route path="/advertisements" element={isAuthenticated ? <AnimatedPage><AdvertisementsPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/notifications" element={isAuthenticated ? <AnimatedPage><NotificationsPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/audit-log" element={isAuthenticated ? <AnimatedPage><AuditLogPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/community-management" element={isAuthenticated ? <AnimatedPage><CommunityManagementPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/content-management" element={isAuthenticated ? <AnimatedPage><ContentManagementPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/settings" element={isAuthenticated ? <AnimatedPage><SettingsPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/reports" element={isAuthenticated ? <AnimatedPage><ReportsPage /></AnimatedPage> : <Navigate to="/" />} />
                 
                 {/* Detailed Admin Pages */}
                 <Route path="/services/detail/:serviceId" element={isAuthenticated ? <AnimatedPage><ServiceDetailPage /></AnimatedPage> : <Navigate to="/" />} />
                 <Route path="/services/subcategory/:subCategoryId" element={<AnimatedPage><PublicServiceListPage /></AnimatedPage>} /> 
                 {/* Note: Reusing PublicServiceListPage for admin drill-down might need adjustment if admin features are needed there. 
                    Currently ServicePage.tsx seems to be the admin list for a subcategory. Let's map it. */}
                 {/* If we go to /services/subcategory/:id from admin sidebar, we want ServicePage (Admin) */}
                 {/* But from public header, we want PublicServiceListPage. Conflict? */}
                 {/* Solution: Use different paths. Sidebar uses /services/subcategory/:id. Public uses /services/list/:id? */}
                 {/* For now, keeping PublicServiceListPage for public. If admin needs management, they go to /services-overview -> click category -> ? */}
                 {/* The sidebar links to /services/subcategory/:id. ServicePage.tsx is the admin view. PublicServiceListPage is public view. */}
                 {/* We should probably distinguish them. Let's map /admin/services/:subCategoryId to ServicePage */}
                 
                 <Route path="/admin/services/:subCategoryId" element={isAuthenticated ? <AnimatedPage><ServicePage /></AnimatedPage> : <Navigate to="/" />} />


                {/* Root route as the last non-wildcard route */}
                <Route path="/" element={<AnimatedPage><PublicHomePage /></AnimatedPage>} />

                {/* Catch-all route for 404 */}
                <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;