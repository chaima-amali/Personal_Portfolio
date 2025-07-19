import { motion } from 'framer-motion';
import { Smile, ArrowRight } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 text-center space-y-10">
      {/* Tailwind Test */}
      <h1 className="text-4xl font-bold text-blue-600">TailwindCSS is Working 🎉</h1>

      {/* Lucide React Icons */}
      <div className="text-5xl text-green-500 flex justify-center gap-4">
        <Smile />
        <ArrowRight />
      </div>

      {/* AOS Test */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="bg-white p-6 shadow-lg rounded-xl max-w-md mx-auto"
      >
        <p className="text-gray-700">I fade up when you scroll to me (AOS)</p>
      </div>

      {/* Framer Motion Test */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="bg-purple-200 text-purple-800 font-semibold p-4 rounded-lg inline-block"
      >
        Animated with Framer Motion 🚀
      </motion.div>
    </div>
  )
}

export default App
