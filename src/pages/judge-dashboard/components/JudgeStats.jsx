import React from 'react';
import Icon from '../../../components/AppIcon';

const JudgeStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Submissions Reviewed',
      value: stats?.reviewedCount,
      total: stats?.totalSubmissions,
      icon: 'FileText',
      color: 'primary',
      trend: '+12 today'
    },
    {
      title: 'Average Score Given',
      value: stats?.averageScore?.toFixed(1),
      suffix: '/10',
      icon: 'Star',
      color: 'secondary',
      trend: '+0.3 vs last event'
    },
    {
      title: 'Evaluation Time',
      value: stats?.averageTime,
      suffix: 'min',
      icon: 'Clock',
      color: 'accent',
      trend: '-2min improvement'
    },
    {
      title: 'Feedback Quality',
      value: stats?.feedbackScore,
      suffix: '%',
      icon: 'MessageSquare',
      color: 'success',
      trend: 'Excellent rating'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Evaluated "AI-Powered Healthcare Assistant"',
      score: 8.5,
      time: '2 hours ago',
      icon: 'Star'
    },
    {
      id: 2,
      action: 'Provided detailed feedback on "Smart City Dashboard"',
      time: '4 hours ago',
      icon: 'MessageSquare'
    },
    {
      id: 3,
      action: 'Completed calibration exercise',
      time: '1 day ago',
      icon: 'Target'
    },
    {
      id: 4,
      action: 'Joined judge panel discussion',
      time: '2 days ago',
      icon: 'Users'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20',
      accent: 'text-accent bg-accent/10 border-accent/20',
      success: 'text-success bg-success/10 border-success/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <div key={index} className="glass-card p-4 hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getColorClasses(stat?.color)}`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              {stat?.total && (
                <div className="text-xs text-muted-foreground">
                  {stat?.value}/{stat?.total}
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-foreground">
                  {stat?.value}
                </span>
                {stat?.suffix && (
                  <span className="text-sm text-muted-foreground">
                    {stat?.suffix}
                  </span>
                )}
              </div>
              
              <h3 className="text-sm font-medium text-foreground">
                {stat?.title}
              </h3>
              
              {stat?.trend && (
                <p className="text-xs text-muted-foreground">
                  {stat?.trend}
                </p>
              )}
            </div>

            {/* Progress Bar for submissions */}
            {stat?.total && (
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r from-${stat?.color} to-${stat?.color}/80`}
                    style={{ width: `${(stat?.value / stat?.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Performance Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Evaluation Performance</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">
              This Week
            </button>
            <button className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground">
              This Month
            </button>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="space-y-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.map((day, index) => {
            const value = Math.floor(Math.random() * 10) + 1;
            return (
              <div key={day} className="flex items-center space-x-3">
                <div className="w-8 text-xs text-muted-foreground">{day}</div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${value * 10}%` }}
                  ></div>
                </div>
                <div className="w-8 text-xs text-foreground text-right">{value}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={activity?.icon} size={14} className="text-muted-foreground" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {activity?.action}
                  {activity?.score && (
                    <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      Score: {activity?.score}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Judge Ranking */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Judge Panel Ranking</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">#3 of 12 judges</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="text-sm font-medium text-foreground">Dr. Sarah Chen</span>
            </div>
            <div className="text-sm text-muted-foreground">98.5% accuracy</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-sm font-medium text-foreground">Prof. Michael Rodriguez</span>
            </div>
            <div className="text-sm text-muted-foreground">96.2% accuracy</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-sm font-medium text-primary">You</span>
            </div>
            <div className="text-sm text-muted-foreground">94.8% accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeStats;