import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, ListTodo, Plus, FileText, Check } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ChecklistNotes = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Passports & Visas', category: 'Documents', done: true },
    { id: 2, text: 'Travel Insurance', category: 'Documents', done: true },
    { id: 3, text: 'Universal Adapter', category: 'Electronics', done: false },
    { id: 4, text: 'Comfortable Walking Shoes', category: 'Clothing', done: false },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const progress = Math.round((items.filter(i => i.done).length / items.length) * 100);

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto h-[calc(100vh-64px)] overflow-hidden flex flex-col">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
            Checklist & Notes <CheckSquare className="ml-3 text-slate-400" size={28} />
          </h1>
          <p className="text-slate-500">Keep track of what you need and jot down important ideas.</p>
        </motion.div>

        <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
           {/* Checklist Panel */}
           <Card className="w-full md:w-1/2 flex flex-col border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <div>
                   <h3 className="font-bold text-slate-800 flex items-center">
                      <ListTodo size={18} className="mr-2 text-primary" /> Packing Checklist
                   </h3>
                   <p className="text-sm text-slate-500 mt-1">{progress}% completed</p>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center relative">
                    <svg className="w-full h-full absolute top-0 left-0 -rotate-90">
                       <circle cx="28" cy="28" r="26" fill="transparent" strokeWidth="4" className="text-primary" stroke="currentColor" strokeDasharray="163" strokeDashoffset={163 - (163 * progress) / 100} />
                    </svg>
                    <span className="text-xs font-bold text-slate-700">{progress}%</span>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                 <div className="space-y-1 mt-2 mx-4">
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${item.done ? 'bg-slate-50' : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'}`}
                      >
                         <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${item.done ? 'bg-primary border-primary text-white' : 'border-slate-300'}`}>
                               {item.done && <Check size={14} />}
                            </div>
                            <span className={`font-medium ${item.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                               {item.text}
                            </span>
                         </div>
                         <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {item.category}
                         </span>
                      </div>
                    ))}
                 </div>
                 <div className="px-6 py-4 mt-2">
                    <Button variant="ghost" className="w-full text-slate-500 hover:text-primary hover:bg-blue-50 border border-dashed border-slate-300">
                       <Plus size={18} className="mr-2" /> Add Item
                    </Button>
                 </div>
              </div>
           </Card>

           {/* Notes Panel */}
           <Card className="w-full md:w-1/2 flex flex-col border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-amber-50">
                 <h3 className="font-bold text-amber-900 flex items-center">
                    <FileText size={18} className="mr-2 text-amber-600" /> Trip Notes
                 </h3>
                 <p className="text-sm text-amber-700/70 mt-1">Free-form context for your trip.</p>
              </div>
              <div className="flex-1 p-6 bg-white relative">
                 <textarea 
                   className="w-full h-full bg-transparent resize-none outline-none text-slate-700 leading-relaxed"
                   placeholder="Type your notes here... e.g. Train to Versailles leaves from Line C."
                   defaultValue={`- Remember to book the museum tickets ahead of time, usually crowded.\n- Call hotel to arrange early check-in.\n- Recommend buying the Paris Pass on day 1.`}
                 />
                 <div className="absolute bottom-4 right-6 text-xs text-slate-400 font-medium">
                    Last edited 2 hours ago
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChecklistNotes;
