import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'sonner';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      login({ id: '1', fullName: 'Shreya Parikh', email: 'shreya@example.com' });
      toast.success('Welcome back to Traveloop!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Left side: Form */}
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
              <span className="font-bold text-2xl tracking-tight text-slate-800 dark:text-white">Traveloop.</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-slate-600 dark:text-slate-400">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-blue-500 dark:text-blue-400">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" size="lg" isLoading={isLoading}>
              Sign in <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-blue-500 dark:text-blue-400 transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 p-12 max-w-lg text-white"
        >
          <h2 className="text-4xl font-bold mb-6 leading-tight">Start planning your dream vacation today.</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of travelers who use Traveloop to organize their itineraries, track expenses, and discover new experiences.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
