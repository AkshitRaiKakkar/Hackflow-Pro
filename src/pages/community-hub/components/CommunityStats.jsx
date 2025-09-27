import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      id: 1,
      label: "Active Members",
      value: "12,847",
      change: "+18%",
      changeType: "increase",
      icon: "Users",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      label: "Mentorship Connections",
      value: "3,429",
      change: "+24%",
      changeType: "increase",
      icon: "UserCheck",
      color: "from-purple-500 to-violet-500"
    },
    {
      id: 3,
      label: "Knowledge Articles",
      value: "1,856",
      change: "+12%",
      changeType: "increase",
      icon: "BookOpen",
      color: "from-emerald-500 to-green-500"
    },
    {
      id: 4,
      label: "Active Discussions",
      value: "892",
      change: "+31%",
      changeType: "increase",
      icon: "MessageSquare",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat?.color} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat?.changeType === 'increase' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityStats;