import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    events: 0,
    participants: 0,
    projects: 0,
    satisfaction: 0
  });

  const finalStats = {
    events: 1200,
    participants: 50000,
    projects: 8500,
    satisfaction: 98
  };

  const statsData = [
    {
      key: 'events',
      icon: 'Calendar',
      label: 'Successful Events',
      value: finalStats?.events,
      suffix: '+',
      description: 'From startup weekends to enterprise challenges',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'participants',
      icon: 'Users',
      label: 'Participants Empowered',
      value: finalStats?.participants,
      suffix: '+',
      description: 'Developers, designers, and innovators worldwide',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      key: 'projects',
      icon: 'Lightbulb',
      label: 'Projects Created',
      value: finalStats?.projects,
      suffix: '+',
      description: 'Breakthrough solutions and innovative ideas',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      key: 'satisfaction',
      icon: 'Heart',
      label: 'Satisfaction Rate',
      value: finalStats?.satisfaction,
      suffix: '%',
      description: 'Organizers who recommend HackFlow Pro',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const partnerships = [
    { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=120&h=60&fit=crop' },
    { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=60&fit=crop' },
    { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=120&h=60&fit=crop' },
    { name: 'Meta', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=60&fit=crop' },
    { name: 'Apple', logo: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?w=120&h=60&fit=crop' },
    { name: 'Netflix', logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=120&h=60&fit=crop' }
  ];

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounters({
          events: Math.floor(finalStats?.events * easeOutQuart),
          participants: Math.floor(finalStats?.participants * easeOutQuart),
          projects: Math.floor(finalStats?.projects * easeOutQuart),
          satisfaction: Math.floor(finalStats?.satisfaction * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num?.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block">
              Innovation Leaders
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Join the global community of organizers, participants, and judges who are 
            shaping the future through world-class hackathon experiences.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {statsData?.map((stat, index) => (
            <motion.div
              key={stat?.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card p-8 rounded-2xl text-center hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat?.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={stat?.icon} size={28} color="white" strokeWidth={2} />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${stat?.gradient} rounded-2xl blur-xl opacity-30 mx-auto group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>

                {/* Counter */}
                <div className="relative">
                  <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat?.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat?.key === 'participants' ? formatNumber(counters?.[stat?.key]) : counters?.[stat?.key]}{stat?.suffix}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {stat?.label}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {stat?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Powering innovation at leading organizations
          </h3>
          
          <div className="glass-card p-8 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partnerships?.map((partner, index) => (
                <motion.div
                  key={partner?.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-24 h-12 bg-slate-700 rounded-lg flex items-center justify-center mx-auto group-hover:bg-slate-600 transition-colors duration-300">
                      <span className="text-slate-300 font-semibold text-sm group-hover:text-white transition-colors duration-300">
                        {partner?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-slate-400 mb-6">
              Ready to join the innovation revolution?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <Icon name="Rocket" size={20} />
                <span>Get Started Free</span>
              </button>
              <button className="px-8 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <Icon name="Phone" size={20} />
                <span>Talk to Sales</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;