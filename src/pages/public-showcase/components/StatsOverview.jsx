import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Projects',
      value: stats?.totalProjects,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Total Votes',
      value: stats?.totalVotes,
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Active Hackathons',
      value: stats?.activeHackathons,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Participants',
      value: stats?.totalParticipants,
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000)?.toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000)?.toFixed(1)}K`;
    }
    return num?.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="glass-card p-6 text-center hover-lift"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item?.bgColor} mb-4`}>
            <Icon name={item?.icon} size={24} className={item?.color} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatNumber(item?.value)}
          </div>
          <div className="text-sm text-muted-foreground">
            {item?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;