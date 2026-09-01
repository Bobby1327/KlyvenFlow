import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
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
  const [isLightMode, setIsLightMode] = useState(true); // Default to Light Mode as main version
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
    ripple.style.backgroundColor = isLightMode ? '#151822' : '#e8ecf2';
    document.body.appendChild(ripple);

    // Request animation frames to execute transition smoothly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ripple.classList.add('active');
      });
    });

    // Wait until the screen is fully covered by the ripple (e.g. 450ms) before re-rendering theme variables
    setTimeout(() => {
      setIsLightMode(prev => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        }
        return next;
      });
    }, 450);

    // Smoothly fade out the ripple overlay
    setTimeout(() => {
      ripple.classList.add('fade-out');
    }, 600);

    // Completely remove the ripple element after fadeout finishes
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  useEffect(() => {
    // Disable browser automatic scroll restoration and force scroll to top on entry
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Re-assert top scroll after initial DOM paint and asset layout
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    // Ensure light mode is applied on initial mount
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    // Set initial theme properties
    document.documentElement.style.setProperty('--theme-accent', currentTheme.primary);
    document.documentElement.style.setProperty('--theme-accent-light', currentTheme.glow);

    return () => clearTimeout(timer);
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

      {/* Floating Standout WhatsApp Contact Button */}
      <a
        href="https://wa.me/5535997745407"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn"
        title="Falar no WhatsApp: (55) 35 99774-5407"
      >
        <span className="live-pulse-dot" style={{ backgroundColor: '#ffffff' }} />
        <MessageCircle size={20} />
        <span>WhatsApp: <strong>(55) 35 99774-5407</strong></span>
      </a>

    </div>
  );
}
