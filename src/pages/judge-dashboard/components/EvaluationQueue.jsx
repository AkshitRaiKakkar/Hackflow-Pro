import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EvaluationQueue = ({ submissions, onEvaluate, onSkip }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterStatus, setFilterStatus] = useState('pending');

  const filteredSubmissions = submissions?.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission?.status === filterStatus;
  });

  const currentSubmission = filteredSubmissions?.[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredSubmissions?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const statusFilters = [
    { value: 'all', label: 'All Submissions', count: submissions?.length },
    { value: 'pending', label: 'Pending Review', count: submissions?.filter(s => s?.status === 'pending')?.length },
    { value: 'in_progress', label: 'In Progress', count: submissions?.filter(s => s?.status === 'in_progress')?.length },
    { value: 'completed', label: 'Completed', count: submissions?.filter(s => s?.status === 'completed')?.length }
  ];

  if (!currentSubmission) {
    return (
      <div className="glass-card p-8 text-center">
        <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">All Caught Up!</h3>
        <p className="text-muted-foreground">No submissions match your current filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusFilters?.map((filter) => (
          <button
            key={filter?.value}
            onClick={() => {
              setFilterStatus(filter?.value);
              setCurrentIndex(0);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filterStatus === filter?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {filter?.label}
            <span className="ml-2 px-2 py-1 rounded-full text-xs bg-background/20">
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Queue Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">Evaluation Queue</h2>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} of {filteredSubmissions?.length}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === filteredSubmissions?.length - 1}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
      {/* Current Submission Card */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Project Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentSubmission?.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentSubmission?.description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentSubmission?.status === 'pending' ?'bg-warning/20 text-warning'
                  : currentSubmission?.status === 'in_progress' ?'bg-primary/20 text-primary' :'bg-success/20 text-success'
              }`}>
                {currentSubmission?.status?.replace('_', ' ')?.toUpperCase()}
              </div>
            </div>

            {/* Team Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex -space-x-2">
                {currentSubmission?.team?.members?.map((member, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={member?.avatar}
                      alt={member?.name}
                      className="w-8 h-8 rounded-full border-2 border-background"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {currentSubmission?.team?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentSubmission?.team?.members?.length} members
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentSubmission?.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Submission Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <p className="text-foreground font-medium">
                  {new Date(currentSubmission.submittedAt)?.toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="text-foreground font-medium">{currentSubmission?.category}</p>
              </div>
            </div>
          </div>

          {/* Project Media */}
          <div className="lg:w-80">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              <Image
                src={currentSubmission?.thumbnail}
                alt={currentSubmission?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onEvaluate(currentSubmission)}
                iconName="Star"
                iconPosition="left"
                className="flex-1"
              >
                Evaluate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSkip(currentSubmission)}
                iconName="SkipForward"
                iconPosition="left"
              >
                Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Queue Progress</span>
          <span className="text-sm text-foreground font-medium">
            {Math.round(((currentIndex + 1) / filteredSubmissions?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredSubmissions?.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationQueue;