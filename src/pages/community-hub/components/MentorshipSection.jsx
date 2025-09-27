import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MentorshipSection = () => {
  const [activeTab, setActiveTab] = useState('find-mentor');

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      expertise: ["React", "Node.js", "System Design"],
      rating: 4.9,
      sessions: 127,
      bio: "Passionate about helping developers grow their skills in modern web technologies and system architecture.",
      availability: "Available"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Tech Lead",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: ["Python", "Machine Learning", "Cloud Architecture"],
      rating: 4.8,
      sessions: 89,
      bio: "Experienced in building scalable ML systems and mentoring junior developers in data science.",
      availability: "Busy"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Product Manager",
      company: "Stripe",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["Product Strategy", "UX Design", "Growth"],
      rating: 4.9,
      sessions: 156,
      bio: "Helping teams build user-centric products and develop strategic thinking skills.",
      availability: "Available"
    }
  ];

  const mentorshipRequests = [
    {
      id: 1,
      mentee: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      topic: "Career Transition to Tech",
      message: "Looking for guidance on transitioning from finance to software development. Need advice on skill development and portfolio building.",
      timestamp: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      mentee: "Jessica Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      topic: "System Design Interview Prep",
      message: "Preparing for senior engineer interviews at FAANG companies. Would love help with system design concepts and mock interviews.",
      timestamp: "5 hours ago",
      status: "accepted"
    }
  ];

  const tabs = [
    { id: 'find-mentor', label: 'Find Mentors', icon: 'Search' },
    { id: 'mentor-requests', label: 'Mentor Requests', icon: 'UserPlus' },
    { id: 'my-sessions', label: 'My Sessions', icon: 'Calendar' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Mentorship Hub</h2>
          <p className="text-muted-foreground">Connect with industry experts and grow your skills</p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Become a Mentor
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
      {/* Find Mentors Tab */}
      {activeTab === 'find-mentor' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search mentors by expertise, company, or name..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline" iconName="Filter">
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mentors?.map((mentor) => (
              <div key={mentor?.id} className="bg-card border border-border rounded-lg p-6 hover-lift">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <Image
                      src={mentor?.avatar}
                      alt={mentor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                      mentor?.availability === 'Available' ? 'bg-success' : 'bg-warning'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground truncate">{mentor?.name}</h3>
                    <p className="text-sm text-muted-foreground">{mentor?.title}</p>
                    <p className="text-sm text-primary">{mentor?.company}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor?.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor?.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} className="text-warning fill-current" />
                      <span className="text-sm font-medium text-foreground">{mentor?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{mentor?.sessions} sessions</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    mentor?.availability === 'Available' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                  }`}>
                    {mentor?.availability}
                  </span>
                </div>

                <Button 
                  variant="outline" 
                  fullWidth 
                  iconName="MessageSquare" 
                  iconPosition="left"
                  disabled={mentor?.availability === 'Busy'}
                >
                  Request Mentorship
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Mentor Requests Tab */}
      {activeTab === 'mentor-requests' && (
        <div className="space-y-4">
          {mentorshipRequests?.map((request) => (
            <div key={request?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Image
                  src={request?.avatar}
                  alt={request?.mentee}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{request?.mentee}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request?.status === 'pending' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                      }`}>
                        {request?.status}
                      </span>
                      <span className="text-sm text-muted-foreground">{request?.timestamp}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium text-primary mb-2">{request?.topic}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{request?.message}</p>
                  
                  {request?.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button variant="default" size="sm" iconName="Check" iconPosition="left">
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" iconName="X" iconPosition="left">
                        Decline
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                        Message
                      </Button>
                    </div>
                  )}
                  
                  {request?.status === 'accepted' && (
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
                        Schedule Session
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MessageSquare" iconPosition="left">
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* My Sessions Tab */}
      {activeTab === 'my-sessions' && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Sessions Scheduled</h3>
          <p className="text-muted-foreground mb-6">Schedule your first mentorship session to get started</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Find a Mentor
          </Button>
        </div>
      )}
    </div>
  );
};

export default MentorshipSection;