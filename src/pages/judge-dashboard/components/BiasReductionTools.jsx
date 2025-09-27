import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiasReductionTools = ({ isEnabled, onToggle, settings, onSettingsChange }) => {
  const [showSettings, setShowSettings] = useState(false);

  const biasReductionFeatures = [
    {
      id: 'anonymize_teams',
      name: 'Team Anonymization',
      description: 'Hide team names and member identities during evaluation',
      icon: 'EyeOff',
      enabled: settings?.anonymize_teams,
      impact: 'High'
    },
    {
      id: 'randomize_order',
      name: 'Random Submission Order',
      description: 'Randomize the order of submissions to prevent position bias',
      icon: 'Shuffle',
      enabled: settings?.randomize_order,
      impact: 'Medium'
    },
    {
      id: 'blind_scoring',
      name: 'Blind Scoring',
      description: 'Hide other judges\' scores until you complete your evaluation',
      icon: 'Shield',
      enabled: settings?.blind_scoring,
      impact: 'High'
    },
    {
      id: 'calibration_mode',
      name: 'Calibration Exercises',
      description: 'Practice scoring with reference submissions before actual evaluation',
      icon: 'Target',
      enabled: settings?.calibration_mode,
      impact: 'Medium'
    },
    {
      id: 'structured_feedback',
      name: 'Structured Feedback',
      description: 'Use guided prompts to ensure comprehensive and fair feedback',
      icon: 'List',
      enabled: settings?.structured_feedback,
      impact: 'Medium'
    },
    {
      id: 'time_limits',
      name: 'Evaluation Time Limits',
      description: 'Set consistent time limits for each submission evaluation',
      icon: 'Clock',
      enabled: settings?.time_limits,
      impact: 'Low'
    }
  ];

  const handleFeatureToggle = (featureId) => {
    onSettingsChange({
      ...settings,
      [featureId]: !settings?.[featureId]
    });
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'High': return 'bg-error/10 border-error/20';
      case 'Medium': return 'bg-warning/10 border-warning/20';
      case 'Low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Bias Reduction Tools</h2>
            <p className="text-sm text-muted-foreground">
              Ensure fair and objective evaluation processes
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isEnabled 
              ? 'bg-success/20 text-success' :'bg-muted/20 text-muted-foreground'
          }`}>
            {isEnabled ? 'Active' : 'Inactive'}
          </div>
          <Button
            variant={isEnabled ? "default" : "outline"}
            size="sm"
            onClick={onToggle}
            iconName={isEnabled ? "ShieldCheck" : "Shield"}
            iconPosition="left"
          >
            {isEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </div>
      {/* Master Toggle Notice */}
      {!isEnabled && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-warning mb-1">
                Bias Reduction Disabled
              </h3>
              <p className="text-xs text-muted-foreground">
                Enable bias reduction tools to ensure fair evaluation processes and maintain evaluation integrity.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {biasReductionFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              feature?.enabled && isEnabled
                ? 'bg-primary/5 border-primary/20' :'bg-muted/5 border-border hover:border-muted'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={feature?.icon} 
                  size={20} 
                  className={feature?.enabled && isEnabled ? 'text-primary' : 'text-muted-foreground'} 
                />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {feature?.name}
                  </h3>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getImpactBg(feature?.impact)}`}>
                    <span className={getImpactColor(feature?.impact)}>
                      {feature?.impact} Impact
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleFeatureToggle(feature?.id)}
                disabled={!isEnabled}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                  feature?.enabled && isEnabled
                    ? 'bg-primary' :'bg-muted'
                } ${!isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                    feature?.enabled && isEnabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {biasReductionFeatures?.filter(f => f?.enabled)?.length}
          </div>
          <div className="text-xs text-muted-foreground">Features Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">94%</div>
          <div className="text-xs text-muted-foreground">Bias Reduction</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">A+</div>
          <div className="text-xs text-muted-foreground">Fairness Score</div>
        </div>
      </div>
      {/* Advanced Settings */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-medium text-foreground">Advanced Settings</span>
          <Icon 
            name={showSettings ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
        
        {showSettings && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Evaluation Time Limit (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={settings?.time_limit || 15}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    time_limit: parseInt(e?.target?.value)
                  })}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Calibration Submissions
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={settings?.calibration_count || 3}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    calibration_count: parseInt(e?.target?.value)
                  })}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground"
                />
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <strong>Tip:</strong> Higher bias reduction settings may increase evaluation time but significantly improve fairness and consistency across judge panels.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiasReductionTools;