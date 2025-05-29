import React, { useState, useEffect, memo } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Animated typing effect component
const TypingEffect = memo(({ text, id }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedText(text);
      return;
    }

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <h1
      id={id}
      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 font-poppins heading-underline animate-heading"
    >
      {displayedText}
    </h1>
  );
});

const ContactUs = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null, 'success', or 'error'
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setStatus(null);
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length > maxChars) newErrors.message = `Message exceeds ${maxChars} characters`;
    return newErrors;
  };

  // Handle form submission with Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xwpodwby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCharCount(0);
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section
      className="min-h-screen contact-background flex items-center justify-center py-8 sm:py-12 transition-colors duration-300"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <TypingEffect text="Get in Touch" id="contact-heading" />
        <p className="text-base sm:text-lg lg:text-xl text-center text-gray-600 dark:text-gray-200 mb-6 sm:mb-8 font-montserrat">
        I’m always open to new opportunities, collaborations, or just a quick tech chat. Feel free to reach out!
        </p>

        {/* Contact Form */}
        <div className="bg-white dark:bg-custom-dark-secondary p-6 sm:p-8 rounded-lg shadow-md glow-effect">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 font-montserrat"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 glow-effect transition-colors duration-300"
                placeholder="Your Name"
                aria-required="true"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 font-montserrat" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 font-montserrat"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 glow-effect transition-colors duration-300"
                placeholder="your.email@example.com"
                aria-required="true"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 font-montserrat" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 font-montserrat"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 glow-effect transition-colors duration-300"
                placeholder="Your message here..."
                aria-required="true"
                aria-describedby="char-count"
              ></textarea>
              <div className="mt-2 flex items-center justify-between">
                <p
                  id="char-count"
                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-montserrat"
                  aria-live="polite"
                >
                  {charCount}/{maxChars} characters
                </p>
                <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${(charCount / maxChars) * 100}%` }}
                  ></div>
                </div>
              </div>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 font-montserrat" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:from-indigo-600 hover:to-purple-700 glow-effect transition-all duration-300 font-poppins"
                aria-label="Submit contact form"
              >
                Send Message
              </button>
            </div>
            {status === 'success' && (
              <p
                className="text-sm sm:text-base text-green-500 dark:text-green-400 font-montserrat text-center"
                role="status"
              >
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p
                className="text-sm sm:text-base text-red-500 dark:text-red-400 font-montserrat text-center"
                role="alert"
              >
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </div>

        {/* Social Media Icons with Follow Me Label */}
        <div className="mt-6 sm:mt-8">
          <p className="text-sm sm:text-base font-semibold text-center text-gray-700 dark:text-gray-200 mb-2 font-montserrat">
            Follow Me
          </p>
          <div className="flex justify-center gap-2 sm:gap-3">
            <a
              href="https://linkedin.com/in/pranithkonda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
              aria-label="Visit my LinkedIn profile"
            >
              <FaLinkedin size={12} className="sm:size-16" />
            </a>
            <a
              href="https://github.com/pranithkonda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
              aria-label="Visit my GitHub profile"
            >
              <FaGithub size={12} className="sm:size-16" />
            </a>
            <a
              href="https://twitter.com/pranithkonda"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
              aria-label="Visit my Twitter profile"
            >
              <FaTwitter size={12} className="sm:size-16" />
            </a>
            <a
              href="mailto:pranith@example.com"
              className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
              aria-label="Send me an email"
            >
              <FaEnvelope size={12} className="sm:size-16" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;