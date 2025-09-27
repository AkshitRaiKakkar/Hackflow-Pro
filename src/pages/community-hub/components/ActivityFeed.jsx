import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'project_showcase',
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        title: "Senior Developer"
      },
      action: "showcased a new project",
      content: {
        title: "AI-Powered Code Review Assistant",
        description: "Built an intelligent code review tool that helps developers identify potential issues and suggests improvements using machine learning.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
        tags: ["AI", "Machine Learning", "Developer Tools"]
      },
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      type: 'mentorship',
      user: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        title: "Tech Lead"
      },
      action: "started mentoring",
      content: {
        mentee: "Alex Kumar",
        topic: "System Design & Architecture",
        description: "Excited to help Alex transition into senior engineering roles by focusing on scalable system design principles."
      },
      timestamp: "4 hours ago",
      likes: 18,
      comments: 5,
      shares: 2
    },
    {
      id: 3,
      type: 'discussion',
      user: {
        name: "Emily Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        title: "Product Manager"
      },
      action: "started a discussion",
      content: {
        title: "The Future of Remote Work in Tech",
        description: "What are your thoughts on the long-term impact of remote work on team collaboration and company culture? Share your experiences!",
        category: "Career & Culture"
      },
      timestamp: "6 hours ago",
      likes: 31,
      comments: 15,
      shares: 7
    },
    {
      id: 4,
      type: 'achievement',
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        title: "DevOps Engineer"
      },
      action: "earned a new certification",
      content: {
        title: "AWS Solutions Architect Professional",
        description: "Just passed the AWS Solutions Architect Professional exam! Ready to help teams build more robust cloud infrastructure.",
        badge: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=100&h=100&fit=crop"
      },
      timestamp: "1 day ago",
      likes: 42,
      comments: 12,
      shares: 5
    },
    {
      id: 5,
      type: 'knowledge_share',
      user: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        title: "UX Designer"
      },
      action: "shared a tutorial",
      content: {
        title: "Design Systems: From Concept to Implementation",
        description: "A comprehensive guide on building scalable design systems that work for both designers and developers.",
        readTime: "12 min read",
        category: "Design"
      },
      timestamp: "1 day ago",
      likes: 28,
      comments: 9,
      shares: 14
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activity', icon: 'Activity' },
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'discussions', label: 'Discussions', icon: 'MessageSquare' },
    { id: 'mentorship', label: 'Mentorship', icon: 'Users' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_showcase': return 'FolderOpen';
      case 'mentorship': return 'Users';
      case 'discussion': return 'MessageSquare';
      case 'achievement': return 'Award';
      case 'knowledge_share': return 'BookOpen';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'project_showcase': return 'text-blue-400';
      case 'mentorship': return 'text-green-400';
      case 'discussion': return 'text-purple-400';
      case 'achievement': return 'text-yellow-400';
      case 'knowledge_share': return 'text-cyan-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Community Activity</h2>
          <p className="text-muted-foreground">Stay updated with the latest community activities</p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Share Update
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters?.map((filterItem) => (
          <button
            key={filterItem?.id}
            onClick={() => setFilter(filterItem?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === filterItem?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <Icon name={filterItem?.icon} size={16} />
            <span>{filterItem?.label}</span>
          </button>
        ))}
      </div>
      {/* Activity Feed */}
      <div className="space-y-6">
        {activities?.map((activity) => (
          <div key={activity?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-card border-2 border-card rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={12} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-foreground">{activity?.user?.name}</h3>
                  <span className="text-sm text-muted-foreground">{activity?.action}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{activity?.timestamp}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{activity?.user?.title}</p>
                
                {/* Content based on activity type */}
                {activity?.type === 'project_showcase' && (
                  <div className="bg-muted/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={activity?.content?.image}
                        alt={activity?.content?.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{activity?.content?.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{activity?.content?.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {activity?.content?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activity?.type === 'mentorship' && (
                  <div className="bg-muted/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-green-400" />
                      <span className="font-medium text-foreground">Mentoring {activity?.content?.mentee}</span>
                    </div>
                    <p className="text-sm font-medium text-primary mb-2">{activity?.content?.topic}</p>
                    <p className="text-sm text-muted-foreground">{activity?.content?.description}</p>
                  </div>
                )}
                
                {activity?.type === 'discussion' && (
                  <div className="bg-muted/20 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-foreground mb-2">{activity?.content?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{activity?.content?.description}</p>
                    <span className="inline-block px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-md">
                      {activity?.content?.category}
                    </span>
                  </div>
                )}
                
                {activity?.type === 'achievement' && (
                  <div className="bg-muted/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                        <Icon name="Award" size={24} className="text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{activity?.content?.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity?.content?.description}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activity?.type === 'knowledge_share' && (
                  <div className="bg-muted/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="BookOpen" size={16} className="text-cyan-400" />
                      <span className="font-medium text-foreground">{activity?.content?.title}</span>
                      <span className="text-xs text-muted-foreground">• {activity?.content?.readTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{activity?.content?.description}</p>
                    <span className="inline-block px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-md">
                      {activity?.content?.category}
                    </span>
                  </div>
                )}
                
                {/* Engagement Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{activity?.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Icon name="MessageSquare" size={16} />
                      <span className="text-sm">{activity?.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Icon name="Share" size={16} />
                      <span className="text-sm">{activity?.shares}</span>
                    </button>
                  </div>
                  
                  <Button variant="ghost" size="sm" iconName="Bookmark">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;