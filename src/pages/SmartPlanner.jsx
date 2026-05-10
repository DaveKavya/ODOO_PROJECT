import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, GripVertical, Map, Utensils, Navigation } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DayCard = ({ day, date, activities }) => (
  <div className="relative pl-8 pb-8">
    <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-slate-200"></div>
    <div className="absolute left-[7px] top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-white"></div>
    
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Day {day}</h3>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{date}</span>
      </div>
      <Button variant="ghost" size="sm" className="text-primary hover:bg-blue-50">
        <Plus size={16} className="mr-1" /> Add Activity
      </Button>
    </div>

    <div className="space-y-3">
      {activities.map((item, idx) => (
        <Card key={idx} hoverEffect className="p-4 border-slate-100 flex items-center justify-between group">
          <div className="flex items-center space-x-4">
            <div className="cursor-grab text-slate-300 hover:text-slate-500 active:cursor-grabbing">
              <GripVertical size={18} />
            </div>
            <div className={`p-2 rounded-lg ${item.type === 'food' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
              {item.type === 'food' ? <Utensils size={18} /> : <Navigation size={18} />}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{item.title}</p>
              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                <span>{item.time}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{item.duration}</span>
                {item.cost && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="font-medium text-slate-700">{item.cost}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-primary transition-colors cursor-pointer">
        <Plus size={18} className="mr-2" /> <span className="font-medium text-sm">Drop activity here</span>
      </div>
    </div>
  </div>
);

const SmartPlanner = () => {
  const defaultActivities = [
    { type: 'sight', title: 'Museum of Modern Art', time: '10:00 AM', duration: '2 hours' },
    { type: 'food', title: 'Lunch at Cafe de Flore', time: '01:00 PM', duration: '1.5 hours', cost: '₹45' },
    { type: 'sight', title: 'Eiffel Tower Tour', time: '04:00 PM', duration: '3 hours', cost: '₹30' }
  ];

  return (
    <AppLayout>
      <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Timeline Builder */}
        <div className="w-full md:w-3/5 lg:w-2/3 h-full overflow-y-auto p-6 md:p-8 bg-slate-50 relative">
          <div className="max-w-3xl mx-auto">
             <div className="mb-8 flex justify-between items-end">
               <div>
                 <h1 className="text-3xl font-bold text-slate-900 mb-2">Summer in Paris 🥐</h1>
                 <p className="text-slate-500">Plan your days by adding and reordering activities.</p>
               </div>
               <div className="flex space-x-2">
                 <Button variant="secondary" className="shadow-sm">Export</Button>
               </div>
             </div>

             <div className="pt-4">
                <DayCard day={1} date="Oct 12, 2026" activities={defaultActivities} />
                <DayCard day={2} date="Oct 13, 2026" activities={[
                  { type: 'sight', title: 'Louvre Museum', time: '09:00 AM', duration: '4 hours', cost: '₹20' }
                ]} />
                
                <div className="pl-8 mt-4 pt-2">
                   <Button variant="ghost" className="w-full border-2 border-dashed border-slate-300 text-slate-500 hover:bg-slate-100">
                     <Plus size={18} className="mr-2" /> Add Next Day
                   </Button>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Map & Suggestions (Desktop) */}
        <div className="hidden md:block w-2/5 lg:w-1/3 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl z-10 relative">
          {/* Mock Map Area */}
          <div className="h-1/2 relative bg-blue-50 border-b border-slate-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-blue-900">
               <Map size={32} className="mb-3 text-blue-600" />
               <h3 className="font-bold text-lg">Map Overview</h3>
               <p className="text-sm mt-1 text-blue-700/80">Premium members can see multi-day interactive routing here.</p>
               <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700">Unlock Map</Button>
            </div>
          </div>
          
          <div className="h-1/2 p-6 overflow-y-auto">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center">
               Smart Suggestions <span className="ml-2 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">AI</span>
             </h3>
             <div className="space-y-4">
               {[
                 { t: 'Montmartre Walk', d: 'Iconic neighborhood', i: Navigation, c: 'text-purple-500', b: 'bg-purple-50' },
                 { t: 'Seine River Cruise', d: 'Sunset views', i: MapPin, c: 'text-blue-500', b: 'bg-blue-50' }
               ].map((item, idx) => (
                 <Card key={idx} hoverEffect className="p-3 border-slate-100 flex justify-between items-center cursor-grab">
                   <div className="flex items-center space-x-3">
                     <div className={`p-2 rounded-lg ${item.b} ${item.c}`}>
                        <item.i size={16} />
                     </div>
                     <div>
                       <p className="font-semibold text-slate-800 text-sm">{item.t}</p>
                       <p className="text-xs text-slate-500">{item.d}</p>
                     </div>
                   </div>
                   <div className="text-slate-300">
                      <GripVertical size={16} />
                   </div>
                 </Card>
               ))}
             </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default SmartPlanner;
