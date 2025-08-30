import React from 'react';

const Certifications = () => {
    // Certification data. I have updated this to include only the Oracle certificate.
    const certifications = [
        {
            title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
            image: '/1oracle.jpg'
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

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight animate-fade-in-up"
                    >
                        My Professional Certification
                    </h1>
                    <p
                        className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200"
                    >
                        This is the certification I have earned to validate my skills and expertise.
                    </p>
                </div>

                {/* Certifications Grid - now contains a single card */}
                <div className="grid grid-cols-1 gap-8 relative max-w-lg mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className={`
                                bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700
                                transition-all duration-300 cursor-pointer overflow-hidden relative group
                                transform hover:scale-105
                                animate-fade-in-up-delay-${index}
                            `}
                            role="button"
                            aria-label={`View ${cert.title} certificate`}
                            tabIndex={0}
                        >
                            <div className="relative z-10">
                                <div
                                    className="w-full mb-6 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 animate-fade-in delay-300"
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
            `}</style>
        </section>
    );
};

const App = () => {
    return <Certifications />;
};

export default App;
