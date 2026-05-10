import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Upcoming Trips', value: '2', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Places Visited', value: '14', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Saved Itineraries', value: '5', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back, Shreya 👋</h1>
            <p className="text-slate-500">Here's an overview of your travels and plans.</p>
          </div>
          <Link to="/planner">
            <Button className="shadow-lg shadow-blue-500/20">
              <Plus size={20} className="mr-2" /> Plan New Trip
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="p-6 border-slate-100 flex items-center space-x-4">
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Trips */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Recent Trips</h2>
                <button className="text-primary text-sm font-medium hover:text-blue-600 flex items-center">
                  View all <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card hoverEffect className="relative h-64 group cursor-pointer border-none">
                  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop')"}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1 mt-2">Taj Mahal Getaway</h3>
                        <p className="text-slate-300 text-sm flex items-center">
                          <Calendar size={14} className="mr-1" /> Oct 12 - 15, 2026
                        </p>
                      </div>
                      <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-semibold">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </Card>

                <Card hoverEffect className="relative h-64 group cursor-pointer border-none">
                  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59693e0908c7?q=80&w=2069&auto=format&fit=crop')"}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1 mt-2">Bali Retreat</h3>
                        <p className="text-slate-300 text-sm flex items-center">
                          <Calendar size={14} className="mr-1" /> Nov 5 - 12, 2026
                        </p>
                      </div>
                      <span className="bg-primary px-2 py-1 rounded text-white text-xs font-semibold shadow-lg shadow-blue-500/30">
                        Planning
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Budget Summary Widget */}
            <Card className="p-6 border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-[50px] pointer-events-none" />
              <h3 className="text-lg font-bold text-slate-800 mb-4 relative z-10">Budget Overview</h3>
              <div className="relative z-10">
                <div className="flex justify-between text-sm mb-2 mt-4">
                  <span className="text-slate-500 font-medium">Spent</span>
                  <span className="font-bold text-slate-800">$1,850.00</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden flex">
                  <div className="bg-primary h-2.5 rounded-l-full" style={{ width: '45%' }}></div>
                  <div className="bg-purple-500 h-2.5" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Flights (45%)</span>
                  <span>Hotels (25%)</span>
                </div>
                <Button variant="ghost" className="w-full mt-6 text-sm text-primary">View Detailed Budget</Button>
              </div>
            </Card>

            {/* Smart Suggestions */}
            <Card className="p-6 border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-amber-400 p-1 rounded-md text-amber-900">
                  <Compass size={16} />
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Smart Pick</h3>
              </div>
              <h4 className="text-xl font-bold mb-2">Weekend in Paris</h4>
              <p className="text-slate-400 text-sm mb-4">Perfect matches your saved interests: Museums, Cafes, and History.</p>
              <div className="flex justify-between items-center bg-white/10 rounded-xl p-3 border border-white/10">
                 <span className="font-bold text-primary bg-primary/20 px-2 py-1 rounded">Estimated: $950</span>
                 <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100">Add to Trip</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
