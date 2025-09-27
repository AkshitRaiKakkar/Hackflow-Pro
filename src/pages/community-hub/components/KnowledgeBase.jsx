import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    {
      id: 1,
      title: "Complete Guide to React Hooks",
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      category: "Frontend",
      difficulty: "Intermediate",
      readTime: "15 min",
      views: 2847,
      likes: 234,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      tags: ["React", "Hooks", "JavaScript"],
      publishedAt: "2024-01-15",
      description: "Master React Hooks with practical examples and best practices. Learn useState, useEffect, useContext, and custom hooks."
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      author: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      category: "Backend",
      difficulty: "Advanced",
      readTime: "25 min",
      views: 1923,
      likes: 187,
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      tags: ["Node.js", "API", "Scalability"],
      publishedAt: "2024-01-12",
      description: "Learn how to build robust, scalable APIs using Node.js, Express, and modern architectural patterns."
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals for Developers",
      author: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      category: "AI/ML",
      difficulty: "Beginner",
      readTime: "20 min",
      views: 3156,
      likes: 298,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
      tags: ["Machine Learning", "Python", "AI"],
      publishedAt: "2024-01-10",
      description: "Get started with machine learning concepts, algorithms, and practical implementation using Python."
    }
  ];

  const bestPractices = [
    {
      id: 1,
      title: "Code Review Best Practices",
      category: "Development",
      icon: "Code",
      items: [
        "Review code in small, manageable chunks",
        "Focus on logic and architecture, not style",
        "Provide constructive feedback with examples",
        "Use automated tools for style checking"
      ]
    },
    {
      id: 2,
      title: "Git Workflow Guidelines",
      category: "Version Control",
      icon: "GitBranch",
      items: [
        "Use meaningful commit messages",
        "Keep commits atomic and focused",
        "Create feature branches for new work",
        "Rebase before merging to maintain clean history"
      ]
    },
    {
      id: 3,
      title: "API Design Principles",
      category: "Backend",
      icon: "Server",
      items: [
        "Use RESTful conventions consistently",
        "Implement proper error handling",
        "Version your APIs from the start",
        "Document endpoints thoroughly"
      ]
    }
  ];

  const templates = [
    {
      id: 1,
      name: "React Component Template",
      description: "Boilerplate for creating reusable React components with TypeScript",
      category: "Frontend",
      downloads: 1247,
      icon: "FileCode"
    },
    {
      id: 2,
      name: "Express API Starter",
      description: "Complete Node.js API template with authentication and database setup",
      category: "Backend",
      downloads: 892,
      icon: "Server"
    },
    {
      id: 3,
      name: "Docker Development Setup",
      description: "Multi-container development environment with Docker Compose",
      category: "DevOps",
      downloads: 634,
      icon: "Package"
    }
  ];

  const tabs = [
    { id: 'tutorials', label: 'Tutorials', icon: 'BookOpen' },
    { id: 'best-practices', label: 'Best Practices', icon: 'CheckCircle' },
    { id: 'templates', label: 'Templates', icon: 'FileText' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success';
      case 'Intermediate': return 'bg-warning/10 text-warning';
      case 'Advanced': return 'bg-error/10 text-error';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Knowledge Base</h2>
          <p className="text-muted-foreground">Learn from community-contributed tutorials and best practices</p>
        </div>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Contribute Content
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/20 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tutorials Tab */}
      {activeTab === 'tutorials' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline" iconName="Filter">
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tutorials?.map((tutorial) => (
              <div key={tutorial?.id} className="bg-card border border-border rounded-lg overflow-hidden hover-lift">
                <div className="relative">
                  <Image
                    src={tutorial?.thumbnail}
                    alt={tutorial?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(tutorial?.difficulty)}`}>
                      {tutorial?.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                    {tutorial?.readTime}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={tutorial?.avatar}
                      alt={tutorial?.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{tutorial?.author}</p>
                      <p className="text-xs text-muted-foreground">{tutorial?.category}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors duration-200 cursor-pointer">
                    {tutorial?.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tutorial?.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{tutorial?.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{tutorial?.likes}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Best Practices Tab */}
      {activeTab === 'best-practices' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bestPractices?.map((practice) => (
            <div key={practice?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={practice?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{practice?.title}</h3>
                  <p className="text-sm text-muted-foreground">{practice?.category}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {practice?.items?.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Button variant="outline" size="sm" fullWidth iconName="ExternalLink" iconPosition="right">
                  View Full Guide
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {templates?.map((template) => (
            <div key={template?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name={template?.icon} size={24} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">{template?.name}</h3>
                  <p className="text-sm text-muted-foreground">{template?.category}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{template?.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{template?.downloads} downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm text-muted-foreground">4.8</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="default" size="sm" fullWidth iconName="Download" iconPosition="left">
                  Download
                </Button>
                <Button variant="outline" size="sm" iconName="Eye">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;