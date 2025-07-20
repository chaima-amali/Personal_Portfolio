import React from 'react';
import { motion } from 'framer-motion';
import ensia from '../assets/ensia.png'; 
import html from '../assets/html.png';
import css from '../assets/css.png';
import react from '../assets/react.png';
import express from '../assets/express.jpg';
import sql from '../assets/sql.jpg';
import mongodb from '../assets/mongodb.png';
import python from '../assets/python.jpg';
import php from '../assets/php.jpg';
import cpp from '../assets/c++.jpg';
import figma from '../assets/figma.png';

const ExperienceComponent = () => {
  const techStack = [
    { name: 'HTML', icon: html },
    { name: 'CSS', icon: css },
    { name: 'React', icon: react },
    { name: 'Express.js', icon: express },
    { name: 'SQL', icon: sql },
    { name: 'MongoDB', icon: mongodb },
    { name: 'Python', icon: python },
    { name: 'PHP', icon: php },
    { name: 'C++', icon: cpp },
    { name: 'Figma', icon: figma }
  ];

  const experiences = [
    /*{
      company: 'Google',
      logo: '/images/google-logo.png',
      position: 'Software Engineer',
      duration: 'Sept. 2022 - Present',
      achievements: [
        'Worked on Google Maps',
        'Reduced load times by 50%'
      ]
    },
    {
      company: 'Microsoft',
      logo: '/images/microsoft-logo.png',
      position: 'UI Designer',
      duration: 'Aug. 2021 - Aug. 2022',
      achievements: [
        'Worked on Windows 11',
        'Designed the control panel'
      ]
    },
    {
      company: 'Netflix',
      logo: '/images/netflix-logo.png',
      position: 'SWE Intern',
      duration: 'Apr. 2020 - Jun. 2020',
      achievements: [
        'Worked on component library',
        'Helped create UI components'
      ]
    }*/
    {
      company: 'Ensia',
      logo: ensia,
      position: 'AI Student',
      duration: 'Sept. 2023 - Present',
      achievements: [
        ' Implemented a personalized meal planner based on calories, repetition, and taste preferences',
        'Built multiple web apps using React, Vite, and Tailwind CSS as part of coursework and self-initiated projects'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div id='experience' className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            EXPERIENCE
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Tech Stack Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 md:gap-8"
            >
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-slate-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-600 transition-all duration-300 shadow-lg">
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-6 h-6 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-white text-lg font-semibold">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-white text-sm md:text-base font-medium group-hover:text-blue-300 transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Experience Cards Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-white text-sm font-bold">
                      {exp.company.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {exp.position}, {exp.company}
                      </h3>
                      <span className="text-slate-400 text-sm md:text-base">
                        {exp.duration}
                      </span>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + achIndex * 0.1 }}
                          className="text-slate-300 text-sm md:text-base flex items-start gap-2"
                        >
                          <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceComponent;