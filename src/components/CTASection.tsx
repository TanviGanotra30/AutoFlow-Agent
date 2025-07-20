import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6">
          <Sparkles className="w-12 h-12 mx-auto text-cyan-400 animate-pulse" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Transform</span> Your Learning?
        </h2>
        
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join thousands of students who have already revolutionized their study experience with NeuroNudge.
        </p>
        
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 animate-pulse"
        >
          Start Learning Smarter Today
          <ArrowRight className="ml-3 w-6 h-6" />
        </Button>
        
        <p className="text-sm text-slate-400 mt-6">
          Free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;