import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ScoringRubric = ({ rubric, onScoreSubmit, submission, onClose }) => {
  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScoreChange = (criteriaId, score) => {
    setScores(prev => ({
      ...prev,
      [criteriaId]: Math.max(0, Math.min(score, 10))
    }));
  };

  const calculateTotalScore = () => {
    const totalWeight = rubric?.criteria?.reduce((sum, criteria) => sum + criteria?.weight, 0);
    const weightedScore = rubric?.criteria?.reduce((sum, criteria) => {
      const score = scores?.[criteria?.id] || 0;
      return sum + (score * criteria?.weight);
    }, 0);
    return totalWeight > 0 ? (weightedScore / totalWeight)?.toFixed(1) : 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const evaluationData = {
        submissionId: submission?.id,
        scores,
        feedback,
        totalScore: calculateTotalScore(),
        timestamp: new Date()?.toISOString()
      };
      await onScoreSubmit(evaluationData);
    } catch (error) {
      console.error('Error submitting scores:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isComplete = rubric?.criteria?.every(criteria => scores?.[criteria?.id] !== undefined);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Scoring Rubric</h2>
              <p className="text-muted-foreground mt-1">{submission?.title}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Bias Reduction Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Bias Reduction Active</h3>
                <p className="text-xs text-muted-foreground">
                  Team names and member identities are anonymized. Focus on technical merit and innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Scoring Criteria */}
          <div className="space-y-6">
            {rubric?.criteria?.map((criteria) => (
              <div key={criteria?.id} className="glass-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {criteria?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {criteria?.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Weight: {criteria?.weight}x | Max Score: 10 points
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {scores?.[criteria?.id] || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 10</div>
                  </div>
                </div>

                {/* Score Input */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={scores?.[criteria?.id] || 0}
                      onChange={(e) => handleScoreChange(criteria?.id, parseFloat(e?.target?.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleScoreChange(criteria?.id, (scores?.[criteria?.id] || 0) - 0.5)}
                      iconName="Minus"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleScoreChange(criteria?.id, (scores?.[criteria?.id] || 0) + 0.5)}
                      iconName="Plus"
                    />
                  </div>
                </div>

                {/* Score Guidelines */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="bg-error/10 border border-error/20 rounded p-2">
                    <div className="font-medium text-error">Poor (0-3)</div>
                    <div className="text-muted-foreground">{criteria?.guidelines?.poor}</div>
                  </div>
                  <div className="bg-warning/10 border border-warning/20 rounded p-2">
                    <div className="font-medium text-warning">Good (4-7)</div>
                    <div className="text-muted-foreground">{criteria?.guidelines?.good}</div>
                  </div>
                  <div className="bg-success/10 border border-success/20 rounded p-2">
                    <div className="font-medium text-success">Excellent (8-10)</div>
                    <div className="text-muted-foreground">{criteria?.guidelines?.excellent}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Section */}
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Detailed Feedback
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e?.target?.value)}
              placeholder="Provide constructive feedback to help the team improve..."
              className="w-full h-32 bg-input border border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">
                {feedback?.length}/500 characters
              </span>
              <span className="text-xs text-muted-foreground">
                Optional but recommended
              </span>
            </div>
          </div>

          {/* Score Summary */}
          <div className="glass-card p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Total Score</h3>
                <p className="text-sm text-muted-foreground">
                  Weighted average across all criteria
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient">
                  {calculateTotalScore()}
                </div>
                <div className="text-sm text-muted-foreground">/ 10.0</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!isComplete || isSubmitting}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              Submit Evaluation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoringRubric;