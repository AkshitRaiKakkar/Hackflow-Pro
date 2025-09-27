import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityForums = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'MessageSquare', count: 1247 },
    { id: 'frontend', name: 'Frontend', icon: 'Monitor', count: 324 },
    { id: 'backend', name: 'Backend', icon: 'Server', count: 289 },
    { id: 'mobile', name: 'Mobile', icon: 'Smartphone', count: 156 },
    { id: 'ai-ml', name: 'AI/ML', icon: 'Brain', count: 198 },
    { id: 'devops', name: 'DevOps', icon: 'Settings', count: 134 },
    { id: 'career', name: 'Career', icon: 'Briefcase', count: 146 }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for React performance optimization in 2024",
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "frontend",
      replies: 23,
      views: 1247,
      lastActivity: "2 hours ago",
      tags: ["React", "Performance", "Optimization"],
      isPinned: true,
      hasAcceptedAnswer: true
    },
    {
      id: 2,
      title: "Microservices vs Monolith: When to choose what?",
      author: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "backend",
      replies: 45,
      views: 2156,
      lastActivity: "4 hours ago",
      tags: ["Architecture", "Microservices", "System Design"],
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: 3,
      title: "Breaking into FAANG: My journey from bootcamp to Google",
      author: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "career",
      replies: 67,
      views: 3421,
      lastActivity: "6 hours ago",
      tags: ["Career", "Interview", "Success Story"],
      isPinned: true,
      hasAcceptedAnswer: false
    },
    {
      id: 4,
      title: "Flutter vs React Native: Performance comparison 2024",
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      category: "mobile",
      replies: 34,
      views: 1876,
      lastActivity: "8 hours ago",
      tags: ["Flutter", "React Native", "Mobile Development"],
      isPinned: false,
      hasAcceptedAnswer: true
    },
    {
      id: 5,
      title: "Implementing RAG with LangChain and OpenAI: Complete guide",
      author: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      category: "ai-ml",
      replies: 28,
      views: 1543,
      lastActivity: "12 hours ago",
      tags: ["AI", "LangChain", "RAG", "OpenAI"],
      isPinned: false,
      hasAcceptedAnswer: false
    }
  ];

  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions?.filter(d => d?.category === activeCategory);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Community Forums</h2>
          <p className="text-muted-foreground">Join discussions and share knowledge with the community</p>
        </div>
        <Button variant="default" iconName="Plus" iconPosition="left">
          New Discussion
        </Button>
      </div>
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <Button variant="outline" iconName="Filter">
          Filters
        </Button>
        <Button variant="outline" iconName="ArrowUpDown">
          Sort
        </Button>
      </div>
      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions?.map((discussion) => (
          <div key={discussion?.id} className="bg-card border border-border rounded-lg p-6 hover-lift cursor-pointer">
            <div className="flex items-start space-x-4">
              <Image
                src={discussion?.avatar}
                alt={discussion?.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {discussion?.isPinned && (
                      <Icon name="Pin" size={16} className="text-primary" />
                    )}
                    {discussion?.hasAcceptedAnswer && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200">
                      {discussion?.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-sm text-muted-foreground">by {discussion?.author}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{discussion?.lastActivity}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{discussion?.replies} replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{discussion?.views} views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Heart">
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Share">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Discussions
        </Button>
      </div>
    </div>
  );
};

export default CommunityForums;