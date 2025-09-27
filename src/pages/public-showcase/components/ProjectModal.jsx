import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose, onVote }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (project) {
      setHasVoted(project?.hasVoted || false);
      setVoteCount(project?.votes || 0);
      setIsImageLoaded(false);
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleVote = () => {
    if (hasVoted) return;
    setHasVoted(true);
    setVoteCount(prev => prev + 1);
    onVote(project?.id);
  };

  const formatVotes = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toString();
  };

  const getTechStackColor = (tech) => {
    const colors = {
      'React': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
      'Python': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      'AI/ML': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'Blockchain': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      'Mobile': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'Web3': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      'IoT': 'bg-red-500/10 text-red-400 border-red-500/20',
      'Flutter': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      'Vue.js': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    };
    return colors?.[tech] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'technical', label: 'Technical', icon: 'Code' },
    { id: 'demo', label: 'Demo', icon: 'Play' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {project?.award && (
                <div className="absolute -top-1 -right-1">
                  <Icon name="Trophy" size={16} className="text-accent" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{project?.title}</h2>
              <p className="text-sm text-muted-foreground">{project?.category} • {project?.hackathon}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant={hasVoted ? "default" : "outline"}
              size="sm"
              onClick={handleVote}
              disabled={hasVoted}
              iconName="Heart"
              iconPosition="left"
              iconSize={16}
            >
              {formatVotes(voteCount)}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.share?.({
                  title: project?.title,
                  text: project?.description,
                  url: window.location?.href
                });
              }}
              iconName="Share2"
              iconSize={16}
            >
            </Button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                    <Icon name="Image" size={32} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed">{project?.description}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project?.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getTechStackColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{formatVotes(voteCount)}</div>
                  <div className="text-sm text-muted-foreground">Votes</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{project?.views}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{project?.team?.length}</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Meet the Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project?.team?.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {member?.name?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{member?.name}</h4>
                      <p className="text-sm text-muted-foreground">{member?.role}</p>
                      <p className="text-xs text-muted-foreground">{member?.skills}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Technical Implementation</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project?.technicalDetails || `This innovative project leverages cutting-edge technologies including ${project?.techStack?.join(', ')} to deliver a robust and scalable solution. The architecture follows modern best practices with microservices design, ensuring high performance and maintainability.`}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {(project?.features || [
                    'Real-time data processing and analytics',
                    'Responsive cross-platform compatibility',
                    'Advanced security and authentication',
                    'Scalable cloud infrastructure',
                    'Intuitive user interface design'
                  ])?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Project Demo</h3>
                <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Play" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Demo video coming soon</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Check out the live demo and source code links below
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="default"
                  iconName="ExternalLink"
                  iconPosition="right"
                  iconSize={16}
                >
                  Live Demo
                </Button>
                <Button
                  variant="outline"
                  iconName="Github"
                  iconPosition="left"
                  iconSize={16}
                >
                  Source Code
                </Button>
                <Button
                  variant="ghost"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={16}
                >
                  Documentation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;