'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Certificates from "../assets/Certificates.json"; // Adjust the path as necessary


const logoPaths = {
    IBM: "/IBM.svg",
    Postman: "/postman.svg",
    Scrum: "/scrumstudy.svg",
    GL: "/greatlearning.webp",
    EFSET: "/EFSET.svg"
  };

const Certifications = () => {
  // Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  const getLogo = (issuer: string) => {
    switch (issuer) {
      case "IBM": return logoPaths.IBM;
      case "Postman": return logoPaths.Postman;
      case "Great Learning": return logoPaths.GL;
      case "SCRUMstudy - Accrediation Body for Scrum and Agile": return logoPaths.Scrum;
      case "EF SET": return logoPaths.EFSET;
      default: return "";
    }
  };

  return (
    <div className="min-h-screen pt-15">
      <h1 className="text-4xl font-bold mx-10 mt-15 mb-12 text-center text-gray-400">
        Certifications
      </h1>
      <motion.div
        className="grid w-full max-w-7xl px-4 mx-auto mb-15 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(Certificates.Certifications).map(([name, details]) => (
          <motion.div
            key={name}
            className="card glass bg-base-100 w-full max-w-96 shadow-sm border border-gray-300"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <figure className="relative h-48">
              <Image
                src={getLogo(details.Issuer)}
                alt={`${name} logo`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl text-center text-blue-500">
                {name}
              </h2>
              <p className="text-white text-sm text-center">
                <strong>Issuer:</strong> {details.Issuer}
              </p>
              <p className="text-white mb-4 text-sm text-center">
                <strong>Date:</strong> {details.Date}
              </p>
              {details.Credential && (
                <div className="card-actions justify-center">
                  <a
                    href={details.Credential}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">View Certificate</button>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Certifications;