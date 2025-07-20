import { Brain, Zap, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-cyan-400" />,
      title: "Personalized AI Nudges",
      description: "Smart reminders and suggestions tailored to your learning patterns and goals."
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-400" />,
      title: "Auto-generated Flashcards & Quizzes",
      description: "AI creates custom study materials from your content to reinforce key concepts."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-cyan-400" />,
      title: "Real-Time Performance Insights",
      description: "Track your progress and identify knowledge gaps with detailed analytics."
    }
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Supercharge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Learning</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of personalized education with AI-powered study optimization.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;