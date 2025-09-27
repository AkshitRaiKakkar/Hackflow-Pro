import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: "Zap",
      title: "Lightning-Fast Setup",
      description: "Launch your hackathon in minutes with pre-built templates and automated workflows that handle the complex logistics.",
      gradient: "from-blue-500 to-cyan-500",
      stats: "5 min setup"
    },
    {
      icon: "Users",
      title: "Intelligent Team Matching",
      description: "AI-powered algorithms match participants based on skills, interests, and complementary expertise for optimal team formation.",
      gradient: "from-purple-500 to-pink-500",
      stats: "95% match rate"
    },
    {
      icon: "BarChart3",
      title: "Real-Time Analytics",
      description: "Comprehensive dashboards with live metrics, engagement tracking, and predictive insights for data-driven decisions.",
      gradient: "from-cyan-500 to-blue-500",
      stats: "50+ metrics"
    },
    {
      icon: "Shield",
      title: "Bias-Free Judging",
      description: "Advanced evaluation tools with blind review options, structured rubrics, and statistical analysis to ensure fairness.",
      gradient: "from-emerald-500 to-teal-500",
      stats: "Zero bias"
    },
    {
      icon: "Globe",
      title: "Global Scale",
      description: "Support for events from 10 to 10,000 participants with multi-language support and timezone management.",
      gradient: "from-orange-500 to-red-500",
      stats: "190+ countries"
    },
    {
      icon: "Lock",
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure with end-to-end encryption, GDPR compliance, and enterprise-grade data protection.",
      gradient: "from-violet-500 to-purple-500",
      stats: "Bank-level security"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
            Everything You Need to
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block">
              Run Perfect Hackathons
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            From initial planning to final celebration, HackFlow Pro provides the complete toolkit 
            for creating world-class innovation experiences that participants and organizers love.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="glass-card p-8 rounded-2xl h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature?.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={feature?.icon} size={28} color="white" strokeWidth={2} />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature?.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                      {feature?.title}
                    </h3>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {feature?.stats}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {feature?.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to transform your next hackathon?
            </h3>
            <p className="text-slate-400 mb-6">
              Join thousands of organizers who trust HackFlow Pro for their innovation events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <Icon name="Rocket" size={20} />
                <span>Start Free Trial</span>
              </button>
              <button className="px-8 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                <Icon name="Calendar" size={20} />
                <span>Schedule Demo</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;