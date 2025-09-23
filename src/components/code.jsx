import React, { useState } from 'react';

const Certifications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (imageSrc) => {
        // Prevent modal from opening on screens smaller than 768px (Tailwind's md breakpoint)
        if (window.innerWidth < 768) {
            return;
        }

        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Certification data
    const certifications = [
        {
            title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
            image: '/1oracle.jpg'
        },
        {
            title: 'Android Developer Virtual Internship',
            image: '/android.jpg'
        },
        {
            title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
            image: '/devops.jpg'
        }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-16 transition-colors duration-300 relative overflow-hidden font-sans">
            {/* Particles background simulation using CSS animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="particle animate-particle-1"></div>
                <div className="particle animate-particle-2"></div>
                <div className="particle animate-particle-3"></div>
                <div className="particle animate-particle-4"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
                {/* Main Content */}
                <div className="text-center mb-12">
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight relative inline-block animate-fade-in-up"
                    >
                        My Professional Certifications
                        <div className="animated-line"></div>
                    </h1>
                    <p
                        className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200"
                    >
                        These are the certifications I have earned to validate my skills and expertise.
                    </p>
                </div>

                {/* Certifications Grid - three cards in a row with increased width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative w-full mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className={`
                                bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700
                                transition-all duration-300 cursor-pointer overflow-hidden relative group
                                transform hover:scale-105
                                animate-fade-in-up-delay-${index}
                                w-full
                            `}
                            onClick={() => openModal(cert.image)}
                            role="button"
                            aria-label={`View ${cert.title} certificate`}
                            tabIndex={0}
                        >
                            <div className="relative z-10">
                                <div
                                    className="w-full mb-6 aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 animate-fade-in delay-300"
                                >
                                    <img
                                        src={cert.image}
                                        alt={`${cert.title} certificate`}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                                    {cert.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Image Preview */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
                    onClick={closeModal}
                >
                    <div
                        className="w-screen h-screen flex items-center justify-center p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Certificate preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }

                ${certifications.map((_, index) => `
                    .animate-fade-in-up-delay-${index} {
                        animation: fadeInUp 0.6s ease-out ${index * 0.1}s forwards;
                        opacity: 0;
                    }
                `).join('')}

                /* Particle animation styles */
                @keyframes moveParticles {
                    0% { transform: translate(0, 0); opacity: 0.5; }
                    25% { transform: translate(25vw, 15vh); opacity: 0.8; }
                    50% { transform: translate(50vw, 30vh); opacity: 0.6; }
                    75% { transform: translate(75vw, 15vh); opacity: 0.7; }
                    100% { transform: translate(100vw, 0); opacity: 0.5; }
                }

                .particle {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(8px);
                    opacity: 0;
                }

                .animate-particle-1 {
                    width: 20px; height: 20px;
                    background: #4B5EAA;
                    top: 10%; left: 5%;
                    animation: moveParticles 20s ease-in-out infinite alternate;
                }

                .animate-particle-2 {
                    width: 30px; height: 30px;
                    background: #8A4AF3;
                    top: 40%; left: 80%;
                    animation: moveParticles 25s ease-in-out infinite alternate-reverse;
                }

                .animate-particle-3 {
                    width: 25px; height: 25px;
                    background: #F3A4B4;
                    top: 70%; left: 20%;
                    animation: moveParticles 18s ease-in-out infinite alternate;
                }
                .animate-particle-4 {
                    width: 35px; height: 35px;
                    background: #4B5EAA;
                    top: 90%; left: 40%;
                    animation: moveParticles 22s ease-in-out infinite alternate-reverse;
                }

                /* Animated line styles */
                .animated-line {
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #4B5EAA, #8A4AF3);
                    border-radius: 2px;
                    animation: drawLine 1.5s ease-out forwards;
                }

                @keyframes drawLine {
                    to {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

const App = () => {
    return <Certifications />;
};

export default App;