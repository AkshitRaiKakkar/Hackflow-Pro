import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HackathonCard from './components/HackathonCard';
import RegistrationCard from './components/RegistrationCard';
import TeamMatchingCard from './components/TeamMatchingCard';
import ProgressTracker from './components/ProgressTracker';
import SkillAssessment from './components/SkillAssessment';
import CommunityFeed from './components/CommunityFeed';

const ParticipantPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');
  const [userProfile, setUserProfile] = useState(null);
  const [registeredHackathons, setRegisteredHackathons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);

  const mockHackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2024",
      description: "Build cutting-edge AI solutions that solve real-world problems. Focus on healthcare, education, or environmental sustainability.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      startDate: "2024-11-15",
      endDate: "2024-11-17",
      registrationDeadline: "2024-11-10",
      location: "San Francisco, CA",
      duration: "48 hours",
      participants: 250,
      totalPrize: "$50,000",
      status: "upcoming",
      tags: ["AI", "Machine Learning", "Healthcare", "Sustainability"],
      organizer: {
        name: "TechCorp Inc.",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
        rating: 4.8
      },
      prizes: [
        { place: 1, amount: "$25,000" },
        { place: 2, amount: "$15,000" },
        { place: 3, amount: "$10,000" }
      ]
    },
    {
      id: 2,
      title: "Blockchain Revolution Hackathon",
      description: "Create decentralized applications that revolutionize finance, supply chain, or digital identity management.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      startDate: "2024-12-01",
      endDate: "2024-12-03",
      registrationDeadline: "2024-11-25",
      location: "Austin, TX",
      duration: "72 hours",
      participants: 180,
      totalPrize: "$40,000",
      status: "upcoming",
      tags: ["Blockchain", "DeFi", "Smart Contracts", "Web3"],
      organizer: {
        name: "CryptoVentures",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
        rating: 4.6
      },
      prizes: [
        { place: 1, amount: "$20,000" },
        { place: 2, amount: "$12,000" },
        { place: 3, amount: "$8,000" }
      ]
    },
    {
      id: 3,
      title: "Green Tech Solutions Challenge",
      description: "Develop innovative technology solutions for environmental monitoring, renewable energy, or sustainable living.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&h=400&fit=crop",
      startDate: "2024-10-20",
      endDate: "2024-10-22",
      registrationDeadline: "2024-10-15",
      location: "Seattle, WA",
      duration: "48 hours",
      participants: 320,
      totalPrize: "$35,000",
      status: "active",
      tags: ["Climate Tech", "IoT", "Sustainability", "Mobile"],
      organizer: {
        name: "EcoTech Foundation",
        logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop",
        rating: 4.9
      },
      prizes: [
        { place: 1, amount: "$18,000" },
        { place: 2, amount: "$10,000" },
        { place: 3, amount: "$7,000" }
      ]
    }
  ];

  const mockUserProfile = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    experience: "intermediate",
    hackathonsParticipated: 5,
    hackathonsWon: 2,
    teamPreference: "frontend-dev",
    isProfileComplete: true
  };

  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'Search', description: 'Find hackathons' },
    { id: 'my-hackathons', label: 'My Events', icon: 'Calendar', description: 'Your registrations' },
    { id: 'team-matching', label: 'Team Up', icon: 'Users', description: 'Find teammates' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp', description: 'Track your journey' },
    { id: 'community', label: 'Community', icon: 'MessageSquare', description: 'Connect & share' }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUserProfile(mockUserProfile);
      setRegisteredHackathons([1, 3]); // User registered for hackathons 1 and 3
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleRegister = async (hackathonId) => {
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRegisteredHackathons(prev => [...prev, hackathonId]);
  };

  const handleViewDetails = (hackathonId) => {
    // Navigate to hackathon details page
    console.log('View details for hackathon:', hackathonId);
  };

  const handleJoinTeam = (teamId) => {
    console.log('Join team:', teamId);
  };

  const handleCreateTeam = () => {
    console.log('Create new team');
  };

  const handleSkillAssessmentComplete = (results) => {
    setUserProfile(prev => ({
      ...prev,
      skills: results?.skills,
      assessmentResults: results
    }));
    setShowSkillAssessment(false);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-muted/20 rounded w-1/3"></div>
                <div className="h-4 bg-muted/20 rounded"></div>
                <div className="h-4 bg-muted/20 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case 'discover':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Discover Hackathons</h2>
                <p className="text-muted-foreground">Find exciting hackathons to participate in</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" iconName="Filter">
                  Filter
                </Button>
                <Button variant="outline" iconName="Search">
                  Search
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockHackathons?.map((hackathon) => (
                <HackathonCard
                  key={hackathon?.id}
                  hackathon={hackathon}
                  onRegister={handleRegister}
                  onViewDetails={handleViewDetails}
                  isRegistered={registeredHackathons?.includes(hackathon?.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'my-hackathons':
        const myHackathons = mockHackathons?.filter(h => registeredHackathons?.includes(h?.id));
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">My Hackathons</h2>
                <p className="text-muted-foreground">Your registered events and submissions</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {myHackathons?.length} registered events
              </div>
            </div>
            {myHackathons?.length > 0 ? (
              <div className="space-y-6">
                {myHackathons?.map((hackathon) => (
                  <div key={hackathon?.id} className="space-y-4">
                    <HackathonCard
                      hackathon={hackathon}
                      onRegister={handleRegister}
                      onViewDetails={handleViewDetails}
                      isRegistered={true}
                    />
                    <RegistrationCard
                      hackathon={hackathon}
                      onRegister={handleRegister}
                      isRegistered={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Registered Events</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't registered for any hackathons yet. Discover exciting events to join!
                </p>
                <Button
                  variant="default"
                  iconName="Search"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Hackathons
                </Button>
              </div>
            )}
          </div>
        );

      case 'team-matching':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Team Matching</h2>
                <p className="text-muted-foreground">Find compatible teammates for your next hackathon</p>
              </div>
              {!userProfile?.isProfileComplete && (
                <Button
                  variant="outline"
                  iconName="Settings"
                  onClick={() => setShowSkillAssessment(true)}
                >
                  Complete Profile
                </Button>
              )}
            </div>

            {showSkillAssessment ? (
              <SkillAssessment
                onComplete={handleSkillAssessmentComplete}
                initialSkills={userProfile?.skills || []}
              />
            ) : (
              <TeamMatchingCard
                userSkills={userProfile?.skills || []}
                onJoinTeam={handleJoinTeam}
                onCreateTeam={handleCreateTeam}
              />
            )}
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Progress Tracker</h2>
              <p className="text-muted-foreground">Monitor your hackathon journey and submissions</p>
            </div>
            {registeredHackathons?.length > 0 ? (
              <ProgressTracker
                hackathonId={registeredHackathons?.[0]}
                teamId="team-1"
              />
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Progress</h3>
                <p className="text-muted-foreground mb-6">
                  Register for a hackathon to start tracking your progress and submissions.
                </p>
                <Button
                  variant="default"
                  iconName="Search"
                  onClick={() => setActiveTab('discover')}
                >
                  Find Hackathons
                </Button>
              </div>
            )}
          </div>
        );

      case 'community':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Community Hub</h2>
              <p className="text-muted-foreground">Connect with fellow hackers and share your journey</p>
            </div>

            <CommunityFeed />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={32} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">
                    Welcome to HackFlow Pro
                  </h1>
                  <p className="text-muted-foreground">
                    {userProfile ? `Hello ${userProfile?.name}! ` : ''}
                    Your gateway to amazing hackathon experiences
                  </p>
                </div>
              </div>
              
              {userProfile && (
                <div className="hidden md:flex items-center space-x-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{userProfile?.hackathonsParticipated}</div>
                    <div className="text-xs text-muted-foreground">Participated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">{userProfile?.hackathonsWon}</div>
                    <div className="text-xs text-muted-foreground">Won</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{registeredHackathons?.length}</div>
                    <div className="text-xs text-muted-foreground">Registered</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={20} />
                <div className="text-left">
                  <div>{tab?.label}</div>
                  <div className="text-xs opacity-70">{tab?.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-gradient">HackFlow Pro</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering innovation through seamless hackathon experiences. 
                Connect, create, and compete with the world's best developers.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" iconName="Github">
                </Button>
                <Button variant="ghost" size="sm" iconName="Twitter">
                </Button>
                <Button variant="ghost" size="sm" iconName="Linkedin">
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Discover Events</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Team Matching</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} HackFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParticipantPortal;