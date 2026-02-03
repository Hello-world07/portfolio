import React, { useState, useEffect, memo } from "react";

const TypingEffect = memo(({ text, id }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setStatus(null);

    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > maxChars)
      newErrors.message = `Message exceeds ${maxChars} characters`;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(
        "https://portfoliobackend-4-bj3c.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setCharCount(0);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Frontend Error:", err);
      setStatus("error");
    }

    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section
      className="min-h-screen contact-background flex items-center justify-center py-8 sm:py-12 transition-colors duration-300 pt-24"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <TypingEffect text="Get in Touch" id="contact-heading" />

        <p className="text-base sm:text-lg lg:text-xl text-center text-gray-600 dark:text-gray-200 mb-6 sm:mb-8 font-montserrat">
          I’m always open to new opportunities, collaborations, or just a quick
          tech chat. Feel free to reach out!
        </p>

        <div className="bg-white dark:bg-custom-dark-secondary p-6 sm:p-8 rounded-lg shadow-md glow-effect">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Name"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
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
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@example.com"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
                className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your message here..."
              ></textarea>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {charCount}/{maxChars} characters
                </p>

                <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    style={{ width: `${(charCount / maxChars) * 100}%` }}
                  ></div>
                </div>
              </div>

              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-poppins"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status === "success" && (
              <p className="text-sm text-green-500 text-center mt-2">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-500 text-center mt-2">
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
