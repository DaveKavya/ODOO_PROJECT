import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, Map, Wallet, Compass, Share2, LogOut, Search, Bell, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, isActive }) => (
  <Link
    to={path}
    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      isActive 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-500'} />
    <span>{label}</span>
  </Link>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Map, label: 'Dashboard', path: '/dashboard' },
    { icon: PlaneTakeoff, label: 'Trip Planner', path: '/planner' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Share2, label: 'Shared', path: '/shared' },
  ];

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-20"
      >
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <PlaneTakeoff size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">Traveloop.</span>
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
          {navItems.map((item) => (
            <SidebarItem 
              key={item.label} 
              {...item} 
              isActive={location.pathname.startsWith(item.path)} 
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search destinations, trips..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center shadow-md">
              <User size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
