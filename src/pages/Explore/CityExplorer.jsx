import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, TrendingUp, DollarSign, Plus } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const CityCard = ({ city, country, image, cost, trending, tag }) => (
  <Card hoverEffect className="overflow-hidden border-none cursor-pointer group">
    <div className="relative h-48">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${image}')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      <div className="absolute top-3 left-3">
        {tag && <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-semibold">{tag}</span>}
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
        <div>
          <h3 className="text-white font-bold text-xl">{city}</h3>
          <p className="text-slate-300 text-sm flex items-center">
            <MapPin size={12} className="mr-1" /> {country}
          </p>
        </div>
        <div className="flex space-x-1">
           {[...Array(cost)].map((_, i) => <DollarSign key={i} size={14} className="text-amber-400" />)}
        </div>
      </div>
    </div>
    <div className="p-4 bg-white flex justify-between items-center border-t border-slate-100">
       <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
         <TrendingUp size={14} className="mr-1" /> {trending}% Match
       </div>
       <Button variant="secondary" size="sm" className="hidden group-hover:flex shadow-sm absolute right-4 bottom-4">
         <Plus size={16} />
       </Button>
    </div>
  </Card>
);

const CityExplorer = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Europe', 'Asia', 'Budget', 'Luxury', 'Adventure'];

  const cities = [
    { city: 'Kyoto', country: 'Japan', cost: 3, trending: 98, tag: 'Culture', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop' },
    { city: 'Barcelona', country: 'Spain', cost: 2, trending: 94, tag: 'Architecture', image: 'https://images.unsplash.com/photo-1583422409516-2895a77ef2dd?q=80&w=2070&auto=format&fit=crop' },
    { city: 'Bali', country: 'Indonesia', cost: 1, trending: 89, tag: 'Nature', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop' },
    { city: 'New York', country: 'USA', cost: 4, trending: 85, tag: 'Nightlife', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop' },
    { city: 'Rome', country: 'Italy', cost: 3, trending: 92, tag: 'History', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop' },
    { city: 'Reykjavik', country: 'Iceland', cost: 4, trending: 78, tag: 'Adventure', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2159&auto=format&fit=crop' },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Explore Destinations</h1>
          <p className="text-slate-500">Discover new cities and add them directly to your itinerary.</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <input 
               type="text" 
               placeholder="Where to next?" 
               className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
             />
           </div>
           <Button variant="secondary" className="flex items-center px-6 shadow-sm">
             <Filter size={18} className="mr-2" /> Filters
           </Button>
        </div>

        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
           {filters.map((f, i) => (
             <button
               key={i}
               onClick={() => setActiveFilter(f)}
               className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                 activeFilter === f 
                   ? 'bg-slate-800 text-white shadow-md' 
                   : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
               }`}
             >
               {f}
             </button>
           ))}
        </div>

        {/* Cities Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
           {cities.map((city, idx) => (
             <CityCard key={idx} {...city} />
           ))}
        </motion.div>

      </div>
    </AppLayout>
  );
};

export default CityExplorer;
