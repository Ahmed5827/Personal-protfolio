"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "./schema";
import { toast, Toaster } from "react-hot-toast";
import { FaLinkedin, FaGithub, FaFacebookSquare } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: data.name,
          user_email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
      console.error("Submission error:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div 
    initial="hidden"
    animate="visible"
    className="min-h-screen pt-30 py-15 flex flex-col items-center"
  >
    <Toaster />
    
    <motion.h1 
      variants={itemVariants}
      className="text-4xl font-bold mx-10 mb-12 text-center text-gray-400"
    >
      Contact me
    </motion.h1>

    <motion.form 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-base-200 border border-base-300 p-6 mx-2 rounded-lg shadow-lg w-100 max-w-md"
    >
      <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-4 text-center">
        Get in Touch
      </motion.h2>

      <motion.div variants={itemVariants} className="form-control mb-4">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
          placeholder="John Doe"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-error text-sm mt-1">{errors.name.message}</span>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="form-control mb-4">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
          placeholder="john.doe@gmail.com"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">{errors.email.message}</span>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="form-control mb-4">
        <label className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea
          className={`textarea h-32 w-full ${errors.message ? 'textarea-error' : ''}`}
          placeholder="Feel free to speak your mind"
          {...register('message')}
        ></textarea>
        {errors.message && (
          <span className="text-error text-sm mt-1">{errors.message.message}</span>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isSubmitting}

        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </motion.div>
    </motion.form>
    
    <motion.footer 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-8 text-gray-400 flex justify-center gap-6"
    >
      <motion.a 
        variants={socialVariants}
        custom={0}
        target="_blank" 
        href="https://www.linkedin.com/in/ahmed-chebbi-69339319b/" 
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
      >
        <FaLinkedin 
          size={35} 
          className="hover:text-[#0A66C2] transition-colors duration-300" 
        />
      </motion.a>
      
      <motion.a 
        variants={socialVariants}
        custom={1}
        target="_blank" 
        href="https://github.com/Ahmed5827" 
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
      >
        <FaGithub 
          size={35} 
          className="hover:text-[#181717] dark:hover:text-gray-300 transition-colors duration-300" 
        />
      </motion.a>
      
      <motion.a 
        variants={socialVariants}
        custom={2}
        target="_blank" 
        href="https://www.facebook.com/ahmed.chebbi.14855/" 
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
      >
        <FaFacebookSquare 
          size={35} 
          className="hover:text-[#1877F2] transition-colors duration-300" 
        />
      </motion.a>
    </motion.footer>
  </motion.div>
  );
}
