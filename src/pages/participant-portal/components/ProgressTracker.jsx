import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ hackathonId, teamId }) => {
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockProgress = {
    hackathon: {
      title: "AI Innovation Challenge 2024",
      startDate: "2024-10-15",
      endDate: "2024-10-17",
      status: "active"
    },
    team: {
      name: "AI Innovators",
      members: 4,
      role: "Frontend Developer"
    },
    timeline: [
      {
        id: 1,
        title: "Registration",
        description: "Complete hackathon registration",
        status: "completed",
        completedAt: "2024-10-10T10:00:00Z",
        icon: "UserCheck"
      },
      {
        id: 2,
        title: "Team Formation",
        description: "Join or create a team",
        status: "completed",
        completedAt: "2024-10-12T14:30:00Z",
        icon: "Users"
      },
      {
        id: 3,
        title: "Project Planning",
        description: "Define project scope and requirements",
        status: "completed",
        completedAt: "2024-10-14T16:00:00Z",
        icon: "FileText"
      },
      {
        id: 4,
        title: "Development Phase",
        description: "Build your innovative solution",
        status: "in-progress",
        deadline: "2024-10-17T10:00:00Z",
        icon: "Code"
      },
      {
        id: 5,
        title: "Testing & Refinement",
        description: "Test and polish your project",
        status: "pending",
        deadline: "2024-10-17T14:00:00Z",
        icon: "TestTube"
      },
      {
        id: 6,
        title: "Final Submission",
        description: "Submit your completed project",
        status: "pending",
        deadline: "2024-10-17T18:00:00Z",
        icon: "Upload"
      },
      {
        id: 7,
        title: "Presentation",
        description: "Present your solution to judges",
        status: "pending",
        deadline: "2024-10-18T12:00:00Z",
        icon: "Presentation"
      }
    ],
    submissions: {
      total: 3,
      completed: 1,
      pending: 2,
      items: [
        {
          id: 1,
          title: "Project Proposal",
          description: "Initial project concept and team formation",
          status: "submitted",
          submittedAt: "2024-10-14T16:00:00Z",
          feedback: "Great concept! Looking forward to seeing the implementation."
        },
        {
          id: 2,
          title: "Midpoint Demo",
          description: "Working prototype demonstration",
          status: "pending",
          deadline: "2024-10-16T18:00:00Z"
        },
        {
          id: 3,
          title: "Final Project",
          description: "Complete project with documentation",
          status: "pending",
          deadline: "2024-10-17T18:00:00Z"
        }
      ]
    },
    stats: {
      hoursRemaining: 28,
      completionRate: 43,
      teamRanking: 12,
      totalTeams: 85
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(mockProgress);
      setIsLoading(false);
    };

    loadProgress();
  }, [hackathonId, teamId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/20 border-success/30';
      case 'in-progress': return 'bg-warning/20 border-warning/30';
      case 'pending': return 'bg-muted/20 border-muted/30';
      default: return 'bg-muted/20 border-muted/30';
    }
  };

  const formatTimeRemaining = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    
    if (diff <= 0) return 'Overdue';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h remaining`;
    }
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted/20 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="h-16 bg-muted/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!progress) return null;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Progress Tracker</h3>
            <p className="text-sm text-muted-foreground">{progress?.hackathon?.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{progress?.stats?.hoursRemaining}</div>
            <div className="text-xs text-muted-foreground">Hours Left</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{progress?.stats?.completionRate}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">#{progress?.stats?.teamRanking}</div>
            <div className="text-xs text-muted-foreground">Team Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{progress?.stats?.totalTeams}</div>
            <div className="text-xs text-muted-foreground">Total Teams</div>
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Hackathon Timeline</h4>
        
        <div className="space-y-4">
          {progress?.timeline?.map((item, index) => (
            <div key={item?.id} className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusBg(item?.status)}`}>
                <Icon name={item?.icon} size={16} className={getStatusColor(item?.status)} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-medium text-foreground">{item?.title}</h5>
                  {item?.status === 'completed' && (
                    <span className="text-xs text-success">
                      ✓ {new Date(item.completedAt)?.toLocaleDateString()}
                    </span>
                  )}
                  {item?.status === 'in-progress' && (
                    <span className="text-xs text-warning font-medium">
                      {formatTimeRemaining(item?.deadline)}
                    </span>
                  )}
                  {item?.status === 'pending' && item?.deadline && (
                    <span className="text-xs text-muted-foreground">
                      Due: {new Date(item.deadline)?.toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item?.description}</p>
                
                {item?.status === 'in-progress' && (
                  <div className="mt-2">
                    <Button variant="outline" size="sm" iconName="Play">
                      Continue
                    </Button>
                  </div>
                )}
              </div>
              
              {index < progress?.timeline?.length - 1 && (
                <div className="absolute left-5 mt-10 w-0.5 h-8 bg-border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Submissions */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Submissions</h4>
          <div className="text-sm text-muted-foreground">
            {progress?.submissions?.completed}/{progress?.submissions?.total} completed
          </div>
        </div>

        <div className="space-y-3">
          {progress?.submissions?.items?.map((submission) => (
            <div key={submission?.id} className="bg-card/50 border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-foreground">{submission?.title}</h5>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBg(submission?.status)}`}>
                  {submission?.status === 'submitted' ? 'Submitted' : 'Pending'}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{submission?.description}</p>
              
              {submission?.status === 'submitted' ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-success">
                    Submitted on {new Date(submission.submittedAt)?.toLocaleDateString()}
                  </span>
                  {submission?.feedback && (
                    <Button variant="ghost" size="sm" iconName="MessageSquare">
                      View Feedback
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-warning">
                    Due: {new Date(submission.deadline)?.toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm" iconName="Upload">
                    Submit Now
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Team Info */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Team Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{progress?.team?.name}</p>
              <p className="text-xs text-muted-foreground">{progress?.team?.members} members</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="User" size={20} className="text-secondary" />
            <div>
              <p className="text-sm font-medium text-foreground">Your Role</p>
              <p className="text-xs text-muted-foreground">{progress?.team?.role}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="MessageSquare" className="flex-1">
              Team Chat
            </Button>
            <Button variant="outline" size="sm" iconName="Settings" className="flex-1">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;