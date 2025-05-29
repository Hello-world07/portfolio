import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

// A professional, dynamic Skills section with enhanced spacing, visual flow, and responsive design
const Skills = () => {
  const skillsData = [
    {
      category: "Languages & Programming",
      description: "Used in backend services, algorithmic problem solving, and full-stack applications.",
      skills: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      ],
      bgClass: "bg-gray-50 dark:bg-gray-800",
    },
    {
      category: "Frontend Development",
      description: "Crafting responsive UIs, single-page applications, and modern web experiences.",
      skills: [
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      ],
      bgClass: "bg-blue-50 dark:bg-gray-700",
    },
    {
      category: "Backend & Databases",
      description: "Real-time databases, authentication, and data-driven APIs.",
      skills: [
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      ],
      bgClass: "bg-gray-50 dark:bg-gray-800",
    },
    {
      category: "Tools & Platforms",
      description: "Version control, CI/CD workflows, and collaborative development.",
      skills: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      ],
      bgClass: "bg-blue-50 dark:bg-gray-700",
    },
  ];

  const exploringData = [
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  ];

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-custom-dark flex items-center justify-center py-12 sm:py-16 pt-24 transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with adjusted padding */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center heading-underline animate-heading pt-8">
          Technologies I Work With
        </h1>

        {/* Introductory Text with Justified Alignment */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-10 sm:mb-12 text-justify max-w-3xl mx-auto">
          Grounded in <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">practical experience</span> and driven by a <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">passion for innovation</span>, I’ve cultivated a strong and versatile technical foundation that empowers me to build <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">cutting-edge digital solutions</span>. My expertise spans a powerful combination of <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">academic rigor</span> and <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">real-world application</span>, enabling me to craft scalable, high-performance software that delivers <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">business value</span> and <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">user impact</span>.
        </p>

        {/* Skills Grid */}
        <div className="space-y-12 sm:space-y-16">
          {skillsData.map((category, index) => (
            <div key={index} className={`py-8 rounded-lg ${category.bgClass}`}>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 text-center">
                {category.category}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 text-center">
                {category.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-custom-dark-secondary p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-effect"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={skill.logo} alt={`${skill.name} logo`} className="w-8 h-8 sm:w-10 sm:h-10" />
                      <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Exploring Section */}
        <div className="mt-16 sm:mt-20 bg-gray-50 dark:bg-gray-800 py-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
            Currently Exploring
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 text-center">
            Actively upskilling with modern tools to stay ahead in a rapidly evolving tech ecosystem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {exploringData.map((skill, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-custom-dark-secondary p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-effect"
              >
                <div className="flex items-center space-x-3">
                  <img src={skill.logo} alt={`${skill.name} logo`} className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How I Approach Development Section */}
        <div className="mt-16 sm:mt-20 bg-blue-50 dark:bg-gray-700 py-8 rounded-lg max-w-3xl mx-auto">
          <div className="border-t border-gray-300 dark:border-gray-600 w-24 mx-auto mb-6" style={{
            background: 'linear-gradient(to right, #4f46e5, #ec4899)',
            height: '3px',
            borderRadius: '2px',
          }}></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
            💼 How I Approach Development
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-justify">
            My development approach centers on writing <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">clean, modular, and maintainable code</span>, choosing the right tools for the task, and optimizing for <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">performance and readability</span>. I thrive in <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">collaborative, fast-paced environments</span>, embrace new challenges, and continuously refine my skills to stay in sync with <span className="glow-text font-semibold text-indigo-600 dark:text-indigo-400">industry trends</span>.
          </p>
        </div>

        {/* Download Resume Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="/pranith.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="relative inline-block text-sm font-medium text-indigo-700 dark:text-indigo-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 group overflow-hidden hover:scale-105 active:animate-pulse glow-effect mx-auto"
          >
            <span className="absolute inset-0 bg-indigo-100 dark:bg-indigo-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Resume</span>
              <FaFileDownload className="group-hover:animate-icon-bounce text-base" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;