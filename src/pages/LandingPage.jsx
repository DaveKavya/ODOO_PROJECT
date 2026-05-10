import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Plane, Clock, Share2, Sparkles, Plus, Wallet, Compass } from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
  >
    <Card hoverEffect className="p-6 h-full border-slate-100 flex flex-col items-start bg-white/60 backdrop-blur-sm">
      <div className="p-3 bg-blue-50 text-primary rounded-xl mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </Card>
  </motion.div>
);

const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-400/20 blur-[120px] pointer-events-none" />

      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">The Modern SaaS for Travel Planning</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Plan Your Trips <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Smarter
              </span> with Traveloop
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Simple travel planning in one place. Replace your spreadsheets with a powerful workspace that brings your itinerary, budget, and activities together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8">
                Start Planning Free
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8">
                See Live Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hero Visuals / Smart Suggestion Card Preview */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative h-[400px] lg:h-[600px] z-10">
          <motion.div style={{ y: y1 }} className="absolute z-20 top-[10%] right-[10%] w-[340px]">
            <Card hoverEffect glass className="p-5 border-white/40">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">Smart Suggestion</h4>
                  <p className="text-xs text-slate-500 font-medium">Based on your interests</p>
                </div>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-700 mb-2">3 Days in Goa 🌴</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">Beaches</span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium">Night Market</span>
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-medium">Adventure Sports</span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800">
                <Plus size={16} className="mr-1" /> Add to Itinerary
              </Button>
            </Card>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute z-10 top-[30%] left-[5%] lg:-left-[10%] w-[300px]">
             <Card glass className="p-4 border-white/40 shadow-2xl">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800">Budget Estimate</h4>
                  <span className="text-primary font-bold bg-blue-50 px-2 py-1 rounded-lg">$1,240</span>
               </div>
               <div className="space-y-3">
                 <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 w-[45%]" />
                 </div>
                 <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>Flights: $450</span>
                    <span>Hotels: $550</span>
                 </div>
               </div>
             </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to plan the perfect trip</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Traveloop combines the power of a spatial canvas, a timeline builder, and smart budgeting into one seamless SaaS platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Map} 
              title="Smart Trip Planner" 
              description="Build your timeline. Drag and drop cities, assign dates, and create an optimized route with ease."
              delay={0}
            />
            <FeatureCard 
              icon={Wallet} 
              title="Budget Estimator" 
              description="Keep finances in check. Categorize expenses, view beautiful charts, and get smart budget warnings."
              delay={0.1}
            />
            <FeatureCard 
              icon={Compass} 
              title="City Explorer" 
              description="Discover new places. View popularity, cost indexes, and seamlessly add activities directly to your schedule."
              delay={0.2}
            />
            <FeatureCard 
              icon={Clock} 
              title="Activity Planner" 
              description="Fill your days. Find food, sightseeing, and adventure activities with duration and cost tags built-in."
              delay={0.3}
            />
            <FeatureCard 
              icon={Share2} 
              title="Collaborative Sharing" 
              description="Travel together. Generate beautiful public read-only links and share your itinerary instantly."
              delay={0.4}
            />
            <FeatureCard 
              icon={Map} 
              title="Smart Notes & Checklist" 
              description="Never forget a thing. Keep track of packing items, important documents, and per-trip contextual notes."
              delay={0.5}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
