import React, { useState } from 'react';

const Certifications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');

    const openModal = (imageSrc, title) => {
        setSelectedImage(imageSrc);
        setSelectedTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const certifications = [
        {
            title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
            image: '/1oracle.jpg',
            description: 'Demonstrates expertise in machine learning and data science on OCI.'
        },
        {
            title: 'Android Developer Virtual Internship',
            image: '/android.jpg',
            description: 'Practical experience in building robust Android applications.'
        },
        {
            title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
            image: '/dev.jpg',
            description: 'Proficiency in implementing CI/CD pipelines and DevOps practices on OCI.'
        },
        {
            title: 'Certificate of Appreciation - CineHack.AI',
            image: '/cinehack.jpg',
            description: 'Recognized for contributions and innovative solutions at CineHack.AI.'
        },
        {
            title: 'Programming in Python',
            image: '/python.jpg',
            description: 'Foundational knowledge and practical skills in Python programming.'
        },
        {
            title: 'Tribe Codeathon Participation',
            image: '/tribe-codeathon.jpg', // Save the provided certificate as this file in your public folder
            description: 'Successfully participated in the Tribe Codeathon conducted by Student Tribe on October 25th, 2025.'
        }
    ];

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-800 py-16 sm:py-24 overflow-hidden font-sans text-gray-900 dark:text-gray-100 transition-colors duration-500">
            {/* Subtle background abstract shapes/particles */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
                <div className="absolute top-1/4 left-5% w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-200"></div>
                <div className="absolute top-1/2 right-10% w-52 h-52 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-400"></div>
                <div className="absolute bottom-1/4 left-20% w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-600"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 dark:text-blue-300 mb-4 leading-tight animate-fade-in-up">
                        My Professional Certifications
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up delay-200">
                        These certifications validate my skills and expertise, showcasing a commitment to continuous learning and professional development.
                    </p>
                </div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className={`
                                bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
                                transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl
                                cursor-pointer group flex flex-col items-center text-center
                                animate-fade-in-up-delay-${index}
                            `}
                            onClick={() => openModal(cert.image, cert.title)}
                            role="button"
                            aria-label={`View ${cert.title} certificate`}
                            tabIndex={0}
                        >
                            <div className="relative w-full mb-6 aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 group-hover:border-blue-500 transition-colors duration-300">
                                <img
                                    src={cert.image}
                                    alt={`${cert.title} certificate`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                    <span className="text-white text-sm font-medium">Click to View</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Image Preview */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 sm:p-8 max-w-4xl w-full flex flex-col items-center max-h-[95vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                            {selectedTitle}
                        </h2>
                        <div className="flex-grow flex items-center justify-center w-full overflow-hidden">
                            <img
                                src={selectedImage}
                                alt={`${selectedTitle} certificate preview`}
                                className="max-w-full max-h-[calc(95vh-100px)] object-contain rounded-md"
                                loading="lazy"
                            />
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Custom CSS for Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-600 { animation-delay: 0.6s; }

                ${certifications.map((_, index) => `
                    .animate-fade-in-up-delay-${index} {
                        animation: fadeInUp 0.7s ease-out ${index * 0.15}s forwards;
                        opacity: 0;
                    }
                `).join('')}

                @keyframes blob {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite ease-in-out; }
                .animation-delay-200 { animation-delay: 2s; }
                .animation-delay-400 { animation-delay: 4s; }
                .animation-delay-600 { animation-delay: 6s; }
            `}</style>
        </section>
    );
};

const App = () => {
    return <Certifications />;
};

export default App;