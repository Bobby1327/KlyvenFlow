import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IndustryShowcase from './components/IndustryShowcase';
import RoiCalculator from './components/RoiCalculator';
import ComparisonSection from './components/ComparisonSection';
import PackageBuilder from './components/PackageBuilder';
import Testimonials from './components/Testimonials';
import ThemeCustomizerModal from './components/ThemeCustomizerModal';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('pt'); // Default to Portuguese ('pt')
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState('restaurant');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [currentTheme, setCurrentTheme] = useState({
    name: 'Indigo Electric',
    primary: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.25)',
    tag: 'Tech & Modern'
  });

  const handleSelectTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.style.setProperty('--theme-accent', theme.primary);
    document.documentElement.style.setProperty('--theme-accent-light', theme.glow);
    document.documentElement.style.setProperty('--primary', theme.primary);
  };

  const handleToggleTheme = (e) => {
    // Coordinate of the click or center of window if e is missing
    const x = e && e.clientX ? e.clientX : window.innerWidth / 2;
    const y = e && e.clientY ? e.clientY : window.innerHeight / 2;

    // Calculate maximum radius required to cover the entire screen from click location
    const maxDistX = Math.max(x, window.innerWidth - x);
    const maxDistY = Math.max(y, window.innerHeight - y);
    const radius = Math.sqrt(maxDistX * maxDistX + maxDistY * maxDistY);

    // Create a temporary circular ripple element
    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.width = `${radius * 2}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.left = `${x - radius}px`;
    ripple.style.top = `${y - radius}px`;

    // Set color to the theme we are changing TO
    ripple.style.backgroundColor = isLightMode ? '#151822' : '#f8fafc';
    document.body.appendChild(ripple);

    // Force repaint
    ripple.offsetWidth;

    // Trigger expansion
    ripple.classList.add('active');

    // Switch the actual theme variables after ripple covers screen
    setTimeout(() => {
      setIsLightMode(!isLightMode);
      if (!isLightMode) {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    }, 300); // halfway through transition

    // Cleanup ripple element
    setTimeout(() => {
      ripple.remove();
    }, 700);
  };

  useEffect(() => {
    // Set initial theme properties
    document.documentElement.style.setProperty('--theme-accent', currentTheme.primary);
    document.documentElement.style.setProperty('--theme-accent-light', currentTheme.glow);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navigation Header */}
      <Header
        lang={lang}
        setLang={setLang}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Hero Header Section */}
      <Hero
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onSelectIndustry={(id) => setActiveIndustry(id)}
      />

      {/* Main Live Showcase Hub */}
      <IndustryShowcase
        lang={lang}
        activeIndustry={activeIndustry}
        onSelectIndustry={(id) => setActiveIndustry(id)}
      />

      {/* Business ROI & Savings Calculator */}
      <RoiCalculator
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Old Static Site vs Modern Web App Engine */}
      <ComparisonSection
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Custom Solution & Proposal Package Builder */}
      <PackageBuilder
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Real Local Business Case Studies */}
      <Testimonials
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Modals */}
      <ThemeCustomizerModal
        lang={lang}
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
      />

      <ContactModal
        lang={lang}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

    </div>
  );
}
