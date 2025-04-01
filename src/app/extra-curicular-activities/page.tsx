'use client';

import { motion } from "framer-motion";

const ExtraCuAct = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const entryVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const activities = [
    {
      id: 1,
      date: "Feb 2025 - Present",
      title: "ARSSI Web development Team Leader",
      bullets: [
        "Managing a team of 4 ISIMM students",
        "Assisting team members in learning about basic web development and MERN Stack",
        "Developing a web application for Inventory Management using MERN Stack"
      ]
    },
    {
      id: 2,
      date: "Oct 2024 - Present",
      title: "CPU ISIMM student branch Senior Member",
      bullets: [
        "Contributed to the development of two web projects for Integration Day",
        "Built an AI-powered application using YOLO for object detection",
        "Engaged with new students during Integration Day",
        "Assisted in Express.js training sessions",
        "Supported the logistics team in organizing events",
        "Helped develop the CPU management system using React and Supabase"
      ]
    },
    {
      id: 3,
      date: "Jun 2024 - Present",
      title: "CPU ISIMM Student Branch External Affairs Assistant",
      bullets: [
        "Reached out to national and international clubs for ISIMM Cyberbot 4.0",
        "Successfully secured seven VIP speakers",
        "Supported coordination of committee members",
        "Collaborated with logistics team",
        "Worked with media team for event promotion"
      ]
    },
    {
      id: 4,
      date: "Oct 2023 - Jun 2024",
      title: "CPU ISIMM Student Branch Member",
      bullets: [
        "Attended git and GitHub workshop",
        "Assisted in organizing ISIMM-Cyberbot v3.0",
        "Collaborated on all-terrain playground design",
        "Acted as 'Ami de Groupe' for 6 teams",
        "Attended ENIso Smart Challenge v8.0"
      ]
    },
    {
      id: 5,
      date: "Oct 2023 - Oct 2024",
      title: "IEEE ISIMM Student Branch Member",
      bullets: [
        "Participated in IEEEXtreme 17.0 (7th place)",
        "Participated in TSYP11 SMC challenge (1st place)",
        "Participated in CS4ES (2nd place)",
        "Attended Flutter workshop",
        "Attended computer vision workshop"
      ]
    }
  ];

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-8 w-8"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-screen py-15 px-4 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-400">
        Extra Curricular Activities
      </h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mr-10"
      >
        <ul className="timeline timeline-vertical">
          {activities.map((activity, index) => (
            <motion.li 
              key={activity.id}
              variants={entryVariants}
              whileHover="hover"
              className="flex justify-center mr-45"
            >
              {index !== 0 && <hr />}
              <div className="timeline-start text-lg font-semibold">
                {activity.date}
              </div>
              <div className="timeline-middle">
                <CheckIcon />
              </div>
              <div className="timeline-end timeline-box text-left p-6 w-[150%]">
                <h3 className="text-xl font-medium mb-3">{activity.title}</h3>
                <ul className="list-disc text-base list-inside space-y-1">
                  {activity.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
              {index !== activities.length - 1 && <hr />}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </div>
  );
};

export default ExtraCuAct;