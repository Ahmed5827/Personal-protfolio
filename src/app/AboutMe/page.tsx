'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutMe = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        {/* Text Content - Centered and properly spaced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-1/2 p-4 md:pr-8 lg:pr-12"
        >
          <p className="text-xl font-bold text-gray-400">Hey there 👋</p>
          <h1 className="text-4xl mt-2 font-bold text-gray-400">
            Hi, I am Ahmed Chebbi
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-100 space-y-2">
            I am a software engineering student at ISIMM, aiming to graduate
            with the title of Node.js Full Stack engineer.
            <br /><br />
            While I have not yet graduated, I have gained substantial hands-on
            experience through personal and university projects, as well as a
            few internships.
            <br /><br />
            I am eager to continue honing my skills,
            embracing new challenges, and learning from experienced
            professionals in the field.
          </p>
        </motion.div>
        
        {/* Image - Centered with consistent spacing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center p-4 md:pl-8 lg:pl-12"
        >
          <Image
            src="/person.png"
            width={320}
            height={320}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-[#1FABEB]"
            alt="Ahmed Chebbi"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;