import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'from-primary to-primary/80',
      secondary: 'from-secondary to-secondary/80',
      accent: 'from-accent to-accent/80',
      success: 'from-success to-success/80',
      warning: 'from-warning to-warning/80',
      error: 'from-error to-error/80'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : type === 'negative' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="glass-card p-6 hover-lift smooth-transition">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(color)} flex items-center justify-center`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;