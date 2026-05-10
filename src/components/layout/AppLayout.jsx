import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaneTakeoff, Map, Wallet, Compass, Share2, LogOut, Search, Bell, Settings, User, Menu, X, Check, CheckCircle, Info, AlertTriangle, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'sonner';

const SidebarItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      isActive 
        ? 'bg-primary/10 text-primary font-medium dark:bg-primary/20 dark:text-blue-400' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-primary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} />
    <span>{label}</span>
  </Link>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, theme, setTheme } = useAppContext();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Trip Update', message: 'Flight to Paris changed to 14:00', type: 'warning', read: false },
    { id: 2, title: 'New Booking', message: 'Successfully booked Marriot Hotel', type: 'success', read: false },
    { id: 3, title: 'Network Issue', message: 'Syncing might be slow currently', type: 'info', read: true },
  ]);
  
  const navItems = [
    { icon: Map, label: 'Dashboard', path: '/dashboard' },
    { icon: Compass, label: 'Analytics', path: '/analytics' },
    { icon: MapPin, label: 'My Trips', path: '/trips' },
    { icon: PlaneTakeoff, label: 'Planner', path: '/planner' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: Share2, label: 'Shared', path: '/shared' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 z-50 overflow-y-auto lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex justify-between items-center sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10 border-b border-slate-100 dark:border-slate-800">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <PlaneTakeoff size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
              Traveloop.
            </span>
          </Link>

          <button
            className="lg:hidden text-slate-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-2 py-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">
            Menu
          </div>

          {navItems.map((item) => (
            <SidebarItem 
              key={item.label}
              {...item}
              isActive={location.pathname.startsWith(item.path)}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-auto">
          <SidebarItem 
            icon={Settings}
            label="Settings & Profile"
            path="/settings"
            isActive={location.pathname.startsWith('/settings')}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main App Canvas */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          
          <div className="flex items-center flex-1">
            <button
              className="lg:hidden text-slate-500 mr-4"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Global Search */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                size={18}
              />

              <input 
                type="text"
                placeholder="Search globally... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-200"
              />

              <AnimatePresence>
                {isSearchFocused && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-[150%] max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-3 z-50 overflow-hidden"
                  >
                    <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        Searching for "{searchQuery}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className={`p-2 rounded-full transition-colors relative ${
                  isNotificationsOpen
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bell size={20} />

                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 pointer-events-none"></span>
                )}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsNotificationsOpen(false);
                }}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center shadow-md focus:outline-none ring-2 ring-transparent focus:ring-primary/50 transition-all active:scale-95 border-2 border-white dark:border-slate-900"
              >
                {user?.fullName ? user.fullName.charAt(0) : 'U'}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-8 w-full max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;