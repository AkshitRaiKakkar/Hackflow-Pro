import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Organizer Dashboard', href: '/organizer-dashboard' },
        { name: 'Participant Portal', href: '/participant-portal' },
        { name: 'Judge Dashboard', href: '/judge-dashboard' },
        { name: 'Public Showcase', href: '/public-showcase' },
        { name: 'Community Hub', href: '/community-hub' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Best Practices', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Templates', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'System Status', href: '#' },
        { name: 'Training', href: '#' },
        { name: 'Webinars', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Blog', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'GitHub', icon: 'Github', href: '#' },
    { name: 'Discord', icon: 'MessageSquare', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' }
  ];

  const handleNavigation = (href) => {
    if (href?.startsWith('/')) {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center">
                      <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl blur-sm opacity-50 -z-10"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">HackFlow Pro</h3>
                    <p className="text-sm text-slate-400 -mt-1">Innovation Platform</p>
                  </div>
                </div>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  Transforming hackathon chaos into seamless innovation experiences. 
                  Empowering organizers, participants, and judges to create breakthrough solutions.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks?.map((social) => (
                    <motion.button
                      key={social?.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(social?.href)}
                      className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    >
                      <Icon 
                        name={social?.icon} 
                        size={18} 
                        className="text-slate-400 group-hover:text-white transition-colors duration-200" 
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerSections?.map((section, index) => (
              <div key={section?.title} className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-semibold mb-4">{section?.title}</h4>
                  <ul className="space-y-3">
                    {section?.links?.map((link) => (
                      <li key={link?.name}>
                        <button
                          onClick={() => handleNavigation(link?.href)}
                          className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link?.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-8 border-t border-slate-800"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Stay ahead of innovation
              </h4>
              <p className="text-slate-400">
                Get weekly insights on hackathon trends, best practices, and platform updates.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap">
                <Icon name="Mail" size={18} />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-400">
              <p>© {currentYear} HackFlow Pro. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <button className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </button>
                <button className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </button>
                <button className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Icon name="Shield" size={16} className="text-accent" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Icon name="Lock" size={16} className="text-accent" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Icon name="Award" size={16} className="text-accent" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;