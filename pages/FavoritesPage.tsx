import React from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../context/ServicesContext';
import ServiceCard from '../components/common/ServiceCard';
import EmptyState from '../components/common/EmptyState';
import { HeartIconSolid } from '../components/common/Icons';
import PageBanner from '../components/common/PageBanner';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const FavoritesPage: React.FC = () => {
    const { services } = useServices();
    
    // The route in App.tsx already protects this page, so we can assume the user is authenticated.
    const favoriteServices = services.filter(s => s.isFavorite);

    return (
        <div className="animate-fade-in" dir="rtl">
            <PageBanner
                title="قائمة المفضلة"
                subtitle="جميع خدماتك المفضلة في مكان واحد."
                icon={<HeartIconSolid className="w-12 h-12 text-red-500" />}
            />
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {favoriteServices.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {favoriteServices.map(service => (
                            <motion.div key={service.id} variants={itemVariants}>
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <EmptyState
                        icon={<HeartIconSolid className="w-16 h-16 text-slate-400" />}
                        title="قائمة المفضلة فارغة"
                        message="لم تقم بإضافة أي خدمات إلى المفضلة بعد. ابدأ بتصفح الخدمات وأضف ما يعجبك!"
                    >
                        <Link 
                            to="/services" 
                            className="inline-block bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                            تصفح الخدمات
                        </Link>
                    </EmptyState>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;