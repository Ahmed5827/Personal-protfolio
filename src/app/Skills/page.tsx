'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, SetStateAction } from 'react';
import Image from 'next/image';

const Skills = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTime = useRef(0);
  const [animationKey, setAnimationKey] = useState(0);

  const handleSlideChange = (slideNumber: SetStateAction<number>) => {
    const slideNum = typeof slideNumber === 'number' ? slideNumber : activeSlide;
    if (slideNum < 1) slideNumber = 5;
    if (slideNum > 5) slideNumber = 1;
    
    setActiveSlide(slideNumber);
    setAnimationKey(prev => prev + 1);
    
    if (window.history.pushState) {
      const newUrl = window.location.origin + window.location.pathname + `#slide${slideNumber}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    } else {
      window.location.hash = `slide${slideNumber}`;
    }
    
    const slideElement = document.getElementById(`slide${slideNumber}`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: 'auto' });
    }
  };

  const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash) {
      const slideNumber = parseInt(hash.replace('#slide', ''));
      if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= 5) {
        handleSlideChange(slideNumber);
      }
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheelTime.current < 300) return;
    lastWheelTime.current = now;
    
    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    
    wheelTimeout.current = setTimeout(() => {
      const deltaX = e.deltaX;
      const threshold = 50;
      
      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 1 : -1;
        const nextSlide = activeSlide + direction;
        let targetSlide;
        if (nextSlide < 1) targetSlide = 5;
        else if (nextSlide > 5) targetSlide = 1;
        else targetSlide = nextSlide;
        
        handleSlideChange(targetSlide);
      }
    }, 50);
  };

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    const currentCarouselElement = carouselElement; // Copy ref value

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const hash = window.location.hash;
          let slideNumber = 1;
          
          if (hash) {
            const parsedNumber = parseInt(hash.replace('#slide', ''));
            if (!isNaN(parsedNumber) && parsedNumber >= 1 && parsedNumber <= 5) {
              slideNumber = parsedNumber;
            }
          }
          
          handleSlideChange(slideNumber);
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) observer.observe(carouselRef.current);

    return () => {
      const carouselElementForCleanup = carouselRef.current;
      if (currentCarouselElement) observer.unobserve(currentCarouselElement);
      if (carouselElement) carouselElement.removeEventListener('wheel', handleWheel);
      if (carouselElementForCleanup) observer.unobserve(carouselElementForCleanup);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, [activeSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      let nextSlide;
      if (swipeDistance > 0) {
        nextSlide = activeSlide < 5 ? activeSlide + 1 : 1;
      } else {
        nextSlide = activeSlide > 1 ? activeSlide - 1 : 5;
      }
      handleSlideChange(nextSlide);
    }
  };



  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div 
      className="h-screen w-full  flex flex-col items-center justify-center overflow-hidden"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel w-full h-full">
        {/* Slide 1 - Programming Languages */}
        <div
          id="slide1"
          className={`carousel-item relative w-full h-full flex flex-col items-center justify-center ${activeSlide === 1 ? 'block' : 'hidden'}`}
          // Add this line
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-6 mx-2 md:mx-10 font-bold text-gray-400 mt-16 sm:mt-12 md:mt-8">
            Programming languages
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2 mb-12 mt-4">
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-1`}
            >
              <Image
                src="/erasebg-transformed.webp"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Python"
              />
              <div className="card-body items-center">
                <h1 className="text-3xl font-bold text-center text-white">Python</h1>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-1-1`}
            >
              <Image
                src="/javascript-3.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="JavaScript"
              />
              <div className="card-body items-center">
                <h1 className="text-3xl font-bold text-center text-white">JavaScript</h1>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-1-2`}
            >
              <Image
                src="/typescript.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="TypeScript"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">TypeScript</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-1-3`}
            >
              <Image
                src="/java.webp"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Java"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Java</h5>
              </div>
            </motion.div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="relative  w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(5)}>
              ❮
            </button>
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(2)}>
              ❯
            </button>
          </div>
        </div>

        {/* Slide 2 - Front End Technologies */}
        <div
          id="slide2"
          className={`carousel-item relative w-full h-full flex flex-col items-center justify-center ${activeSlide === 2 ? 'block' : 'hidden'}`}
        >
          <h1 className="text-5xl mb-6 mx-10 font-bold text-gray-400">
            Front End Technologies
          </h1>
          <div className="flex flex-row items-center justify-center space-x-5 flex-wrap space-y-16 sm:space-y-8 md:space-y-4">
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-2-0`}
            >
              <Image
                src="/react.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="React JS"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">React JS</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-2-1`}
            >
              <Image
                src="/next-js.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Next JS"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Next JS</h5>
              </div>
            </motion.div>
            <motion.div
              className="card align-middle m-2"
              style={{ width: "18rem", height: "18rem" }}
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-2-2`}
            >
              <Image
                src="/react-native-logo.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="React Native"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">
                  React Native <br /> 
                </h5>
                <h5 className="text-2xl font-bold text-center text-white">
                (Mobile development)
                </h5>
              </div>
            </motion.div>
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(1)}>
              ❮
            </button>
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(3)}>
              ❯
            </button>
          </div>
        </div>

        {/* Slide 3 - Back-End Technologies */}
        <div
          id="slide3"
          className={`carousel-item relative w-full h-full flex flex-col items-center justify-center ${activeSlide === 3 ? 'block' : 'hidden'}`}
        >
          <h1 className="text-5xl mb-6 mx-10 font-bold text-gray-400">
            Back-End Technologies
          </h1>
          <div className="flex flex-row items-center justify-center space-x-5 flex-wrap space-y-16 sm:space-y-8 md:space-y-4">
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-3-0`}
            >
              <Image
                src="/icons8-express-js-800.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Express JS"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Express JS</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-3-1`}
            >
              <Image
                src="/icons8-flask-800.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Flask"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Flask</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-3-2`}
            >
              <Image
                src="/icons8-django-800.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Django"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Django</h5>
              </div>
            </motion.div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto " onClick={() => handleSlideChange(2)}>
              ❮
            </button>
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto " onClick={() => handleSlideChange(4)}>
              ❯
            </button>
          </div>
        </div>

        {/* Slide 4 - Databases */}
        <div
          id="slide4"
          className={`carousel-item relative w-full h-full flex flex-col items-center justify-center ${activeSlide === 4 ? 'block' : 'hidden'}`}
        >
          <h1 className="text-5xl mb-6 mx-10 font-bold text-gray-400">
            Databases
          </h1>
          <div className="flex flex-row items-center justify-center space-x-5 flex-wrap space-y-16 sm:space-y-8 md:space-y-4">
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-4-0`}
            >
              <Image
                src="/postgresql-logo.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="PostgreSQL"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">PostgreSQL</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-4-1`}
            >
              <Image
                src="/mongodb-logo.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="MongoDB"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">MongoDB</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-4-2`}
            >
              <Image
                src="/oracle-database-removebg-preview.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Oracle Database"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Oracle Database</h5>
              </div>
            </motion.div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(3)}>
              ❮
            </button>
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(5)}>
              ❯
            </button>
          </div>
        </div>

        {/* Slide 5 - Tools */}
        <div
          id="slide5"
          className={`carousel-item relative w-full h-full flex flex-col items-center justify-center ${activeSlide === 5 ? 'block' : 'hidden'}`}
        >
          <h1 className="text-5xl mb-6 mx-10 font-bold text-gray-400">Tools</h1>
          <div className="flex flex-row items-center justify-center space-x-5 flex-wrap space-y-16 sm:space-y-8 md:space-y-4">
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-5-0`}
            >
              <Image
                src="/github-white-icon.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="GitHub"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">GitHub</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={1}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-5-1`}
            >
              <Image
                src="/icons8-docker-800.png"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Docker"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Docker</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={2}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-5-2`}
            >
              <Image
                src="/postman-icon.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Postman"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Postman</h5>
              </div>
            </motion.div>
            <motion.div 
              className="card m-2" 
              style={{ width: "18rem", height: "18rem" }}
              custom={3}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              key={`${animationKey}-5-3`}
            >
              <Image
                src="/nginx.svg"
                width={1000}
                height={1000}
                className="w-72 h-72 object-contain"
                alt="Nginx"
              />
              <div className="card-body items-center">
                <h5 className="text-3xl font-bold text-center text-white">Nginx</h5>
              </div>
            </motion.div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(4)}>
              ❮
            </button>
            <button className="relative w-3 h-10 flex items-center justify-start pointer-events-auto" onClick={() => handleSlideChange(1)}>
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;