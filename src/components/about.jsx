import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/image1.jpg'; // Replace with your profile picture path
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // Added SiX for the X logo

const About = () => {
  const navigate = useNavigate();

  const handleProjectsClick = () => {
    navigate('/projects'); // Navigate to the Projects route
    // Optional: Scroll to the projects section if on the same page
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to ensure navigation completes
  };

  return (
    <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center pt-16 sm:pt-20 lg:pt-24 py-8 sm:py-12 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Left Side: Fixed Profile Picture, Name, and Social Icons */}
        <div className="lg:w-1/3 flex flex-col items-center fixed top-16 sm:top-20 lg:top-24 left-0 lg:ml-6 h-screen lg:h-auto pt-4 lg:pt-0 px-4 sm:px-6 lg:px-8">
          <img
            src={profilePic}
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover glow-effect mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300"
          />
          {/* Name below profile image */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            pranith konda
          </h2>
          {/* Centered Social Media Icons */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/konda-pranith-699916317/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaLinkedin size={24} className="sm:size-30" />
            </a>
            <a
              href="https://github.com/Hello-world07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaGithub size={24} className="sm:size-30" />
            </a>
            <a
              href="https://x.com/pranith081036"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <SiX size={24} className="sm:size-30" />
            </a>
            <a
              href="mailto:your.pranithkondakp@gmal.com"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaEnvelope size={24} className="sm:size-30" />
            </a>
          </div>
        </div>

        {/* Right Side: Scrollable Text Sections */}
        <div className="lg:w-2/3 lg:ml-[33.33%]">
          {/* About Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins heading-underline animate-heading">
            About Me 🚀
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat">
            Hello! I'm{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                Konda Pranith
              </span>
            </span>
            , a dedicated{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                BTech student
              </span>
            </span>{' '}
            specializing in{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                Computer Science Engineering (CSE)
              </span>
            </span>{' '}
            at ACE Engineering College, Ghatkesar. I have a strong passion for{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                programming
              </span>
            </span>{' '}
            and{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                problem-solving
              </span>
            </span>
            , and I enjoy exploring new technologies and applying them to real-world scenarios.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat mt-4">
            As an enthusiastic{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                AI learner
              </span>
            </span>{' '}
            and{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                web developer
              </span>
            </span>
            , I’m always looking for opportunities to grow my technical skills. I stay updated with the latest trends in{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                software development
              </span>
            </span>
            ,{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                artificial intelligence
              </span>
            </span>
            , and{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                web technologies
              </span>
            </span>
            . I take pride in writing{' '}
            <span className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                clean, efficient, and scalable code
              </span>
            </span>{' '}
            to build meaningful solutions that make a real impact.
          </p>

          {/* Education Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 sm:mt-8 font-poppins heading-underline animate-heading">
            Education 🎓
          </h3>
          <div className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat">
            <p>
              Completed{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  Diploma in Computer Science Engineering (CSE)
                </span>
              </span>{' '}
              from Vathsalya Institute of Science and Technology, Bhongir, India (2021 – 2024)
            </p>
            <p>
              Graduated with a{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  CGPA of 8.88/10
                </span>
              </span>
            </p>
            <p className="mt-2">Learned important subjects like:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Object-Oriented Programming with Java
                  </span>
                </span>
              </li>
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Python, C, C++
                  </span>
                </span>
              </li>
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Web basics: HTML, CSS, JavaScript
                  </span>
                </span>
              </li>
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Artificial Intelligence and Natural Language Processing
                  </span>
                </span>
              </li>
            </ul>
            <p className="mt-4">
              Currently studying{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  B.Tech in Computer Science Engineering
                </span>
              </span>{' '}
              at ACE Engineering College, Ghatkesar, Telangana, India
            </p>
            <p>
              Now in my{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  2nd year of B.Tech
                </span>
              </span>
            </p>
            <p>
              Focused on gaining{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  practical skills
                </span>
              </span>{' '}
              and{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  knowledge
                </span>
              </span>{' '}
              to solve real-world problems
            </p>
            <p>
              Always eager to learn{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  new technologies
                </span>
              </span>{' '}
              and improve every day
            </p>
            <p className="mt-4">
              I believe education is more than just books and grades. It’s about understanding how to use what you learn to{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  create
                </span>
              </span>
              ,{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  solve problems
                </span>
              </span>
              , and{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  make a difference
                </span>
              </span>
              . With every step in my studies, I’m building the skills and mindset needed to grow in the fast-changing world of technology.
            </p>
          </div>

          {/* Certifications Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 sm:mt-8 font-poppins heading-underline animate-heading">
            Certifications 🏆
          </h3>
          <div className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat">
            <p>
              At the moment, I don’t have any official certifications to share. I’ve completed a{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  3-year diploma in Computer Science Engineering
                </span>
              </span>{' '}
              and I’m currently pursuing my{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  B.Tech
                </span>
              </span>{' '}
              to keep building my skills and knowledge.
            </p>
            <p className="mt-4">
              I believe learning doesn't always need a certificate to show its value. I’ve been actively working on{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  projects
                </span>
              </span>
              , improving my{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  coding skills
                </span>
              </span>
              , and exploring{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  new technologies
                </span>
              </span>
              . Still, I do plan to earn certifications that match my interests and goals.
            </p>
            <p className="mt-2">Certifications I plan to take soon:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Python Programming
                  </span>
                </span>
              </li>
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Java Development
                  </span>
                </span>
              </li>
              <li>
                <span className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Web Development (HTML, CSS, JavaScript)
                  </span>
                </span>
              </li>
            </ul>
            <p className="mt-4">
              As I complete them, I’ll update this section.{' '}
              <span className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  Learning is a journey
                </span>
              </span>
              , and I’m just getting started.
            </p>
          </div>

          {/* Projects Button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              onClick={handleProjectsClick}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg glow-effect hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-sm sm:text-base font-poppins relative overflow-hidden group -ml-4 sm:-ml-6"
            >
              <span className="relative z-10">Explore My Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;