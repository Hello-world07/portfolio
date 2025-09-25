// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/navbar';
import Home from './components/home'; // Updated import for Home component
import About from './components/about';
import Projects from './components/project';
import Skills from './components/skills';
import Code from './components/code';
import ContactUs from './components/contactus';
import Footer from './components/footer';

// ✅ Vercel Speed Insights & Analytics
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-custom-dark transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home as the landing page */}
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/code" element={<Code />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
          <Footer />

          {/* ✅ Vercel Speed Insights and Analytics */}
          <SpeedInsights />
          <Analytics />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;