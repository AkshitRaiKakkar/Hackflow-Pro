import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventTimeline = ({ events }) => {
  const getStatusIcon = (status) => {
    const icons = {
      'completed': 'CheckCircle',
      'active': 'Play',
      'upcoming': 'Clock',
      'cancelled': 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success',
      'active': 'text-primary',
      'upcoming': 'text-warning',
      'cancelled': 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Event Timeline</h3>
        <Button variant="ghost" size="sm">
          <Icon name="Calendar" size={16} />
        </Button>
      </div>
      <div className="space-y-6">
        {events?.map((event, index) => (
          <div key={event?.id} className="relative">
            {index !== events?.length - 1 && (
              <div className="absolute left-4 top-8 w-px h-16 bg-border"></div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center ${getStatusColor(event?.status)}`}>
                <Icon name={getStatusIcon(event?.status)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{event?.title}</h4>
                  <span className="text-xs text-muted-foreground">{getDaysUntil(event?.date)}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(event?.date)}</span>
                  </span>
                  
                  {event?.participants && (
                    <span className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{event?.participants} participants</span>
                    </span>
                  )}
                  
                  {event?.location && (
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{event?.location}</span>
                    </span>
                  )}
                </div>

                {event?.actions && event?.actions?.length > 0 && (
                  <div className="flex items-center space-x-2 mt-3">
                    {event?.actions?.map((action, actionIndex) => (
                      <Button key={actionIndex} variant="outline" size="xs">
                        {action}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          View Full Calendar
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default EventTimeline;