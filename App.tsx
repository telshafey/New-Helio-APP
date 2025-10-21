import React, { Suspense, useState, useEffect } from 'react';
import SkeletonLoader from './components/common/SkeletonLoader';
import ToastContainer from './components/common/Toast';
import ScrollToTop from './components/common/ScrollToTop';
import ConfirmationDialog from './components/common/ConfirmationDialog';
import BottomNav from './components/common/BottomNav';
import SideDrawer from './components/common/SideDrawer';
import PublicHeader from './components/common/PublicHeader';
import PublicFooter from './components/common/PublicFooter';
import WhatsAppFab from './components/common/WhatsAppFab';
import AnimatedRoutes from './components/common/AnimatedRoutes';

const useVirtualKeyboardVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check for visualViewport support, which is the most reliable way.
      if (!window.visualViewport) return;
      
      // The keyboard is considered visible if a significant portion of the window height is taken up.
      // 150px is a common threshold that works for most devices.
      const isKeyboardVisible = window.innerHeight - window.visualViewport.height > 150;
      
      // Update the state only if it has changed to avoid unnecessary re-renders.
      setIsVisible(prev => prev !== isKeyboardVisible ? isKeyboardVisible : prev);
    };

    const vp = window.visualViewport;

    if (vp) {
      vp.addEventListener('resize', handleResize);
      // Run on mount as well in case the keyboard is already open on page load.
      handleResize(); 
      return () => vp.removeEventListener('resize', handleResize);
    }
  }, []);

  return isVisible;
};


const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isKeyboardVisible = useVirtualKeyboardVisible();

  useEffect(() => {
    // This effect runs once when the app mounts.
    
    // 1. Fix splash screen transition:
    // The #root element has centering styles for the initial loader.
    // We remove them once the React app takes over to prevent layout conflicts.
    const rootElement = document.getElementById('root');
    if (rootElement) {
        // Revert to default block display.
        rootElement.style.display = 'block';
        rootElement.style.justifyContent = 'normal';
        rootElement.style.alignItems = 'normal';
    }
    
    // We only want this logic to run once on the initial mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <ScrollToTop />
      <div className="bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans flex flex-col" dir="rtl">
        <PublicHeader />
        <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <main className="flex-grow pt-12 md:pt-14 pb-12 md:pb-0 relative">
          <Suspense fallback={<SkeletonLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <div className="hidden md:block">
          <PublicFooter />
        </div>
        <div className={`md:hidden transition-transform duration-300 ease-in-out ${isKeyboardVisible ? 'translate-y-full' : 'translate-y-0'}`}>
           <BottomNav onMenuClick={() => setIsDrawerOpen(true)} />
        </div>
      </div>
      <ToastContainer />
      <div className={`transition-transform duration-300 ease-in-out ${isKeyboardVisible ? 'translate-y-24' : 'translate-y-0'}`}>
        <WhatsAppFab />
      </div>
      <ConfirmationDialog />
    </>
  );
};

export default App;