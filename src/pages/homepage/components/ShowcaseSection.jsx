import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState('events');

  const showcaseData = {
    events: {
      title: "Featured Events",
      subtitle: "Live and upcoming hackathons powered by HackFlow Pro",
      items: [
        {
          id: 1,
          title: "AI Innovation Challenge 2024",
          organizer: "TechCorp Global",
          participants: 2847,
          prize: "$100,000",
          status: "Live",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
          tags: ["AI", "Machine Learning", "Innovation"],
          timeLeft: "2 days left"
        },
        {
          id: 2,
          title: "Sustainable Future Hackathon",
          organizer: "Green Tech Alliance",
          participants: 1523,
          prize: "$75,000",
          status: "Upcoming",
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
          tags: ["Sustainability", "CleanTech", "Environment"],
          timeLeft: "Starts in 5 days"
        },
        {
          id: 3,
          title: "FinTech Revolution 2024",
          organizer: "Banking Consortium",
          participants: 3241,
          prize: "$150,000",
          status: "Registration Open",
          image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
          tags: ["FinTech", "Blockchain", "Banking"],
          timeLeft: "Registration closes in 12 days"
        }
      ]
    },
    projects: {
      title: "Winning Projects",
      subtitle: "Breakthrough solutions built during HackFlow Pro events",
      items: [
        {
          id: 1,
          title: "MediAI - Smart Diagnosis Assistant",
          team: "Team HealthTech",
          event: "Healthcare Innovation Hackathon",
          award: "1st Place",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
          description: "AI-powered diagnostic tool that helps doctors identify rare diseases with 94% accuracy.",
          tech: ["Python", "TensorFlow", "React", "AWS"]
        },
        {
          id: 2,
          title: "EcoTrack - Carbon Footprint Monitor",
          team: "Green Coders",
          event: "Climate Action Hackathon",
          award: "People\'s Choice",
          image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=250&fit=crop",
          description: "Real-time carbon footprint tracking app with personalized reduction recommendations.",
          tech: ["React Native", "Node.js", "MongoDB", "IoT"]
        },
        {
          id: 3,
          title: "LearnFlow - Adaptive Learning Platform",
          team: "EduInnovators",
          event: "EdTech Challenge 2024",
          award: "Innovation Award",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
          description: "Personalized learning platform that adapts to individual student needs and learning styles.",
          tech: ["Vue.js", "Python", "PostgreSQL", "ML"]
        }
      ]
    },
    testimonials: {
      title: "Success Stories",
      subtitle: "What organizers and participants say about HackFlow Pro",
      items: [
        {
          id: 1,
          name: "Sarah Chen",
          role: "Innovation Director",
          company: "Microsoft",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          quote: "HackFlow Pro transformed our internal hackathons. We went from chaotic events to seamless experiences that our employees actually look forward to.",
          rating: 5,
          event: "Microsoft Internal Innovation Week"
        },
        {
          id: 2,
          name: "Marcus Rodriguez",
          role: "Lead Developer",
          company: "Startup Founder",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          quote: "As a participant, the team matching feature was incredible. I found the perfect co-founders for my startup during a HackFlow Pro event.",
          rating: 5,
          event: "Startup Weekend Global"
        },
        {
          id: 3,
          name: "Dr. Emily Watson",
          role: "Professor & Judge",
          company: "Stanford University",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          quote: "The judging tools are phenomenal. The bias-reduction features and structured evaluation process ensure we identify truly innovative solutions.",
          rating: 5,
          event: "Stanford AI Challenge"
        }
      ]
    }
  };

  const tabs = [
    { key: 'events', label: 'Live Events', icon: 'Calendar' },
    { key: 'projects', label: 'Winning Projects', icon: 'Trophy' },
    { key: 'testimonials', label: 'Success Stories', icon: 'MessageSquare' }
  ];

  const renderEventCard = (item) => (
    <motion.div
      key={item?.id}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="relative">
        <Image
          src={item?.image}
          alt={item?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item?.status === 'Live' ?'bg-red-500/20 text-red-400 border border-red-500/30' 
              : item?.status === 'Upcoming' ?'bg-blue-500/20 text-blue-400 border border-blue-500/30' :'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>
            {item?.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
            {item?.timeLeft}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {item?.title}
        </h3>
        <p className="text-slate-400 mb-4">{item?.organizer}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item?.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              {item?.participants?.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Icon name="Award" size={16} className="mr-1" />
              {item?.prize}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProjectCard = (item) => (
    <motion.div
      key={item?.id}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="relative">
        <Image
          src={item?.image}
          alt={item?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {item?.award}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
          {item?.title}
        </h3>
        <p className="text-slate-400 mb-2">{item?.team} • {item?.event}</p>
        <p className="text-slate-300 mb-4 text-sm leading-relaxed">
          {item?.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {item?.tech?.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderTestimonialCard = (item) => (
    <motion.div
      key={item?.id}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl p-6 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <Image
          src={item?.image}
          alt={item?.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-white font-semibold">{item?.name}</h3>
          <p className="text-slate-400 text-sm">{item?.role} • {item?.company}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(item?.rating)]?.map((_, i) => (
          <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-current" />
        ))}
      </div>
      
      <blockquote className="text-slate-300 mb-4 italic leading-relaxed">
        "{item?.quote}"
      </blockquote>
      
      <p className="text-slate-500 text-xs">
        {item?.event}
      </p>
    </motion.div>
  );

  const currentData = showcaseData?.[activeTab];

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Innovation in
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent block">
              Action
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover live events, explore winning projects, and hear from the community 
            that's building the future through hackathons.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 rounded-2xl">
            <div className="flex space-x-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab?.key
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {currentData?.title}
            </h3>
            <p className="text-slate-400">
              {currentData?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentData?.items?.map((item) => {
              if (activeTab === 'events') return renderEventCard(item);
              if (activeTab === 'projects') return renderProjectCard(item);
              if (activeTab === 'testimonials') return renderTestimonialCard(item);
              return null;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;