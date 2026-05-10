import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, PieChart, TrendingDown, ArrowUpRight, Plus, Receipt } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const BudgetPlanner = () => {
  const totalBudget = 2500;
  const totalSpent = 1850;
  const percentage = (totalSpent / totalBudget) * 100;
  const isWarning = percentage > 85;

  const categories = [
    { name: 'Flights', amount: 450, color: 'bg-blue-500' },
    { name: 'Accommodation', amount: 850, color: 'bg-purple-500' },
    { name: 'Activities', amount: 350, color: 'bg-amber-500' },
    { name: 'Food & Dining', amount: 200, color: 'bg-emerald-500' },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 flex justify-between items-end"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center">
              Budget Planner <Wallet className="ml-3 text-slate-400" size={28} />
            </h1>
            <p className="text-slate-500">Track your trip expenses and stay within budget.</p>
          </div>
          <Button className="shadow-sm bg-slate-900 hover:bg-slate-800 text-white">
             <Plus size={18} className="mr-2" /> Add Expense
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Main Stats */}
           <Card className="p-8 md:col-span-2 border-slate-100 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Spent</p>
                    <h2 className="text-4xl font-extrabold text-slate-900">${totalSpent.toLocaleString()}</h2>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Budget</p>
                    <h3 className="text-xl font-bold text-slate-700">${totalBudget.toLocaleString()}</h3>
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4 relative">
                 <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden flex">
                    {categories.map((c, i) => (
                      <div key={i} className={`${c.color} h-4`} style={{ width: `${(c.amount / totalBudget) * 100}%` }} />
                    ))}
                 </div>
                 
                 {isWarning && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="absolute -bottom-10 right-0 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-semibold flex items-center"
                   >
                     ⚠️ Near Budget Limit
                   </motion.div>
                 )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6">
                 {categories.map((c, i) => (
                   <div key={i} className="flex items-center text-sm font-medium text-slate-600">
                      <span className={`w-3 h-3 rounded-full mr-2 ${c.color}`}></span>
                      {c.name} <span className="ml-2 text-slate-400 font-normal">({((c.amount / totalSpent) * 100).toFixed(0)}%)</span>
                   </div>
                 ))}
              </div>
           </Card>

           {/* Quick Actions */}
           <div className="space-y-6">
              <Card className="p-6 border-slate-100 bg-gradient-to-br from-primary to-blue-600 text-white">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">Remaining</h3>
                    <PieChart size={24} className="text-blue-200" />
                 </div>
                 <p className="text-3xl font-bold mb-2">${(totalBudget - totalSpent).toLocaleString()}</p>
                 <p className="text-blue-100 text-sm">You have safe margin for activities.</p>
              </Card>

              <Card className="p-6 border-slate-100 group cursor-pointer hover:border-emerald-200 transition-colors">
                 <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-emerald-600 font-medium">
                      <TrendingDown size={18} className="mr-2" /> Optimize Budget
                    </div>
                    <ArrowUpRight size={18} className="text-slate-400 group-hover:text-emerald-500" />
                 </div>
                 <p className="text-slate-500 text-sm">AI found $120 savings in activities.</p>
              </Card>
           </div>
        </div>

        {/* Expenses List */}
        <div className="mt-8">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Expenses</h3>
           <Card className="border-slate-100 overflow-hidden">
              <div className="divide-y divide-slate-100">
                 {[
                   { name: 'Delta Airlines (JFK-CDG)', cat: 'Flights', date: 'Oct 1, 2026', amount: 450, color: 'bg-blue-50 text-blue-600' },
                   { name: 'Airbnb - Le Marais', cat: 'Accommodation', date: 'Oct 1, 2026', amount: 850, color: 'bg-purple-50 text-purple-600' },
                   { name: 'Louvre Tickets', cat: 'Activities', date: 'Oct 12, 2026', amount: 45, color: 'bg-amber-50 text-amber-600' }
                 ].map((e, idx) => (
                   <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-4">
                         <div className={`p-3 rounded-xl ${e.color}`}>
                           <Receipt size={20} />
                         </div>
                         <div>
                            <p className="font-bold text-slate-800">{e.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                               <span>{e.cat}</span> • <span>{e.date}</span>
                            </div>
                         </div>
                      </div>
                      <span className="font-bold text-slate-700">
                         ${e.amount.toFixed(2)}
                      </span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

      </div>
    </AppLayout>
  );
};

export default BudgetPlanner;
