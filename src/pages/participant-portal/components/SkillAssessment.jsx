import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SkillAssessment = ({ onComplete, initialSkills = [] }) => {
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: 'Monitor',
      skills: [
        { id: 'html-css', name: 'HTML/CSS', level: 'beginner' },
        { id: 'javascript', name: 'JavaScript', level: 'intermediate' },
        { id: 'react', name: 'React', level: 'intermediate' },
        { id: 'vue', name: 'Vue.js', level: 'intermediate' },
        { id: 'angular', name: 'Angular', level: 'advanced' },
        { id: 'typescript', name: 'TypeScript', level: 'intermediate' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: 'Server',
      skills: [
        { id: 'nodejs', name: 'Node.js', level: 'intermediate' },
        { id: 'python', name: 'Python', level: 'beginner' },
        { id: 'java', name: 'Java', level: 'intermediate' },
        { id: 'php', name: 'PHP', level: 'beginner' },
        { id: 'go', name: 'Go', level: 'advanced' },
        { id: 'rust', name: 'Rust', level: 'advanced' }
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: 'Smartphone',
      skills: [
        { id: 'react-native', name: 'React Native', level: 'intermediate' },
        { id: 'flutter', name: 'Flutter', level: 'intermediate' },
        { id: 'ios', name: 'iOS (Swift)', level: 'advanced' },
        { id: 'android', name: 'Android (Kotlin)', level: 'advanced' },
        { id: 'xamarin', name: 'Xamarin', level: 'advanced' }
      ]
    },
    {
      id: 'data',
      title: 'Data Science & AI',
      icon: 'Brain',
      skills: [
        { id: 'machine-learning', name: 'Machine Learning', level: 'advanced' },
        { id: 'deep-learning', name: 'Deep Learning', level: 'advanced' },
        { id: 'data-analysis', name: 'Data Analysis', level: 'intermediate' },
        { id: 'tensorflow', name: 'TensorFlow', level: 'advanced' },
        { id: 'pytorch', name: 'PyTorch', level: 'advanced' },
        { id: 'nlp', name: 'Natural Language Processing', level: 'advanced' }
      ]
    },
    {
      id: 'design',
      title: 'Design & UX',
      icon: 'Palette',
      skills: [
        { id: 'ui-design', name: 'UI Design', level: 'beginner' },
        { id: 'ux-research', name: 'UX Research', level: 'intermediate' },
        { id: 'prototyping', name: 'Prototyping', level: 'beginner' },
        { id: 'figma', name: 'Figma', level: 'beginner' },
        { id: 'adobe-creative', name: 'Adobe Creative Suite', level: 'intermediate' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      icon: 'Cloud',
      skills: [
        { id: 'docker', name: 'Docker', level: 'intermediate' },
        { id: 'kubernetes', name: 'Kubernetes', level: 'advanced' },
        { id: 'aws', name: 'AWS', level: 'intermediate' },
        { id: 'azure', name: 'Microsoft Azure', level: 'intermediate' },
        { id: 'gcp', name: 'Google Cloud Platform', level: 'intermediate' },
        { id: 'ci-cd', name: 'CI/CD', level: 'intermediate' }
      ]
    }
  ];

  const assessmentQuestions = [
    {
      id: 'experience',
      title: 'Overall Experience',
      question: 'How many years of programming experience do you have?',
      type: 'single',
      options: [
        { value: 'less-than-1', label: 'Less than 1 year' },
        { value: '1-2', label: '1-2 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '5-10', label: '5-10 years' },
        { value: 'more-than-10', label: 'More than 10 years' }
      ]
    },
    {
      id: 'hackathon-experience',
      title: 'Hackathon Experience',
      question: 'How many hackathons have you participated in?',
      type: 'single',
      options: [
        { value: '0', label: 'This is my first' },
        { value: '1-3', label: '1-3 hackathons' },
        { value: '4-10', label: '4-10 hackathons' },
        { value: 'more-than-10', label: 'More than 10 hackathons' }
      ]
    },
    {
      id: 'team-role',
      title: 'Preferred Role',
      question: 'What role do you prefer in a team?',
      type: 'multiple',
      options: [
        { value: 'team-lead', label: 'Team Leader' },
        { value: 'frontend-dev', label: 'Frontend Developer' },
        { value: 'backend-dev', label: 'Backend Developer' },
        { value: 'fullstack-dev', label: 'Full Stack Developer' },
        { value: 'designer', label: 'UI/UX Designer' },
        { value: 'data-scientist', label: 'Data Scientist' },
        { value: 'mobile-dev', label: 'Mobile Developer' },
        { value: 'devops', label: 'DevOps Engineer' }
      ]
    }
  ];

  const steps = [
    { id: 'skills', title: 'Select Skills', icon: 'Code' },
    { id: 'assessment', title: 'Assessment', icon: 'FileText' },
    { id: 'review', title: 'Review', icon: 'CheckCircle' }
  ];

  const handleSkillToggle = (skillId) => {
    setSelectedSkills(prev => 
      prev?.includes(skillId) 
        ? prev?.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAssessmentAnswer = (questionId, answer) => {
    setAssessmentData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = {
      skills: selectedSkills,
      assessment: assessmentData,
      matchingScore: Math.floor(Math.random() * 30) + 70, // 70-100
      recommendations: generateRecommendations()
    };
    
    onComplete(result);
    setIsLoading(false);
  };

  const generateRecommendations = () => {
    const recommendations = [
      "Consider joining teams working on AI/ML projects to leverage your data science skills",
      "Your frontend skills make you a great fit for user-facing applications",
      "With your backend experience, you'd be valuable for API and database design",
      "Your design skills would complement technical teams perfectly"
    ];
    
    return recommendations?.slice(0, 2);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-success';
      case 'intermediate': return 'text-warning';
      case 'advanced': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'beginner': return 'bg-success/20 text-success border-success/30';
      case 'intermediate': return 'bg-warning/20 text-warning border-warning/30';
      case 'advanced': return 'bg-error/20 text-error border-error/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const renderSkillSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Select Your Skills</h3>
        <p className="text-muted-foreground">Choose the technologies and skills you're comfortable with</p>
      </div>

      {skillCategories?.map((category) => (
        <div key={category?.id} className="bg-card/50 border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name={category?.icon} size={20} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">{category?.title}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {category?.skills?.map((skill) => (
              <div key={skill?.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedSkills?.includes(skill?.id)}
                    onChange={() => handleSkillToggle(skill?.id)}
                  />
                  <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelBadge(skill?.level)}`}>
                  {skill?.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center text-sm text-muted-foreground">
        Selected {selectedSkills?.length} skills
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Quick Assessment</h3>
        <p className="text-muted-foreground">Help us understand your background for better team matching</p>
      </div>

      {assessmentQuestions?.map((question) => (
        <div key={question?.id} className="bg-card/50 border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-2">{question?.title}</h4>
          <p className="text-muted-foreground mb-4">{question?.question}</p>

          <div className="space-y-3">
            {question?.options?.map((option) => (
              <div key={option?.value} className="flex items-center space-x-3">
                {question?.type === 'single' ? (
                  <input
                    type="radio"
                    name={question?.id}
                    value={option?.value}
                    checked={assessmentData?.[question?.id] === option?.value}
                    onChange={(e) => handleAssessmentAnswer(question?.id, e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                ) : (
                  <Checkbox
                    checked={assessmentData?.[question?.id]?.includes(option?.value) || false}
                    onChange={(e) => {
                      const current = assessmentData?.[question?.id] || [];
                      const updated = e?.target?.checked
                        ? [...current, option?.value]
                        : current?.filter(v => v !== option?.value);
                      handleAssessmentAnswer(question?.id, updated);
                    }}
                  />
                )}
                <label className="text-sm text-foreground cursor-pointer">
                  {option?.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Profile</h3>
        <p className="text-muted-foreground">Confirm your skills and preferences</p>
      </div>

      <div className="bg-card/50 border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Selected Skills ({selectedSkills?.length})</h4>
        <div className="flex flex-wrap gap-2">
          {selectedSkills?.map((skillId) => {
            const skill = skillCategories?.flatMap(cat => cat?.skills)?.find(s => s?.id === skillId);
            return skill ? (
              <span key={skillId} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {skill?.name}
              </span>
            ) : null;
          })}
        </div>
      </div>

      <div className="bg-card/50 border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Assessment Responses</h4>
        <div className="space-y-3">
          {assessmentQuestions?.map((question) => {
            const answer = assessmentData?.[question?.id];
            if (!answer) return null;

            return (
              <div key={question?.id}>
                <p className="text-sm font-medium text-foreground">{question?.title}:</p>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(answer) 
                    ? answer?.map(val => 
                        question?.options?.find(opt => opt?.value === val)?.label
                      )?.join(', ')
                    : question?.options?.find(opt => opt?.value === answer)?.label
                  }
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-1">What's Next?</h5>
            <p className="text-sm text-muted-foreground">
              Based on your skills and preferences, we'll match you with compatible teams and suggest relevant hackathons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glass-card p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-primary/20 border-primary text-primary' :'border-muted text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                index < currentStep ? 'bg-primary' : 'bg-muted'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 0 && renderSkillSelection()}
        {currentStep === 1 && renderAssessment()}
        {currentStep === 2 && renderReview()}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps?.length}
        </div>

        {currentStep < steps?.length - 1 ? (
          <Button
            variant="default"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={handleNext}
            disabled={currentStep === 0 && selectedSkills?.length === 0}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="default"
            iconName="CheckCircle"
            iconPosition="left"
            onClick={handleComplete}
            loading={isLoading}
            disabled={selectedSkills?.length === 0}
          >
            {isLoading ? 'Completing...' : 'Complete Assessment'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;