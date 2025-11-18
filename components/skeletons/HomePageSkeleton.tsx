import React from 'react';

const HomePageSkeleton = () => {
    return (
        <div className="animate-pulse" dir="rtl">
            {/* Hero Skeleton */}
            <section className="bg-slate-200 dark:bg-slate-800 pt-6 pb-10 md:pt-10 md:pb-16 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-md w-3/4 mx-auto"></div>
                    <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded-md w-1/2 mx-auto mt-4"></div>
                    <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded-full w-full max-w-xl mx-auto mt-6"></div>
                </div>
            </section>
            
            {/* Ad Slider Skeleton */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="h-56 sm:h-64 md:h-72 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
            </div>

             {/* Highlights Skeleton */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-96 bg-slate-200 dark:bg-slate-800 p-6 rounded-2xl"></div>
                    <div className="h-96 bg-slate-200 dark:bg-slate-800 p-6 rounded-2xl"></div>
                </div>
            </div>

            {/* Carousels Skeleton */}
            {[...Array(3)].map((_, i) => (
                <section key={i} className="py-10 bg-slate-200/50 dark:bg-slate-800/50 overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded-md w-1/3 mx-auto mb-8"></div>
                        <div className="flex gap-6">
                            <div className="w-72 h-64 bg-slate-300 dark:bg-slate-700 rounded-xl flex-shrink-0"></div>
                            <div className="w-72 h-64 bg-slate-300 dark:bg-slate-700 rounded-xl flex-shrink-0 hidden sm:block"></div>
                            <div className="w-72 h-64 bg-slate-300 dark:bg-slate-700 rounded-xl flex-shrink-0 hidden lg:block"></div>
                            <div className="w-72 h-64 bg-slate-300 dark:bg-slate-700 rounded-xl flex-shrink-0 hidden xl:block"></div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default HomePageSkeleton;