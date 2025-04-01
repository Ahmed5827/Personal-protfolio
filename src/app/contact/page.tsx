'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from './schema';
import { toast, Toaster } from 'react-hot-toast';
import { FaLinkedin, FaGithub, FaFacebookSquare } from "react-icons/fa";

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
      } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
      });

      const onSubmit = async (data: ContactFormData) => {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_name: data.name,
              user_email: data.email,
              message: data.message
            })
          });
    
          const result = await response.json();
    
          if (!response.ok) {
            throw new Error(result.error || 'Failed to send message');
          }
    
          toast.success('Message sent successfully!');
          reset();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to send message');
          console.error('Submission error:', error);
        }
      };

  return (
    <div className="h-screen mt-10 flex flex-col items-center">
      <Toaster />
      <h1 className="text-4xl font-bold mx-10 mb-12 text-center text-gray-400">
        Contact me
      </h1>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-base-200 border border-base-300 p-6 rounded-lg shadow-lg w-100 max-w-md"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">Get in Touch</h2>

        <div className="form-control mb-4">
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
        </div>

        <div className="form-control mb-4">
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
        </div>

        <div className="form-control mb-4">
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
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
      
      <footer className="mt-8 text-gray-400 flex justify-center gap-6">
        <a target="_blank" href="https://www.linkedin.com/in/ahmed-chebbi-69339319b/" rel="noopener noreferrer">
          <FaLinkedin 
            size={35} 
            className="hover:text-[#0A66C2] transition-colors duration-300" 
          />
        </a>
        <a target="_blank" href="https://github.com/Ahmed5827" rel="noopener noreferrer">
          <FaGithub 
            size={35} 
            className="hover:text-[#181717] dark:hover:text-gray-300 transition-colors duration-300" 
          />
        </a>
        <a target="_blank" href="https://www.facebook.com/ahmed.chebbi.14855/" rel="noopener noreferrer">
          <FaFacebookSquare 
            size={35} 
            className="hover:text-[#1877F2] transition-colors duration-300" 
          />
        </a>
      </footer>
    </div>
  );
}