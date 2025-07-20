import { TrendingUp, Focus, Users } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      value: "65%",
      label: "Increase in Engagement"
    },
    {
      icon: <Focus className="w-8 h-8 text-blue-400" />,
      value: "45%",
      label: "Fewer Distractions"
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      value: "10K+",
      label: "Active Learners"
    }
  ];

  return (
    <section className="py-16 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Results</span>
          </h2>
          <p className="text-lg text-slate-300">
            Join thousands of students who have transformed their learning experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;