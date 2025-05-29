import React from 'react';
import profilePic from '../assets/image.jpg'; // Replace with your profile picture path
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const About = () => {
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
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaLinkedin size={24} className="sm:size-30" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaGithub size={24} className="sm:size-30" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
            >
              <FaTwitter size={24} className="sm:size-30" />
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
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                Konda Pranath
              </span>
            </div>
            , a dedicated{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                BTech student
              </span>
            </div>{' '}
            specializing in{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                Computer Science Engineering (CSE)
              </span>
            </div>{' '}
            at ACE Engineering College, Ghatkesar. I have a strong passion for{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                programming
              </span>
            </div>{' '}
            and{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                problem-solving
              </span>
            </div>
            , and I enjoy exploring new technologies and applying them to real-world scenarios.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat mt-4">
            As an enthusiastic{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                AI learner
              </span>
            </div>{' '}
            and{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                web developer
              </span>
            </div>
            , I’m always looking for opportunities to grow my technical skills. I stay updated with the latest trends in{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                software development
              </span>
            </div>
            ,{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                artificial intelligence
              </span>
            </div>
            , and{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                web technologies
              </span>
            </div>
            . I take pride in writing{' '}
            <div className="highlight-wrapper">
              <span className="font-semibold text-black dark:text-white box-highlight">
                clean, efficient, and scalable code
              </span>
            </div>{' '}
            to build meaningful solutions that make a real impact.
          </p>

          {/* Education Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 sm:mt-8 font-poppins heading-underline animate-heading">
            Education 🎓
          </h3>
          <div className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-montserrat">
            <p>
              Completed{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  Diploma in Computer Science Engineering (CSE)
                </span>
              </div>{' '}
              from Vathsalya Institute of Science and Technology, Bhongir, India (2021 – 2024)
            </p>
            <p>
              Graduated with a{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  CGPA of 8.88/10
                </span>
              </div>
            </p>
            <p className="mt-2">Learned important subjects like:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Object-Oriented Programming with Java
                  </span>
                </div>
              </li>
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Python, C, C++
                  </span>
                </div>
              </li>
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Web basics: HTML, CSS, JavaScript
                  </span>
                </div>
              </li>
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Artificial Intelligence and Natural Language Processing
                  </span>
                </div>
              </li>
            </ul>
            <p className="mt-4">
              Currently studying{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  B.Tech in Computer Science Engineering
                </span>
              </div>{' '}
              at ACE Engineering College, Ghatkesar, Telangana, India
            </p>
            <p>
              Now in my{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  2nd year of B.Tech
                </span>
              </div>
            </p>
            <p>
              Focused on gaining{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  practical skills
                </span>
              </div>{' '}
              and{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  knowledge
                </span>
              </div>{' '}
              to solve real-world problems
            </p>
            <p>
              Always eager to learn{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  new technologies
                </span>
              </div>{' '}
              and improve every day
            </p>
            <p className="mt-4">
              I believe education is more than just books and grades. It’s about understanding how to use what you learn to{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  create
                </span>
              </div>
              ,{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  solve problems
                </span>
              </div>
              , and{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  make a difference
                </span>
              </div>
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
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  3-year diploma in Computer Science Engineering
                </span>
              </div>{' '}
              and I’m currently pursuing my{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  B.Tech
                </span>
              </div>{' '}
              to keep building my skills and knowledge.
            </p>
            <p className="mt-4">
              I believe learning doesn't always need a certificate to show its value. I’ve been actively working on{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  projects
                </span>
              </div>
              , improving my{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  coding skills
                </span>
              </div>
              , and exploring{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  new technologies
                </span>
              </div>
              . Still, I do plan to earn certifications that match my interests and goals.
            </p>
            <p className="mt-2">Certifications I plan to take soon:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Python Programming
                  </span>
                </div>
              </li>
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Java Development
                  </span>
                </div>
              </li>
              <li>
                <div className="highlight-wrapper">
                  <span className="font-semibold text-black dark:text-white box-highlight">
                    Web Development (HTML, CSS, JavaScript)
                  </span>
                </div>
              </li>
            </ul>
            <p className="mt-4">
              As I complete them, I’ll update this section.{' '}
              <div className="highlight-wrapper">
                <span className="font-semibold text-black dark:text-white box-highlight">
                  Learning is a journey
                </span>
              </div>
              , and I’m just getting started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;