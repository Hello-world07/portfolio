import React from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/image1.jpg'; // Replace with your profile picture path
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
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-[0_0_12px_rgba(59,130,246,0.4),0_0_24px_rgba(59,130,246,0.2)] mb-4 sm:mb-6 hover:scale-[1.06] transition-transform duration-300 ease-out will-change-transform focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
          />
          {/* Name below profile image */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            pranith konda
          </h2>
          {/* Centered Social Media Icons */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="https://www.linkedin.com/in/konda-pranith-699916317/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                <path d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z" fill=""/>
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-[#006699] z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="https://github.com/Hello-world07"
              target="_blank"
              rel="noopener noreferrer"
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
            >
              <svg className="fill-gray-900 relative z-10 transition-all duration-300 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72" fill="none">
                <path d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z" fill="" />
              </svg>
              <div className="absolute top-full left-0 w-full h-full rounded-full bg-black z-0 transition-all duration-500 group-hover:top-0"></div>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden bg-white shadow-md shadow-gray-200 group transition-all duration-300"
              href="mailto:pranithkondakp@gmail.com"
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

        {/* Right Side: Scrollable Text Sections */}
        <div className="lg:w-2/3 lg:ml-[33.33%]">
          {/* About Section */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-poppins heading-underline animate-heading">
            About Me 🧑‍💻
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

  {/* OCI Data Science */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Oracle Cloud Infrastructure 2025 – Certified Data Science Professional
      </span>
    </span>
    <br />
    Demonstrates expertise in machine learning and data science on OCI.
  </p>

  {/* Android Internship */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Android Developer Virtual Internship – Google for Developers
      </span>
    </span>
    <br />
    Practical experience in building robust Android applications.
  </p>

  {/* OCI DevOps */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Oracle Cloud Infrastructure 2025 – Certified DevOps Professional
      </span>
    </span>
    <br />
    Proficiency in implementing CI/CD pipelines and DevOps practices on OCI.
  </p>

  {/* CineHack.AI */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Certificate of Appreciation – CineHack.AI
      </span>
    </span>
    <br />
    Recognized for contributions and innovative solutions at CineHack.AI.
  </p>

  {/* Meta Python */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Programming in Python – Meta (Coursera)
      </span>
    </span>
    <br />
    Foundational knowledge and practical skills in Python programming.
  </p>

  {/* Tribe Codeathon */}
  <p className="mt-4">
    <span className="highlight-wrapper">
      <span className="font-semibold text-black dark:text-white box-highlight">
        Tribe Codeathon Participation
      </span>
    </span>
    <br />
    Successfully participated in the Tribe Codeathon conducted by Student Tribe on
    October 25th, 2025.
  </p>

</div>
 
          {/* Projects Button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              onClick={handleProjectsClick}
              className="rounded-md flex items-center border border-slate-300 dark:border-gray-600 py-2 px-4 sm:py-3 sm:px-6 text-center text-sm sm:text-base transition-all shadow-sm hover:shadow-lg text-slate-600 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-slate-800 dark:hover:bg-gray-800 hover:border-slate-800 dark:hover:border-gray-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none font-poppins font-semibold -ml-4 sm:-ml-6"
            >
              Explore My Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;