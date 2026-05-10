import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
                <PlaneTakeoff size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-800">Traveloop.</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
            <p className="text-slate-600">Start planning smarter and faster.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <Input 
              label="Full Name" 
              type="text" 
              placeholder="John Doe" 
              icon={User} 
              required
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="you@example.com" 
              icon={Mail} 
              required
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
              required
            />
            <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={isLoading}>
              Sign up <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-blue-500 transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 p-12 max-w-lg text-white"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">Your world, organized.</h2>
          <p className="text-cyan-100 text-lg mb-8">Build timelines, estimate budgets, and share with friends effortlessly.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
