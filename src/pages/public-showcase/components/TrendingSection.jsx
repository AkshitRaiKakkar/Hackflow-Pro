import React from 'react';
import Icon from '../../../components/AppIcon';
import ProjectCard from './ProjectCard';

const TrendingSection = ({ projects, onVote, onViewDetails }) => {
  const trendingProjects = projects?.filter(project => project?.trending)?.slice(0, 3);

  if (trendingProjects?.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg">
          <Icon name="TrendingUp" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
          <p className="text-muted-foreground">Most popular projects this week</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProjects?.map((project, index) => (
          <div key={project?.id} className="relative">
            {/* Trending Badge */}
            <div className="absolute -top-2 -left-2 z-10">
              <div className="flex items-center space-x-1 bg-gradient-to-r from-primary to-secondary text-white px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="Flame" size={12} />
                <span>#{index + 1}</span>
              </div>
            </div>
            
            <ProjectCard
              project={project}
              onVote={onVote}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;