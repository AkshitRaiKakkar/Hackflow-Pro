import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationCard = ({ hackathon, onRegister, isRegistered = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    experience: '',
    skills: [],
    motivation: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (2-3 years)' },
    { value: 'advanced', label: 'Advanced (4+ years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'mobile', label: 'Mobile Development' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onRegister(formData);
    setIsLoading(false);
  };

  if (isRegistered) {
    return (
      <div className="glass-card p-6 border border-success/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Registration Complete!</h3>
            <p className="text-sm text-muted-foreground">You're all set for {hackathon?.title}</p>
          </div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-4">
          <p className="text-sm text-success font-medium mb-2">Next Steps:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Check your email for confirmation details</li>
            <li>• Join the team formation process</li>
            <li>• Attend the opening ceremony on {hackathon?.startDate}</li>
          </ul>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" iconName="Users" className="flex-1">
            Find Team
          </Button>
          <Button variant="default" iconName="Calendar" className="flex-1">
            View Schedule
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <Icon name="UserPlus" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Register for Hackathon</h3>
          <p className="text-sm text-muted-foreground">Join {hackathon?.title} and start building!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            required
          />
          
          <Input
            label="University/Organization"
            type="text"
            placeholder="Your institution"
            value={formData?.university}
            onChange={(e) => handleInputChange('university', e?.target?.value)}
            required
          />
        </div>

        <Select
          label="Experience Level"
          placeholder="Select your experience level"
          options={experienceOptions}
          value={formData?.experience}
          onChange={(value) => handleInputChange('experience', value)}
          required
        />

        <Select
          label="Technical Skills"
          description="Select all that apply (helps with team matching)"
          placeholder="Choose your skills"
          options={skillOptions}
          value={formData?.skills}
          onChange={(value) => handleInputChange('skills', value)}
          multiple
          searchable
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Why do you want to participate? *
          </label>
          <textarea
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={4}
            placeholder="Tell us about your motivation and what you hope to achieve..."
            value={formData?.motivation}
            onChange={(e) => handleInputChange('motivation', e?.target?.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Your data is secure and encrypted</span>
          </div>
          
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            {isLoading ? 'Registering...' : 'Register Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationCard;