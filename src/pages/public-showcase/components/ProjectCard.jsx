import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onVote, onViewDetails, isVoting = false }) => {
  const [hasVoted, setHasVoted] = useState(project?.hasVoted || false);
  const [voteCount, setVoteCount] = useState(project?.votes);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleVote = async () => {
    if (hasVoted || isVoting) return;
    
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

  return (
    <div className="glass-card hover-lift group cursor-pointer">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={project?.image}
          alt={project?.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        )}

        {/* Award Badge */}
        {project?.award && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 bg-accent/90 backdrop-blur-sm text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="Trophy" size={12} />
              <span>{project?.award}</span>
            </div>
          </div>
        )}

        {/* Vote Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e?.stopPropagation();
              handleVote();
            }}
            disabled={hasVoted || isVoting}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 backdrop-blur-sm ${
              hasVoted 
                ? 'bg-primary/90 text-primary-foreground cursor-not-allowed' 
                : 'bg-background/80 text-foreground hover:bg-primary/90 hover:text-primary-foreground'
            }`}
          >
            <Icon 
              name={hasVoted ? "Heart" : "Heart"} 
              size={12} 
              className={hasVoted ? "fill-current" : ""} 
            />
            <span>{formatVotes(voteCount)}</span>
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded text-xs font-medium">
            {project?.category}
          </span>
        </div>
      </div>
      {/* Project Content */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {project?.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project?.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project?.techStack?.slice(0, 3)?.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium border ${getTechStackColor(tech)}`}
            >
              {tech}
            </span>
          ))}
          {project?.techStack?.length > 3 && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-muted/50 text-muted-foreground border border-border">
              +{project?.techStack?.length - 3}
            </span>
          )}
        </div>

        {/* Team Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {project?.team?.slice(0, 3)?.map((member, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-white">
                    {member?.name?.charAt(0)}
                  </span>
                </div>
              ))}
              {project?.team?.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{project?.team?.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {project?.team?.length} member{project?.team?.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{project?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{project?.hackathon}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onViewDetails(project);
            }}
            className="flex-1"
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View Details
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              navigator.share?.({
                title: project?.title,
                text: project?.description,
                url: window.location?.href
              });
            }}
            iconName="Share2"
            iconSize={14}
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;