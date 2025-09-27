import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MentorshipHub = ({ mentorshipRequests, onAcceptRequest, onDeclineRequest, onOfferMentorship }) => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillOptions = [
    'React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design',
    'Mobile Development', 'DevOps', 'Blockchain', 'Data Science', 'Cloud Computing'
  ];

  const filteredRequests = mentorshipRequests?.filter(request =>
    request?.participant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    request?.project?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    request?.skills?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev?.includes(skill)
        ? prev?.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const myMentorships = [
    {
      id: 1,
      participant: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "alex.chen@email.com"
      },
      project: {
        title: "AI-Powered Code Review Tool",
        category: "Developer Tools"
      },
      startDate: "2025-01-15",
      status: "active",
      nextSession: "2025-01-30T14:00:00Z",
      progress: 75
    },
    {
      id: 2,
      participant: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        email: "sarah.j@email.com"
      },
      project: {
        title: "Sustainable Fashion Marketplace",
        category: "E-commerce"
      },
      startDate: "2025-01-10",
      status: "completed",
      completedDate: "2025-01-25",
      progress: 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Mentorship Hub</h2>
          <p className="text-muted-foreground mt-1">
            Guide the next generation of innovators
          </p>
        </div>
        
        <Button
          variant="default"
          onClick={() => onOfferMentorship()}
          iconName="Plus"
          iconPosition="left"
        >
          Offer Mentorship
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">Active Mentorships</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 border border-success/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">28</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 border border-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Pending Requests</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 border border-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'requests' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Mentorship Requests ({filteredRequests?.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === 'active' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          My Mentorships ({myMentorships?.length})
        </button>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by participant name, project, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skillOptions?.slice(0, 5)?.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
                selectedSkills?.includes(skill)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {filteredRequests?.map((request) => (
            <div key={request?.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-4">
                    <Image
                      src={request?.participant?.avatar}
                      alt={request?.participant?.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {request?.participant?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request?.participant?.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {request?.participant?.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Project: {request?.project?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {request?.project?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {request?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded-lg p-3 mb-4">
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      What they're looking for:
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {request?.mentorshipGoals}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Requested: {new Date(request.requestedAt)?.toLocaleDateString()}</span>
                    <span>Expected duration: {request?.expectedDuration}</span>
                  </div>
                </div>

                <div className="lg:w-64 space-y-3">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground mb-1">
                      Match Score
                    </div>
                    <div className="text-2xl font-bold text-success">
                      {request?.matchScore}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="default"
                      onClick={() => onAcceptRequest(request?.id)}
                      iconName="Check"
                      iconPosition="left"
                      fullWidth
                    >
                      Accept Request
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onDeclineRequest(request?.id)}
                      iconName="X"
                      iconPosition="left"
                      fullWidth
                    >
                      Decline
                    </Button>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-2">
                      Commitment Level
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${request?.commitmentLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-foreground">
                        {request?.commitmentLevel}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {myMentorships?.map((mentorship) => (
            <div key={mentorship?.id} className="glass-card p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-4">
                    <Image
                      src={mentorship?.participant?.avatar}
                      alt={mentorship?.participant?.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {mentorship?.participant?.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          mentorship?.status === 'active' ?'bg-success/20 text-success' :'bg-muted/20 text-muted-foreground'
                        }`}>
                          {mentorship?.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {mentorship?.participant?.email}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {mentorship?.project?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {mentorship?.project?.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="text-foreground font-medium">
                        {new Date(mentorship.startDate)?.toLocaleDateString()}
                      </p>
                    </div>
                    {mentorship?.status === 'active' ? (
                      <div>
                        <span className="text-muted-foreground">Next Session:</span>
                        <p className="text-foreground font-medium">
                          {new Date(mentorship.nextSession)?.toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <p className="text-foreground font-medium">
                          {new Date(mentorship.completedDate)?.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:w-64 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium text-foreground">
                        {mentorship?.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                        style={{ width: `${mentorship?.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {mentorship?.status === 'active' && (
                    <div className="space-y-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Video"
                        iconPosition="left"
                        fullWidth
                      >
                        Start Session
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageSquare"
                        iconPosition="left"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorshipHub;