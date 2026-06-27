import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, Bell, Home, Users, User
} from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [adminUser, setAdminUser] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('shukrana_session');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSystemLogout = () => {
    localStorage.removeItem('shukrana_session');
    navigate('/login');
  };

  if (!adminUser) return null;

  const mobileNavItems = [
    { icon: <Home className="w-6 h-6" />, label: t('sidebar.dashboard'), path: '/dashboard' },
    { icon: <Users className="w-6 h-6" />, label: t('sidebar.overview'), path: '/network/overview' },
    { icon: <User className="w-6 h-6" />, label: t('sidebar.profileSettings'), path: '/account/profile-settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden font-sans text-[#232F46]">
      
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block h-screen sticky top-0 z-20">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-[#232F46]/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[280px] h-full flex flex-col z-10 bg-white"
            >
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-xl z-50"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="h-full">
                <Sidebar 
                  isCollapsed={false} 
                  setIsCollapsed={() => {}} 
                  onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden min-w-0 relative">
        
        {/* TOP NAVBAR */}
        <header className="sticky top-0 bg-white border-b border-gray-200 shrink-0 flex items-center justify-between z-10 h-16 px-4 sm:px-6">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Global Search */}
            <div className="hidden sm:flex items-center w-full max-w-md relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#ED8C32] transition-colors" />
              </div>
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#ED8C32] focus:ring-2 focus:ring-[#ED8C32]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <LanguageSwitcher />
            
            <Link to="/notifications" className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Link>

            <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-[#232F46] leading-none">Demo User</p>
                <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">SK0001</p>
              </div>
              <Avatar initials="DU" size="md" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-grow overflow-y-auto pb-20 md:pb-0 bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-40 pb-safe">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path.split('/')[1] ? `/${item.path.split('/')[1]}` : item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-[#ED8C32]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
