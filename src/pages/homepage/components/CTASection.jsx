import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeRole, setActiveRole] = useState('organizer');

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const roles = [
    {
      key: 'organizer',
      title: 'Event Organizer',
      description: 'Launch your first hackathon in minutes',
      icon: 'Zap',
      cta: 'Start Organizing',
      benefits: ['Free 30-day trial', 'No setup fees', '24/7 support', 'Cancel anytime']
    },
    {
      key: 'participant',
      title: 'Participant',
      description: 'Join amazing hackathons worldwide',
      icon: 'Users',
      cta: 'Find Events',
      benefits: ['Free registration', 'Team matching', 'Skill development', 'Win prizes']
    },
    {
      key: 'judge',
      title: 'Judge & Mentor',
      description: 'Shape the future of innovation',
      icon: 'Shield',
      cta: 'Become a Judge',
      benefits: ['Expert recognition', 'Network building', 'Give back', 'Industry insights']
    }
  ];

  const currentRole = roles?.find(role => role?.key === activeRole);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block">
              Your Next Hackathon?
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Join thousands of organizers, participants, and judges who trust HackFlow Pro 
            to create world-class innovation experiences.
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="glass-card p-2 rounded-2xl">
              <div className="flex space-x-2">
                {roles?.map((role) => (
                  <button
                    key={role?.key}
                    onClick={() => setActiveRole(role?.key)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeRole === role?.key
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <Icon name={role?.icon} size={18} />
                    <span className="hidden sm:inline">{role?.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Role-specific Content */}
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-8 lg:p-12 rounded-3xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mr-4`}>
                      <Icon name={currentRole?.icon} size={28} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentRole?.title}</h3>
                      <p className="text-slate-400">{currentRole?.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {currentRole?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center justify-center lg:justify-start text-slate-300">
                        <Icon name="Check" size={16} className="text-accent mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      variant="default"
                      size="lg"
                      iconName={currentRole?.icon}
                      iconPosition="left"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25"
                    >
                      {currentRole?.cta}
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
                </div>

                {/* Newsletter Signup */}
                <div className="glass-card p-6 rounded-2xl">
                  <h4 className="text-xl font-semibold text-white mb-4 text-center">
                    Stay Updated
                  </h4>
                  <p className="text-slate-400 mb-6 text-center text-sm">
                    Get the latest hackathon trends, best practices, and platform updates.
                  </p>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        required
                        className="w-full"
                      />
                      
                      <Button
                        type="submit"
                        variant="default"
                        size="default"
                        fullWidth
                        iconName="Mail"
                        iconPosition="left"
                        className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                      >
                        Subscribe to Updates
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-accent to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Check" size={28} color="white" strokeWidth={2} />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        Thank you!
                      </h4>
                      <p className="text-slate-400">
                        You're now subscribed to our updates.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-accent" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-accent" />
              <span className="text-sm">GDPR Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-accent" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={20} className="text-accent" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            No credit card required • Free 30-day trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;