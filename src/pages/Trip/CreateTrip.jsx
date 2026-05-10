import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, MapPin, Calendar as CalendarIcon, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/planner/builder');
    }, 800);
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Plan a New Trip</h1>
          <p className="text-slate-500">Let's start by getting the basic details down.</p>
        </motion.div>

        <Card className="p-8 border-slate-100">
           <form onSubmit={handleSave} className="space-y-6">
             {/* Cover Image Upload Area */}
             <div className="relative w-full h-48 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-primary transition-colors cursor-pointer group overflow-hidden">
                <ImagePlus size={32} className="mb-2 group-hover:text-primary transition-colors" />
                <span className="font-medium">Upload Cover Image</span>
                <span className="text-xs mt-1">Optional, JPG/PNG up to 5MB</span>
             </div>

             <Input 
                label="Trip Name" 
                placeholder="e.g. Summer in Tokyo 🌸" 
                icon={MapPin} 
                required 
             />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Start Date" 
                  type="date" 
                  icon={CalendarIcon} 
                  required 
                />
                <Input 
                  label="End Date" 
                  type="date" 
                  icon={CalendarIcon} 
                  required 
                />
             </div>

             <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none text-slate-400">
                    <AlignLeft size={18} />
                  </div>
                  <textarea 
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 min-h-[100px] resize-none"
                    placeholder="Briefly describe what this trip is about..."
                  />
                </div>
             </div>

             <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
                   Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isLoading} className="px-8">
                   Save & Continue
                </Button>
             </div>
           </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateTrip;
