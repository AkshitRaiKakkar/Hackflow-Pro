import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ userIntent, setUserIntent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const heroContent = {
    organize: {
      title: "Transform Hackathon Chaos into Seamless Innovation",
      subtitle: "Enterprise-grade event management that scales from 50 to 5000 participants",
      description: "Complete lifecycle management with predictive analytics, automated workflows, and real-time insights that turn complex events into breakthrough experiences.",
      cta: "Start Organizing",
      icon: "Zap",
      gradient: "from-blue-500 via-cyan-500 to-purple-500"
    },
    participate: {
      title: "Where Great Ideas Meet Flawless Execution",
      subtitle: "Join the next generation of breakthrough solutions",
      description: "Seamless registration, intelligent team matching, collaborative workspaces, and streamlined submissions that let you focus purely on innovation.",
      cta: "Find Hackathons",
      icon: "Users",
      gradient: "from-purple-500 via-pink-500 to-cyan-500"
    },
    judge: {
      title: "Evaluate Innovation with Precision & Fairness",
      subtitle: "Advanced judging tools with bias-reduction technology",
      description: "Sophisticated evaluation workflows, structured feedback systems, and aggregate insights that ensure the best ideas rise to the top.",
      cta: "Join as Judge",
      icon: "Shield",
      gradient: "from-cyan-500 via-blue-500 to-purple-500"
    }
  };

  const slides = [
    {
      stat: "50,000+",
      label: "Participants Empowered",
      description: "Developers, designers, and innovators building the future"
    },
    {
      stat: "1,200+",
      label: "Successful Events",
      description: "From startup weekends to enterprise innovation challenges"
    },
    {
      stat: "98%",
      label: "Satisfaction Rate",
      description: "Organizers who recommend HackFlow Pro to peers"
    }
  ];

  const currentContent = heroContent?.[userIntent];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Intent Selector */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {Object.keys(heroContent)?.map((intent) => (
                <button
                  key={intent}
                  onClick={() => setUserIntent(intent)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    userIntent === intent
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon name={heroContent?.[intent]?.icon} size={16} className="inline mr-2" />
                  {intent?.charAt(0)?.toUpperCase() + intent?.slice(1)}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <motion.div
              key={userIntent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className={`bg-gradient-to-r ${currentContent?.gradient} bg-clip-text text-transparent`}>
                  {currentContent?.title}
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-4 font-medium">
                {currentContent?.subtitle}
              </p>

              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                {currentContent?.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  iconName={currentContent?.icon}
                  iconPosition="left"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25"
                >
                  {currentContent?.cta}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-2xl">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className={`text-6xl font-bold bg-gradient-to-r ${currentContent?.gradient} bg-clip-text text-transparent mb-4`}>
                  {slides?.[currentSlide]?.stat}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {slides?.[currentSlide]?.label}
                </h3>
                <p className="text-slate-400 text-lg">
                  {slides?.[currentSlide]?.description}
                </p>
              </motion.div>

              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {slides?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-primary shadow-lg shadow-primary/50'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full opacity-30 animate-pulse delay-1000"></div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-slate-400">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon name="ChevronDown" size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;