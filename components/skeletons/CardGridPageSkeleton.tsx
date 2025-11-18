import React from 'react';

const PageBannerSkeleton = () => (
    <div className="bg-white dark:bg-slate-800/50 py-6 sm:py-8 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4"></div>
            <div className="h-10 bg-slate-300 dark:bg-slate-600 rounded-md w-1/2 mx-auto"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mx-auto mt-4"></div>
        </div>
    </div>
);

const CardSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
        <div className="p-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2"></div>
        </div>
    </div>
);

const CardGridPageSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse" dir="rtl">
            <PageBannerSkeleton />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl w-full mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardGridPageSkeleton;