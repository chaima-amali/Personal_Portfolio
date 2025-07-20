import React from 'react';
import { Mail, ArrowRight, Code, Database, Layers, Download } from 'lucide-react';
import hero from '../assets/hero.jpg';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Hi, I'm <span className="text-blue-400">Chaima</span>
              </h1>
              
              <div className="space-y-4 text-lg sm:text-xl text-gray-300">
                <p>
                  I'm a <span className="text-white font-semibold">full-stack developer</span> with{' '}
                  <span className="text-blue-400 font-semibold">2 years</span>
                </p>
                <p>
                  of experience using{' '}
                  <span className="inline-flex items-center gap-1">
                    <Code size={20} className="text-blue-400" />
                    <span className="text-white font-semibold">React vite</span>
                  </span>{' '}
                  and{' '}
                  <span className="inline-flex items-center gap-1">
                    <Database size={20} className="text-green-400" />
                    <span className="text-white font-semibold">MongoDB</span>
                  </span>.
                </p>
                <p>
                  Reach out if you'd like to learn more!
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <a 
                href="mailto:chaimaamali47@gmail.com?subject=Hello Chaima&body=Hi Chaima, I'd like to get in touch with you about..."
                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-3"
              >
                <Mail size={20} />
                <span>Contact Me</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <a 
                href="/cv.pdf" 
                download
                className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-3"
              >
                <Download size={20} />
                <span>Download CV</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Tech Stack Icons */}
            <div className="flex justify-center lg:justify-start space-x-6 pt-8">
              <div className="flex items-center space-x-2 text-blue-400">
                <Code size={24} />
                <span className="text-sm font-medium text-gray-300">React</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Database size={24} />
                <span className="text-sm font-medium text-gray-300">MongoDB</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Layers size={24} />
                <span className="text-sm font-medium text-gray-300">Full-Stack</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Background Circle */}
              <div className="w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl animate-pulse"></div>
              
              {/* Image Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl animate-pulse">
                  <img 
                    src={hero} 
                    alt="chaima - Full Stack Developer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-10 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;