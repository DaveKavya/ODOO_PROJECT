import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, CheckCircle, TrendingUp, TrendingDown, 
  Plus, Bell, Search, Star, MessageSquare, MapPin, Calendar, 
  MoreVertical, Edit2, Trash2, ArrowRight
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'sonner';

// Mock Chart Data
const revenueData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 480 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 850 },
  { name: 'Sun', value: 650 },
];

const feedData = [
  { id: 1, action: 'New booking created', target: 'Paris Getaway', user: 'Sarah L.', time: '2m ago', type: 'success' },
  { id: 2, action: 'Invoice payment pending', target: 'Inv-40291', user: 'System', time: '15m ago', type: 'warning' },
  { id: 3, action: 'User profile updated', target: 'David Kim', user: 'David Kim', time: '1h ago', type: 'info' },
  { id: 4, action: 'System maintenance', target: 'Database', user: 'Admin', time: '3h ago', type: 'info' },
  { id: 5, action: 'Trip cancelled', target: 'Tokyo Tour', user: 'Emma W.', time: '5h ago', type: 'error' },
];

// Helper: Animated Counter
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;
    const isDecimal = !Number.isInteger(end);
    const duration = 1000;
    const interval = 20;
    const step = (end / (duration / interval));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{prefix}{Number.isInteger(count) ? Math.floor(count) : count.toFixed(1)}{suffix}</span>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 text-sm">
        <p className="font-bold text-slate-800 dark:text-white mb-1">{label}</p>
        <p style={{ color: payload[0].color }} className="font-medium">
          Activity: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { user, trips, setTrips } = useAppContext();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDelete = (id) => {
    setTrips(trips.filter(t => t.id !== id));
    setActiveDropdown(null);
    toast.success('Record deleted successfully');
  };

  const overviewStats = [
    { title: 'Total Users', value: 12480, trend: 12.5, icon: Users, color: 'text-blue-500' },
    { title: 'Active Sessions', value: 892, trend: 5.2, icon: Activity, color: 'text-purple-500' },
    { title: 'Completed Tasks', value: 4520, trend: -2.4, icon: CheckCircle, color: 'text-emerald-500' },
    { title: 'Revenue Score', value: 98.4, trend: 18.2, icon: Star, color: 'text-amber-500' },
  ];

  return (
    <AppLayout>
      <div className="w-full flex flex-col xl:flex-row gap-6 xl:gap-8 pb-10">
        
        {/* LEFT COLUMN: Main Dash Area (Occupies 3/4 on large screens) */}
        <div className="flex-1 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                Dashboard Overview
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Hello {user?.fullName?.split(' ')[0] || 'User'}, here is what's happening today.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <div className="bg-white dark:bg-slate-800 p-1 flex rounded-xl border border-slate-200 dark:border-slate-700">
                {['7D', '30D', 'All'].map(range => (
                  <button key={range} className={`px-3 py-1 text-sm font-medium rounded-lg ${range === '7D' ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}>
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 1. KPI CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="p-5 border-slate-100 dark:border-slate-800 dark:bg-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-bold ${stat.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{Math.abs(stat.trend)}%</span>
                    </div>
                  </div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    <AnimatedCounter value={stat.value} prefix={stat.title.includes('Revenue') ? '₹' : ''} suffix={stat.title.includes('Score') ? 'k' : ''} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 2. GRAPHS & FEED ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Activity Graph (Spans 2 columns) */}
            <Card className="p-6 border-slate-100 dark:border-slate-800 dark:bg-slate-800/80 shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Activity Overview</h3>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                   <MoreVertical size={18} />
                </button>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Activity Feed Panel */}
            <Card className="p-0 border-slate-100 dark:border-slate-800 dark:bg-slate-800/80 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white dark:bg-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Activity</h3>
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-bold">New</span>
              </div>
              <div className="p-5 flex-1 overflow-y-auto space-y-5">
                {feedData.map(item => (
                   <div key={item.id} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                      <div className={`absolute -left-[5px] top-0.5 w-2 h-2 rounded-full ${
                        item.type === 'success' ? 'bg-emerald-500' :
                        item.type === 'warning' ? 'bg-amber-500' :
                        item.type === 'error' ? 'bg-red-500' : 'bg-primary'
                      } ring-4 ring-white dark:ring-slate-800`} />
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{item.action}</p>
                      <div className="flex justify-between items-center mt-1">
                         <span className="text-xs text-slate-500 dark:text-slate-400">{item.target} • {item.user}</span>
                         <span className="text-xs text-slate-400 font-semibold">{item.time}</span>
                      </div>
                   </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 text-center">
                 <button className="text-sm font-semibold text-primary hover:text-blue-600 transition-colors">View all activity</button>
              </div>
            </Card>
          </div>

          {/* 3. DATA MANAGEMENT TABLE (CORE FEATURE) */}
          <Card className="border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
               <div>
                 <h3 className="text-lg font-bold text-slate-800 dark:text-white">Active Projects & Trips</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage scheduled operations and active entities.</p>
               </div>
               <div className="flex items-center space-x-3 w-full sm:w-auto">
                 <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 w-full" />
                 </div>
                 <Button size="sm" onClick={() => toast.info('Opened New Project Wizard')}><Plus size={16} className="mr-1.5"/> Add</Button>
               </div>
            </div>
            
            <div className="overflow-x-auto min-h-[300px]">
               <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                 <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-100 dark:border-slate-700/50">
                    <tr>
                       <th className="px-5 py-3">Identifier / Name</th>
                       <th className="px-5 py-3">Location / Tag</th>
                       <th className="px-5 py-3">Date</th>
                       <th className="px-5 py-3">Status</th>
                       <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {trips.length === 0 && (
                      <tr><td colSpan="5" className="text-center py-8 text-slate-500">No active data rows available.</td></tr>
                    )}
                    {trips.map(row => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                         <td className="px-5 py-4 font-bold text-slate-800 dark:text-white">{row.title}</td>
                         <td className="px-5 py-4 flex items-center font-medium"><MapPin size={14} className="mr-2 text-primary" />{row.destination}</td>
                         <td className="px-5 py-4 whitespace-nowrap"><Calendar size={14} className="inline mr-2 text-slate-400"/> {row.startDate}</td>
                         <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md ${
                                row.status === 'Planning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                            }`}>{row.status}</span>
                         </td>
                         <td className="px-5 py-4 text-right relative">
                            <button onClick={() => setActiveDropdown(activeDropdown === row.id ? null : row.id)} className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                              <MoreVertical size={16} />
                            </button>
                            <AnimatePresence>
                               {activeDropdown === row.id && (
                                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute right-10 top-10 w-36 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-xl py-1 z-10 overflow-hidden">
                                    <button onClick={() => {toast.success('Editing row data'); setActiveDropdown(null);}} className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"><Edit2 size={14} className="mr-2"/> Edit</button>
                                    <button onClick={() => handleDelete(row.id)} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={14} className="mr-2"/> Delete</button>
                                 </motion.div>
                               )}
                            </AnimatePresence>
                         </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
            {trips.length > 0 && (
               <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50 dark:bg-slate-900/30">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Showing {trips.length} entries</span>
                  <div className="flex space-x-1">
                     <button className="px-3 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">Previous</button>
                     <button className="px-3 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">Next</button>
                  </div>
               </div>
            )}
          </Card>

        </div>

        {/* RIGHT COLUMN: Profile & Quick Actions */}
        <div className="w-full xl:w-[320px] space-y-6">
          
          {/* Profile Summary Card */}
          <Card className="p-0 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm overflow-hidden text-center relative">
             <div className="h-24 bg-gradient-to-r from-primary to-purple-600 w-full" />
             <div className="px-6 pb-6 pt-0 relative">
                <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 shadow-md mx-auto -mt-10 flex items-center justify-center text-2xl font-bold mb-3 text-slate-700 dark:text-slate-300 relative overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop')"}}>
                   {!user && 'U'}
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-white line-clamp-1">{user?.fullName || 'Anna Administrator'}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Operations Manager</p>
                
                <div className="flex justify-center space-x-4 mb-5">
                   <div className="text-center">
                      <p className="font-bold text-slate-800 dark:text-white text-lg">24</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Projects</p>
                   </div>
                   <div className="text-center">
                      <p className="font-bold text-slate-800 dark:text-white text-lg">152</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Tasks</p>
                   </div>
                </div>

                <div className="text-left mb-5">
                   <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Profile Strength</span>
                      <span className="font-bold text-primary">85%</span>
                   </div>
                   <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full w-[85%]" />
                   </div>
                </div>
                <Button variant="ghost" className="w-full border border-slate-200 dark:border-slate-700 text-sm">Edit Profile</Button>
             </div>
          </Card>

          {/* Quick Action Widget */}
          <Card className="p-6 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm">
             <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                Quick Actions
             </h3>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'New Project', icon: Plus, color: 'text-primary bg-primary/10' },
                  { label: 'Add Booking', icon: Calendar, color: 'text-purple-500 bg-purple-500/10' },
                  { label: 'Messages', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10' },
                  { label: 'Reports', icon: Activity, color: 'text-amber-500 bg-amber-500/10' },
                ].map((action, i) => (
                  <button key={i} onClick={() => toast.info(`Action triggered: ${action.label}`)} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                     <span className={`p-2.5 rounded-full mb-2 ${action.color} group-hover:scale-110 transition-transform`}>
                        <action.icon size={18} />
                     </span>
                     <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center">{action.label}</span>
                  </button>
                ))}
             </div>
          </Card>

          {/* Support / Help Hint */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden shadow-md group cursor-pointer hover:shadow-lg transition-shadow">
             <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity" />
             <Star className="text-amber-300 mb-2 drop-shadow-md" size={24} />
             <h4 className="font-bold text-lg mb-1 relative z-10">Upgrade to Pro</h4>
             <p className="text-sm text-indigo-100 relative z-10 mb-3 leading-relaxed">Get advanced analytics and unlimited projects by upgrading your account.</p>
             <button className="text-xs font-bold uppercase tracking-wider flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors w-max relative z-10">
                View Plans <ArrowRight size={14} className="ml-1.5" />
             </button>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default Dashboard;
