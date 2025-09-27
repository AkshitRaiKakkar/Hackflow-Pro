import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'registration': 'UserPlus',
      'submission': 'Upload',
      'team_formed': 'Users',
      'judge_assigned': 'Shield',
      'event_created': 'Plus',
      'announcement': 'Megaphone'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'registration': 'text-success',
      'submission': 'text-primary',
      'team_formed': 'text-secondary',
      'judge_assigned': 'text-warning',
      'event_created': 'text-accent',
      'announcement': 'text-error'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 smooth-transition">
            <div className={`w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity?.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
                {activity?.event && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-primary">{activity?.event}</span>
                  </>
                )}
              </div>
            </div>

            {activity?.urgent && (
              <div className="w-2 h-2 bg-error rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          View All Activities
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;