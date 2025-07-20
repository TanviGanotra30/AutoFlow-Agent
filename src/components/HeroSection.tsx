import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full filter blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full filter blur-3xl animate-accent-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full filter blur-3xl animate-bounce"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Zap className="w-16 h-16 mx-auto text-primary animate-bounce" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight">
          Automate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Everything</span>,
          <br />Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Faster</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Harness the power of AI agents with web automation to streamline your workflows and boost productivity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 animate-glow-pulse"
          >
            Start Building Flows
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Tech Stack Showcase */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">🦜</span>
            </div>
            <span className="text-sm text-muted-foreground">LangChain</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-secondary font-bold">🎭</span>
            </div>
            <span className="text-sm text-muted-foreground">Puppeteer</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-accent/20 rounded-lg flex items-center justify-center">
              <span className="text-accent font-bold">📌</span>
            </div>
            <span className="text-sm text-muted-foreground">Pinecone</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">⚡</span>
            </div>
            <span className="text-sm text-muted-foreground">FastAPI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;