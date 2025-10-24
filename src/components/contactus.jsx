import React, { useState, useEffect, memo } from 'react';

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
      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 font-poppins heading-underline animate-heading pt-8"
    >
      {displayedText}
    </h1>
  );
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setStatus(null);
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
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
      className="min-h-screen contact-background flex items-center justify-center py-8 sm:py-12 transition-colors duration-300 pt-24"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <TypingEffect text="Get in Touch" id="contact-heading" />
        <p className="text-base sm:text-lg lg:text-xl text-center text-gray-600 dark:text-gray-200 mb-6 sm:mb-8 font-montserrat">
          I’m always open to new opportunities, collaborations, or just a quick tech chat. Feel free to reach out!
        </p>

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
                className="mt-1 text-sm text-red-500 dark:text-red-400 font-montserrat text-center"
                role="alert"
              >
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </div>

        <div className="mt-6 sm:mt-8">
          <p className="text-sm sm:text-base font-semibold text-center text-gray-700 dark:text-gray-200 mb-2 font-montserrat">
            Follow Me
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="https://www.linkedin.com/in/konda-pranith-699916317/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                <path d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z" 
fill=""/>
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#006699] z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="https://github.com/Hello-world07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" fill=""/>
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="https://x.com/pranith081036"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my X profile"
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                <path d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z" fill="" />
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="mailto:pranithkondakp@gmail.com"
              aria-label="Send me an email"
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="21" viewBox="52 42 88 66" fill="none">
                <path fill="" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
                <path fill="" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
                <path fill="" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
                <path fill="" d="M72 74V48l24 18 24-18v26L96 92"/>
                <path fill="" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-black to-red-600 z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;