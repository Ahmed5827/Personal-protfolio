"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Projects = () => {
  const projects = [
    {
      title: "Tetris game",
      description: "a desktop Tetris game using java",
      image: "/tetris.png",
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
        "a python software that automate video editing and content creation on instagram",
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
        "a web app that showcases recepies from around the word built with react js",
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
      description: "a web application that retrives quizez",
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
      title: "Image generation with CUDA",
      description:
        "a desktop app that realise image generation locally using the power of CUDA enviroment for nvidia GPU",
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
      title: "Object detection via live feed",
      description:
        "a python program that runs locally and relise object detection using YOLOV8 and shouting them outloud using text to speech",
      image: "/Yolo.png",
      tags: ["Python"],
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
      <div className="grid mb-11  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-8 lg:gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card glass w-96 h-[500px]"
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
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
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