import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactComponent = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: 'chaimaamali@gmail.com',
      href: 'mailto:chaimaamali@gmail.com',
      type: 'email'
    },
    {
      icon: Linkedin,
      label: 'linkedin.com/chaima-amali',
      href: 'https://www.linkedin.com/in/chaima-amali-297815340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      type: 'linkedin'
    },
    {
      icon: Github,
      label: 'github.com/chaima-99',
      href: 'https://github.com/chaima-99',
      type: 'github'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleLinkClick = (href, type) => {
    if (type === 'email') {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left Section - Header */}
          <motion.div
            variants={itemVariants}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-wide"
            >
              Contact
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light"
            >
              Feel free to reach out!
            </motion.p>
          </motion.div>

          {/* Right Section - Contact Links */}
          <motion.div
            variants={containerVariants}
            className="space-y-6"
          >
            {contactLinks.map((contact, index) => {
              const IconComponent = contact.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="group cursor-pointer"
                  onClick={() => handleLinkClick(contact.href, contact.type)}
                >
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-blue-500 transition-all duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <span className="text-lg md:text-xl lg:text-2xl text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                        {contact.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Optional: Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;