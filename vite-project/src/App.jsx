import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import AboutSection from './components/About'
import ExperienceSection from './components/Experience'
import ProjectsSection from './components/Projects'
import ContactComponent from './components/Contact'
function App() {

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <ExperienceSection/>
      <ProjectsSection/>
      <ContactComponent/>
    </div>
      
    
  )
}

export default App