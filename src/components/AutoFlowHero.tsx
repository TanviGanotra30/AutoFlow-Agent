import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Zap, Brain, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const techLogos = [
  { name: 'LangChain', icon: '🦜', color: 'text-green-400' },
  { name: 'Puppeteer', icon: '🎭', color: 'text-blue-400' },
  { name: 'Pinecone', icon: '🌲', color: 'text-purple-400' },
  { name: 'OpenAI', icon: '🤖', color: 'text-cyan-400' },
  { name: 'React', icon: '⚛️', color: 'text-blue-300' },
  { name: 'Python', icon: '🐍', color: 'text-yellow-400' }
];

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI-Powered Intelligence',
    description: 'LangChain integration with advanced reasoning capabilities'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Web Automation',
    description: 'Puppeteer-driven browser automation for any website'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Lightning Fast',
    description: 'Optimized workflows with intelligent retry mechanisms'
  }
];

const stats = [
  { label: 'Workflows Created', value: '2,500+', icon: '🚀' },
  { label: 'Hours Saved', value: '10,000+', icon: '⏰' },
  { label: 'Success Rate', value: '99.2%', icon: '✅' },
  { label: 'Active Users', value: '1,200+', icon: '👥' }
];

export function AutoFlowHero() {
  const [isDemo, setIsDemo] = useState(false);

  const startDemo = () => {
    setIsDemo(true);
    toast({ 
      title: 'Demo Started', 
      description: 'Watch AutoFlow Agent in action!' 
    });
    
    setTimeout(() => {
      setIsDemo(false);
      toast({ 
        title: 'Demo Complete', 
        description: 'Ready to build your own automation?' 
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Powered by Advanced AI</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            AutoFlow Agent
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
            Intelligent automation that thinks, adapts, and executes
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Harness the power of LLM + web automation to create workflows that understand context, 
            handle exceptions, and deliver results with human-like intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={startDemo}
              disabled={isDemo}
            >
              {isDemo ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                  Running Demo...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Try Live Demo
                </>
              )}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-500/30 hover:bg-blue-500/10 px-8 py-6 text-lg font-semibold"
            >
              View Documentation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-6">Powered by cutting-edge technology</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {techLogos.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border rounded-lg px-4 py-2 hover:bg-card/80 transition-all duration-300"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className={`font-medium ${tech.color}`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-2 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 hover:border-blue-500/30 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}