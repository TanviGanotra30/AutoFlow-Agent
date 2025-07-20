const TechStackSection = () => {
  const techStack = [
    { name: "React", color: "from-blue-400 to-cyan-500" },
    { name: "Flask", color: "from-green-400 to-emerald-500" },
    { name: "OpenAI", color: "from-purple-400 to-pink-500" },
    { name: "MongoDB", color: "from-green-500 to-teal-500" },
    { name: "Firebase", color: "from-yellow-400 to-orange-500" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Modern Tech</span>
          </h2>
          <p className="text-lg text-slate-300">
            Built with cutting-edge technologies for optimal performance and scalability.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className="px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <span className={`text-lg font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;