'use client'; // Mark as client component to enable client-side interactivity

import React, { useState } from 'react';

/**
 * ContactPage component that provides a contact form with validation and submission handling
 * Uses web3forms API for form submission
 */
export default function ContactPage() {
  // State management for form data and UI states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [successMessage, setSuccessMessage] = useState(''); // Store success message
  const [errorMessage, setErrorMessage] = useState('');     // Store error message

  /**
   * Handle input changes for all form fields
   * @param e - Change event from input or textarea
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle form submission
   * Includes validation and API call to web3forms
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Reset messages from previous submission attempts
    setSuccessMessage('');
    setErrorMessage('');

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all fields before submitting.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit form data to web3forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });

      if (response.ok) {
        // Handle successful submission
        setSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
        // Reset form fields
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Handle API error response
        setErrorMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Submission error:', error);
      setErrorMessage('Oops! Something went wrong. Please try again.');
    } finally {
      // Reset submission state regardless of outcome
      setIsSubmitting(false);
    }
  };

  return (
    // Main container with responsive padding and width
    <div className="max-w-2xl mx-auto py-10 px-4 mt-12">
      <h1 className="text-3xl text-white font-bold text-center mb-6">Contact Me</h1>
      <p className="text-center text-gray-600 mb-6 text-lg">
        Have a question or want to work together? Feel free to reach out!
      </p>

      {/* Conditional rendering of success message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm">
          {successMessage}
        </div>
      )}

      {/* Conditional rendering of error message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg shadow-sm">
          {errorMessage}
        </div>
      )}

      {/* Contact form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white text-black shadow-md rounded-lg p-6 border border-gray-200"
      >
        {/* Name input field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-4 bg-gray-100 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Your Name"
          />
        </div>

        {/* Email input field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-4 bg-gray-100 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="you@example.com"
          />
        </div>

        {/* Message textarea field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 p-4 bg-gray-100 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit button with dynamic styling based on submission state */}
        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white font-semibold transition duration-300 ease-in-out ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}