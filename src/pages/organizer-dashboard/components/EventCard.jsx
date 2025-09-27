import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onViewDetails, onManage }) => {
  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-success/10 text-success border-success/20',
      'upcoming': 'bg-warning/10 text-warning border-warning/20',
      'completed': 'bg-muted/10 text-muted-foreground border-muted/20',
      'draft': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || colors?.draft;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-card p-6 hover-lift smooth-transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{event?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event?.status)}`}>
              {event?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{event?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{formatDate(event?.startDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{event?.participants} participants</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{event?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{event?.duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {event?.teamAvatars?.slice(0, 3)?.map((avatar, index) => (
              <div key={index} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"></div>
            ))}
            {event?.teamAvatars?.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                <span className="text-xs font-medium text-muted-foreground">+{event?.teamAvatars?.length - 3}</span>
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{event?.teams} teams</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(event?.id)}>
            View Details
          </Button>
          <Button variant="default" size="sm" onClick={() => onManage(event?.id)}>
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;