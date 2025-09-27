import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const mockPosts = [
    {
      id: 1,
      type: 'success-story',
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        role: "Full Stack Developer",
        verified: true
      },
      content: `Just won first place at the AI Innovation Challenge! 🏆\n\nOur team built an AI-powered diagnostic tool that can detect early signs of skin cancer with 94% accuracy. The journey wasn't easy - we had countless debugging sessions and almost gave up when our model wasn't performing well.\n\nBut persistence paid off! Special thanks to my amazing teammates @marcus_dev and @emma_designer for making this possible.`,
      images: [
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
      ],
      hackathon: "AI Innovation Challenge 2024",
      timestamp: "2024-10-15T14:30:00Z",
      likes: 127,
      comments: 23,
      shares: 15,
      tags: ["AI", "Healthcare", "Winner"]
    },
    {
      id: 2,
      type: 'tip',
      author: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "Backend Engineer",
        verified: false
      },
      content: `Pro tip for hackathon newbies: Don't try to build the next Facebook in 48 hours! 😅\n\nStart with a simple MVP that solves ONE problem really well. You can always add features later. Focus on:\n\n• Clear problem definition\n• Simple, working solution\n• Good presentation\n• Team chemistry\n\nRemember: Judges love solutions that actually work over complex ideas that don't!`,
      timestamp: "2024-10-14T09:15:00Z",
      likes: 89,
      comments: 12,
      shares: 34,
      tags: ["Tips", "Beginner-Friendly"]
    },
    {
      id: 3,
      type: 'team-formation',
      author: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        role: "UI/UX Designer",
        verified: true
      },
      content: `Looking for 2 more team members for the upcoming Blockchain Hackathon! 🚀\n\nWe're building a decentralized marketplace for digital art with focus on sustainability. Currently have:\n\n✅ UI/UX Designer (me)\n✅ Blockchain Developer\n\nLooking for:\n🔍 Frontend Developer (React/Vue)\n🔍 Backend Developer (Node.js/Python)\n\nDM me if you're interested! Let's build something amazing together.`,
      timestamp: "2024-10-13T16:45:00Z",
      likes: 45,
      comments: 18,
      shares: 8,
      tags: ["Team Formation", "Blockchain", "NFT"]
    },
    {
      id: 4,
      type: 'project-showcase',
      author: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Data Scientist",
        verified: false
      },
      content: `Check out our climate tracking app from last weekend's hackathon! 🌍\n\nEcoTracker helps users monitor their carbon footprint through daily activities. Features include:\n\n• Real-time emission calculations\n• Personalized reduction tips\n• Community challenges\n• Progress visualization\n\nWe didn't win, but learned so much about environmental APIs and data visualization. Sometimes the journey matters more than the destination!`,
      images: [
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop"
      ],
      timestamp: "2024-10-12T11:20:00Z",
      likes: 67,
      comments: 15,
      shares: 12,
      tags: ["Climate Tech", "Mobile App", "Sustainability"]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Posts', icon: 'Home' },
    { id: 'success-story', label: 'Success Stories', icon: 'Trophy' },
    { id: 'tip', label: 'Tips & Advice', icon: 'Lightbulb' },
    { id: 'team-formation', label: 'Team Formation', icon: 'Users' },
    { id: 'project-showcase', label: 'Projects', icon: 'Code' }
  ];

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts?.filter(post => post?.type === activeTab);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return postTime?.toLocaleDateString();
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'success-story': return 'Trophy';
      case 'tip': return 'Lightbulb';
      case 'team-formation': return 'Users';
      case 'project-showcase': return 'Code';
      default: return 'MessageSquare';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'success-story': return 'text-warning';
      case 'tip': return 'text-accent';
      case 'team-formation': return 'text-secondary';
      case 'project-showcase': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-muted/20 rounded w-1/3"></div>
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted/20 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted/20 rounded w-1/4"></div>
                  <div className="h-3 bg-muted/20 rounded w-1/6"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted/20 rounded"></div>
                <div className="h-4 bg-muted/20 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
          <Icon name="MessageSquare" size={24} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Community Feed</h3>
          <p className="text-sm text-muted-foreground">Latest updates from the hackathon community</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts?.map((post) => (
          <div key={post?.id} className="bg-card/50 border border-border rounded-lg p-6 hover:border-primary/20 transition-colors duration-200">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={post?.author?.avatar}
                  alt={post?.author?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold text-foreground">{post?.author?.name}</h4>
                    {post?.author?.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{post?.author?.role}</p>
                  <p className="text-xs text-muted-foreground">{formatTimeAgo(post?.timestamp)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getPostTypeIcon(post?.type)} 
                  size={16} 
                  className={getPostTypeColor(post?.type)} 
                />
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                </Button>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {post?.content}
              </p>
              
              {post?.hackathon && (
                <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  <Icon name="Calendar" size={12} />
                  <span>{post?.hackathon}</span>
                </div>
              )}
            </div>

            {/* Post Images */}
            {post?.images && post?.images?.length > 0 && (
              <div className={`grid gap-2 mb-4 ${
                post?.images?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }`}>
                {post?.images?.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {post?.tags && post?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post?.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-error transition-colors duration-200">
                  <Icon name="Heart" size={16} />
                  <span className="text-sm">{post?.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">{post?.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-secondary transition-colors duration-200">
                  <Icon name="Share" size={16} />
                  <span className="text-sm">{post?.shares}</span>
                </button>
              </div>
              
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Icon name="Bookmark" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" iconName="RefreshCw">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeed;