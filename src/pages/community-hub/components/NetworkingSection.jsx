import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NetworkingSection = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const networkingProfiles = [
    {
      id: 1,
      name: "Alex Chen",
      title: "Full Stack Developer",
      company: "Stripe",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills: ["React", "Node.js", "Python", "AWS"],
      interests: ["Fintech", "Web3", "AI/ML"],
      mutualConnections: 12,
      isOnline: true,
      bio: "Passionate about building scalable web applications and exploring new technologies. Always open to interesting conversations about tech and innovation.",
      linkedinUrl: "https://linkedin.com/in/alexchen"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      title: "Product Manager",
      company: "Google",
      location: "Mountain View, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      skills: ["Product Strategy", "Data Analysis", "UX Design"],
      interests: ["EdTech", "Healthcare", "Sustainability"],
      mutualConnections: 8,
      isOnline: false,
      bio: "Product leader with 8+ years experience building user-centric products. Love connecting with fellow innovators and sharing insights.",
      linkedinUrl: "https://linkedin.com/in/mariarodriguez"
    },
    {
      id: 3,
      name: "David Kim",
      title: "DevOps Engineer",
      company: "Microsoft",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      skills: ["Kubernetes", "Docker", "Terraform", "Azure"],
      interests: ["Cloud Computing", "Automation", "Security"],
      mutualConnections: 15,
      isOnline: true,
      bio: "Cloud infrastructure enthusiast helping teams scale their applications. Always excited to discuss DevOps best practices and emerging tools.",
      linkedinUrl: "https://linkedin.com/in/davidkim"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Leaders Networking Mixer",
      date: "2024-02-15",
      time: "6:00 PM - 9:00 PM",
      location: "San Francisco, CA",
      type: "In-Person",
      attendees: 127,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=200&fit=crop",
      description: "Connect with senior tech leaders and entrepreneurs in the Bay Area. Casual networking with drinks and appetizers."
    },
    {
      id: 2,
      title: "Virtual Coffee Chat: Frontend Developers",
      date: "2024-02-12",
      time: "10:00 AM - 11:00 AM",
      location: "Online",
      type: "Virtual",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      description: "Informal discussion about latest frontend trends, tools, and best practices. Bring your coffee and join the conversation!"
    },
    {
      id: 3,
      title: "Women in Tech Mentorship Circle",
      date: "2024-02-18",
      time: "2:00 PM - 4:00 PM",
      location: "New York, NY",
      type: "In-Person",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop",
      description: "Empowering women in technology through mentorship and peer support. Share experiences and build meaningful connections."
    }
  ];

  const myConnections = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Netflix",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastInteraction: "Messaged 2 days ago",
      connectionDate: "Connected 3 months ago"
    },
    {
      id: 2,
      name: "Michael Brown",
      title: "Tech Lead",
      company: "Uber",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      lastInteraction: "Liked your post",
      connectionDate: "Connected 1 month ago"
    }
  ];

  const tabs = [
    { id: 'discover', label: 'Discover People', icon: 'Users' },
    { id: 'events', label: 'Networking Events', icon: 'Calendar' },
    { id: 'connections', label: 'My Network', icon: 'UserCheck' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Professional Networking</h2>
          <p className="text-muted-foreground">Connect with professionals and expand your network</p>
        </div>
        <Button variant="outline" iconName="UserPlus" iconPosition="left">
          Invite Connections
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
      {/* Discover People Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, company, or skills..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline" iconName="Filter">
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {networkingProfiles?.map((profile) => (
              <div key={profile?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <Image
                      src={profile?.avatar}
                      alt={profile?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                      profile?.isOnline ? 'bg-success' : 'bg-muted'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">{profile?.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.title}</p>
                    <p className="text-sm text-primary">{profile?.company}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{profile?.location}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    <span className="sr-only">View LinkedIn</span>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{profile?.bio}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.slice(0, 3)?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {profile?.skills?.length > 3 && (
                        <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">
                          +{profile?.skills?.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {profile?.interests?.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {profile?.mutualConnections} mutual connections
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="default" size="sm" fullWidth iconName="UserPlus" iconPosition="left">
                    Connect
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageSquare">
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Networking Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline" iconName="Calendar">
              My Calendar
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents?.map((event) => (
              <div key={event?.id} className="bg-card border border-border rounded-lg overflow-hidden hover-lift">
                <div className="relative">
                  <Image
                    src={event?.image}
                    alt={event?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event?.type === 'Virtual' ?'bg-blue-500/20 text-blue-400' :'bg-green-500/20 text-green-400'
                    }`}>
                      {event?.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event?.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event?.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event?.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event?.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event?.attendees} attending</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="default" size="sm" fullWidth iconName="Calendar" iconPosition="left">
                      Register
                    </Button>
                    <Button variant="outline" size="sm" iconName="Share">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* My Network Tab */}
      {activeTab === 'connections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">247</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">18</div>
                <div className="text-sm text-muted-foreground">New this month</div>
              </div>
            </div>
            <Button variant="outline" iconName="Download">
              Export Contacts
            </Button>
          </div>

          <div className="space-y-4">
            {myConnections?.map((connection) => (
              <div key={connection?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
                <div className="flex items-center space-x-4">
                  <Image
                    src={connection?.avatar}
                    alt={connection?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">{connection?.name}</h3>
                    <p className="text-sm text-muted-foreground">{connection?.title} at {connection?.company}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">{connection?.lastInteraction}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{connection?.connectionDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="MessageSquare">
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                      <span className="sr-only">More options</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" iconName="ChevronDown" iconPosition="right">
              Load More Connections
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkingSection;