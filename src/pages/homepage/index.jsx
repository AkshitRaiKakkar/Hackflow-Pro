import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ShowcaseSection from './components/ShowcaseSection';
import StatsSection from './components/StatsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Homepage = () => {
  const [userIntent, setUserIntent] = useState('organize');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>HackFlow Pro - Transform Hackathon Chaos into Seamless Innovation</title>
        <meta 
          name="description" 
          content="Enterprise-grade hackathon management platform. Complete lifecycle management with predictive analytics, automated workflows, and real-time insights for world-class innovation experiences." 
        />
        <meta name="keywords" content="hackathon, event management, innovation platform, team matching, judging tools, analytics" />
        <meta property="og:title" content="HackFlow Pro - Innovation Platform" />
        <meta property="og:description" content="Transform hackathon chaos into seamless innovation experiences with enterprise-grade event management tools." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HackFlow Pro - Innovation Platform" />
        <meta name="twitter:description" content="Enterprise-grade hackathon management platform for world-class innovation experiences." />
        <link rel="canonical" href="https://hackflowpro.com/homepage" />
      </Helmet>

      <div className={`min-h-screen bg-background text-foreground transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection 
            userIntent={userIntent} 
            setUserIntent={setUserIntent} 
          />

          {/* Features Section */}
          <FeaturesSection />

          {/* Showcase Section */}
          <ShowcaseSection />

          {/* Stats Section */}
          <StatsSection />

          {/* CTA Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Homepage;