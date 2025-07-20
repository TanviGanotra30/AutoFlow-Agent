import { Search, Settings, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="w-16 h-16 text-cyan-400" />,
      title: "Analyze",
      description: "AI analyzes your study patterns, performance, and learning preferences to understand your unique needs."
    },
    {
      icon: <Settings className="w-16 h-16 text-blue-400" />,
      title: "Adapt",
      description: "Smart algorithms create personalized study plans, flashcards, and quizzes tailored to your learning style."
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-cyan-400" />,
      title: "Accelerate",
      description: "Receive intelligent nudges and optimized content delivery to maximize retention and learning speed."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Works</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Three simple steps to transform your learning experience with AI-powered optimization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform translate-x-6"></div>
              )}
              
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-slate-900 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;