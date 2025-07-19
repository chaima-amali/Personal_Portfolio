import React from 'react';
import { MousePointer, Database, Layout } from 'lucide-react';
import aboutimg from '../../public/aboutimg.jpg';

const AboutSection = () => {
  const skills = [
    {
      title: "Frontend Developer",
      description: "I'm a front-end developer with experience in building responsive and optimized sites",
      icon: MousePointer,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Backend Developer",
      description: "I have experience developing fast and optimised back-end systems and APIs",
      icon: Database,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "UI Designer",
      description: "I have designed multiple landing pages and have created design systems as well",
      icon: Layout,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <section id="about" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ">
            ABOUT
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Background Card */}
              <div className="w-80 h-96 sm:w-96 sm:h-[400px] bg-slate-800/50 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-700/50 p-8 flex items-center justify-center">
                <div className="w-64 h-80 bg-slate-700/30 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={aboutimg} 
                    alt="About image" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Plant Icon */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/30 animate-bounce">
                <div className="w-8 h-8 bg-green-400 rounded-full"></div>
              </div>
              
              {/* Floating Laptop Icon */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30 animate-pulse">
                <div className="w-8 h-6 bg-slate-400 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Right Content - Skills */}
          <div className="space-y-8 order-1 lg:order-2">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`flex items-start space-x-4 p-6 rounded-2xl ${skill.bgColor} border ${skill.borderColor} hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${skill.bgColor} border ${skill.borderColor} flex items-center justify-center group-hover:animate-pulse`}>
                    <skill.icon size={24} className={`${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="relative mt-20">
          <div className="absolute left-1/4 top-0 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute right-1/3 top-0 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute left-1/2 top-0 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;