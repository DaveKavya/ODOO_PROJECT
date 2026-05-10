import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';
import Button from '../ui/Button';

const PublicNavbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <PlaneTakeoff size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-800">Traveloop.</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-primary font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-primary font-medium transition-colors">How it Works</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/login">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
