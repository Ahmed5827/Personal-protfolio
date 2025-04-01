"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Projects = () => {
  const projects = [
    {
      title: "Tetris game",
      description:
        "A classic Tetris implementation built in Java, featuring a responsive desktop interface developed using Swing.",
      image: "/Tetris.png",
      tags: ["Java"],
      links: [
        {
          label: "Source Code",
          url: "https://github.com/Ahmed5827/Tetris-Game-JAVA",
        },
      ],
    },
    {
      title: "Elite chess",
      description:
        "A Python-based tool designed to streamline video editing and content creation for Instagram. ",
      image: "/header.png",
      tags: ["Python", "Instagram API", "Moviepy"],
      links: [
        {
          label: "Source code",
          url: "https://github.com/Ahmed5827/Elite-Chess",
        },
        {
          label: "instagram",
          url: "https://www.instagram.com/elitechesss?igsh=MmRpbDdkdG96Nnpq&utm_source=qr",
        },
      ],
    },
    {
      title: "Recepie web App",
      description:
        "A dynamic React-based web app that showcases global recipes with search, filtering, and step-by-step guides, powered by a REST API for diverse culinary content.",
      image: "/Recepie.png",
      tags: ["Javascript", "React JS", "The Meal API"],
      links: [
        {
          label: "Source Code",
          url: "https://github.com/Ahmed5827/NomNomNation",
        },
        {
          label: "Web site",
          url: "https://cpu-recepies.vercel.app/SearchByIngredient",
        },
      ],
    },
    {
      title: "Quiz time",
      description: "A web application that retrieves and displays interactive quizzes with real-time scoring, built with React and powered by OpenTrivia API.",
      image: "/Quiz.png",
      tags: ["Javascript", "React JS", "OpenTrivia API", "Google Oauth2"],
      links: [
        {
          label: "Source Code",
          url: "https://github.com/Ahmed5827/Quiz-Time",
        },
      ],
    },
    {
      title: "Desktop GPU-Accelerated Image Generation app",
      description:
        "A desktop application using CUDA and NVIDIA GPU acceleration for high-performance local image generation.",
      image: "/Polar.png",
      tags: ["Python", "Huggingface API", "CUDA"],
      links: [
        {
          label: "Source Code",
          url: "https://github.com/Ahmed5827/Image_Generation",
        },
      ],
    },
    {
      title: "Real-Time Object Detection via live feed",
      description:
        "A Python app that detects objects in real-time via webcam using YOLOv8 and announces them aloud through text-to-speech for offline use.",
      image: "/Yolo.png",
      tags: ["Python"," YOLOv8", "OpenCV", "gTTS"],
      links: [
        {
          label: "Source Code",
          url: "https://github.com/Ahmed5827/Object-Detection",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen mb-1 pt-30 flex flex-col items-center">
      <h1 className="text-5xl text-center mb-8 mx-10 font-bold text-gray-400">
        Projects
      </h1>
      <div className="grid mb-11 px-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8 lg:gap-16 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card ml-2 mr-2 glass w-96 h-[500px] border border-gray-300 shadow-sm"
          >
            <figure>
              <Image
                src={project.image}
                alt={project.title}
                className="h-56 object-fill w-full"
                width={384}
                height={224}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{project.title}</h2>
              <div className="flex gap-1 flex-wrap">
                {project.tags.map((tag) => (
                  <div
                    key={tag}
                    className="badge select-none badge-ghost border-0 hover:bg-slate-500 hover:bg-opacity-50 hover:text-white transition-colors duration-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <p>{project.description}</p>
              <div className="card-actions justify-end">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary">{link.label}</button>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
