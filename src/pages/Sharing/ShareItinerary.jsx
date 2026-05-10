import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, MapPin, Calendar, Clock, Lock } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ShareItinerary = () => {
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Share Your Trip</h1>
          <p className="text-slate-500">Generate a beautiful public link to share with friends and family.</p>
        </motion.div>

        <Card className="p-8 border-slate-100 flex flex-col md:flex-row gap-8 overflow-hidden bg-gradient-to-br from-white to-blue-50/50">
           {/* Link Generation Side */}
           <div className="w-full md:w-1/2 flex flex-col justify-center border-r border-slate-100 pr-0 md:pr-8">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-6">
                 <Share2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Public Link Settings</h2>
              <p className="text-slate-600 mb-6 text-sm">Anyone with this link can view your itinerary, but they cannot edit or see your private notes.</p>
              
              <div className="space-y-4 mb-8">
                 <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white">
                    <div className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                       <MapPin size={16} className="text-slate-400" />
                       <span>Show Locations & Maps</span>
                    </div>
                    {/* Toggle */}
                    <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white opacity-60">
                    <div className="flex items-center space-x-3 text-sm text-slate-700 font-medium">
                       <Lock size={16} className="text-slate-400" />
                       <span>Hide Budget Data (Pro)</span>
                    </div>
                    <div className="w-10 h-6 bg-slate-300 rounded-full relative cursor-not-allowed">
                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <input 
                   type="text" 
                   readOnly 
                   value="https://traveloop.app/s/trip-xyz-123" 
                   className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl py-3 px-4 pr-24 text-sm font-medium text-slate-600 outline-none"
                 />
                 <Button size="sm" className="absolute right-1.5 top-1.5 bottom-1.5 px-4 flex items-center shadow-md">
                    <Copy size={14} className="mr-2" /> Copy
                 </Button>
              </div>
           </div>

           {/* Preview Side */}
           <div className="w-full md:w-1/2 relative bg-slate-100 rounded-2xl p-6 border border-slate-200 overflow-hidden shadow-inner flex flex-col justify-center items-center">
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded font-bold text-slate-400 uppercase">
                 Live Preview
              </div>
              <motion.div 
                 initial={{ scale: 0.95 }}
                 animate={{ scale: 1 }}
                 className="w-72 bg-white rounded-2xl shadow-xl overflow-hidden pointer-events-none"
              >
                 <div className="h-32 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop')" }} />
                 <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-lg">Taj Mahal Getaway</h3>
                    <p className="text-xs text-slate-500 mb-4 flex items-center mt-1">
                       <Calendar size={12} className="mr-1" /> Oct 12 - 15, 2026
                    </p>
                    
                    <div className="space-y-3 relative before:absolute before:left-1.5 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100">
                       <div className="relative pl-6">
                          <div className="absolute left-0 top-1.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                          <p className="text-sm font-semibold text-slate-700">Arrive in Agra</p>
                          <p className="text-xs text-slate-400">10:00 AM</p>
                       </div>
                       <div className="relative pl-6">
                          <div className="absolute left-0 top-1.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />
                          <p className="text-sm font-semibold text-slate-700">Taj Mahal Tour</p>
                          <p className="text-xs text-slate-400">03:00 PM</p>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ShareItinerary;
