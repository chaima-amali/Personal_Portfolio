import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Play } from 'lucide-react';

// Import images and videos from assets folder
import nutriDzairImage from '../assets/NutriDzair.jpeg';
import nutriDzairVideo from '../assets/NutriDzair.mp4';
import studyMateImage from '../assets/StudyMate.png';
import studyMateVideo from '../assets/StudyMate.mp4';
import smartHRImage from '../assets/SmartHR.png';
import smartHRVideo from '../assets/SmartHR.mp4';

const ProjectsComponent = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const projects = [
    {
      id: 1,
      title: "NutriDzair",
      description: "NutriDzair is a personalized nutrition recommendation web app designed for Algerian users. It helps individuals choose healthy, budget-friendly meals by considering dietary needs, allergies, and nutritional goals. Using intelligent search algorithms like A* and UCS,it recommends meals that balance cost, calories, taste, and user preferences.",
      image: nutriDzairImage,
      videoUrl: nutriDzairVideo,
      githubUrl: "https://github.com/chaima-99/NutriDzair",
      techStack: ["React", "Flask", "AI"],
      category: "Full Stack"
    },
    {
      id: 2,
      title: "StudyMate",
      description: "StudyMate is an AI-powered learning platform that transforms self-learning from an isolating, overwhelming experience into a structured, motivating, and adaptive journey. It's designed to support learners who want guidance tailored to their personality, learning style, and goals..",
      image: studyMateImage,
      videoUrl: studyMateVideo,
      githubUrl: "https://github.com/chaima-99/M1",
      techStack: ["React", "Express", "MongoDB","AI"],
      category: "Web App"
    },
    {
      id: 3,
      title: "SmartHR",
      description: "AI-Enhanced HR Management System Web application modernize enterprise human resource processes. The app features secure authentication, facial recognition check-in/out, task and leave management, and predictive analytics for absenteeism and delays. Developed collaboratively using Frontend, Backend, and Data Science skills.",
      image: smartHRImage,
      videoUrl: smartHRVideo,
      githubUrl: "https://github.com/chaima-99/SmartHR",
      techStack: ["React", "PostgreSQL","fastAPI", "AI"],
      category: "Mobile App"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleDemoClick = (project) => {
    setSelectedVideo(project);
  };

  const handleSourceClick = (githubUrl) => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div id='projects' className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            PROJECTS
          </h1>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-xl"
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-52 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Image Fallback */}
                <div className="hidden w-full h-full bg-slate-700 items-center justify-center">
                  <div className="text-center text-slate-400">
                    <div className="w-16 h-16 bg-slate-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      {project.title.charAt(0)}
                    </div>
                    <p className="text-sm">{project.title}</p>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 text-sm md:text-base mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs md:text-sm bg-slate-700 text-white rounded-full border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDemoClick(project)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Demo
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSourceClick(project.githubUrl)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">
                    {selectedVideo.title} - Demo
                  </h3>
                  <button
                    onClick={closeVideoModal}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Video Container */}
                <div className="aspect-video bg-black">
                  <video
                    src={selectedVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Fallback */}
                  <div className="hidden w-full h-full items-center justify-center text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-lg mb-2">Video not available</p>
                      <p className="text-sm text-slate-400">
                        Demo video for {selectedVideo.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {selectedVideo.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-slate-700 text-white rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleSourceClick(selectedVideo.githubUrl)}
                      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsComponent;