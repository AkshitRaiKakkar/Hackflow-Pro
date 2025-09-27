import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TeamMatchingCard = ({ userSkills = [], onJoinTeam, onCreateTeam }) => {
  const [matchingTeams, setMatchingTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const mockTeams = [
    {
      id: 1,
      name: "AI Innovators",
      description: "Building next-gen AI solutions for healthcare diagnostics using machine learning and computer vision.",
      members: [
        {
          id: 1,
          name: "Sarah Chen",
          role: "Team Lead",
          skills: ["Python", "TensorFlow", "React"],
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Marcus Johnson",
          role: "Backend Dev",
          skills: ["Node.js", "MongoDB", "Docker"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
      ],
      lookingFor: ["UI/UX Designer", "Mobile Developer"],
      matchScore: 92,
      project: "MedAI Diagnostic Platform",
      tags: ["AI/ML", "Healthcare", "Computer Vision"]
    },
    {
      id: 2,
      name: "Blockchain Builders",
      description: "Creating decentralized finance solutions with smart contracts and Web3 integration.",
      members: [
        {
          id: 3,
          name: "Alex Rodriguez",
          role: "Blockchain Dev",
          skills: ["Solidity", "Web3", "React"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
      ],
      lookingFor: ["Frontend Developer", "UI/UX Designer", "Backend Developer"],
      matchScore: 85,
      project: "DeFi Lending Platform",
      tags: ["Blockchain", "DeFi", "Smart Contracts"]
    },
    {
      id: 3,
      name: "Green Tech Solutions",
      description: "Developing sustainable technology solutions for environmental monitoring and carbon tracking.",
      members: [
        {
          id: 4,
          name: "Emma Wilson",
          role: "Full Stack Dev",
          skills: ["React", "Node.js", "PostgreSQL"],
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        {
          id: 5,
          name: "David Kim",
          role: "Data Scientist",
          skills: ["Python", "R", "Machine Learning"],
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
      ],
      lookingFor: ["Mobile Developer", "DevOps Engineer"],
      matchScore: 78,
      project: "EcoTracker Mobile App",
      tags: ["Sustainability", "IoT", "Mobile"]
    }
  ];

  useEffect(() => {
    const loadTeams = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMatchingTeams(mockTeams);
      setIsLoading(false);
    };

    loadTeams();
  }, []);

  const handleJoinRequest = async (teamId) => {
    setSelectedTeam(teamId);
    // Simulate join request
    await new Promise(resolve => setTimeout(resolve, 1000));
    onJoinTeam(teamId);
    setSelectedTeam(null);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getMatchBadgeColor = (score) => {
    if (score >= 90) return 'bg-success/20 text-success border-success/30';
    if (score >= 80) return 'bg-warning/20 text-warning border-warning/30';
    return 'bg-muted/20 text-muted-foreground border-muted/30';
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Icon name="Users" size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Finding Perfect Teams</h3>
            <p className="text-sm text-muted-foreground">Matching you with compatible teammates...</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted/20 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Icon name="Users" size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Matching</h3>
            <p className="text-sm text-muted-foreground">Found {matchingTeams?.length} compatible teams</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateTeam}
        >
          Create Team
        </Button>
      </div>
      <div className="space-y-4">
        {matchingTeams?.map((team) => (
          <div key={team?.id} className="bg-card/50 border border-border rounded-lg p-4 hover:border-primary/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{team?.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getMatchBadgeColor(team?.matchScore)}`}>
                    {team?.matchScore}% Match
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{team?.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {team?.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Current Members ({team?.members?.length})</h5>
                <div className="space-y-2">
                  {team?.members?.map((member) => (
                    <div key={member?.id} className="flex items-center space-x-3">
                      <Image
                        src={member?.avatar}
                        alt={member?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{member?.name}</p>
                        <p className="text-xs text-muted-foreground">{member?.role}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member?.skills?.slice(0, 2)?.map((skill) => (
                          <span key={skill} className="px-1 py-0.5 bg-muted/30 text-xs text-muted-foreground rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Looking For</h5>
                <div className="space-y-1">
                  {team?.lookingFor?.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Icon name="Search" size={12} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{role}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Project Idea:</p>
                  <p className="text-sm font-medium text-foreground">{team?.project}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className={getMatchColor(team?.matchScore)} />
                  <span className={`text-sm font-medium ${getMatchColor(team?.matchScore)}`}>
                    {team?.matchScore}% Compatible
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {team?.members?.length}/4 members
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                >
                  Message
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="UserPlus"
                  loading={selectedTeam === team?.id}
                  onClick={() => handleJoinRequest(team?.id)}
                >
                  {selectedTeam === team?.id ? 'Requesting...' : 'Join Team'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-1">Pro Tip</h5>
            <p className="text-sm text-muted-foreground">
              Teams with higher match scores share similar skills and interests. Consider joining a team that complements your abilities for the best collaboration experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchingCard;