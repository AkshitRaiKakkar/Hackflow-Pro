import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EvaluationQueue from './components/EvaluationQueue';
import ScoringRubric from './components/ScoringRubric';
import BiasReductionTools from './components/BiasReductionTools';
import JudgeStats from './components/JudgeStats';
import CollaborationPanel from './components/CollaborationPanel';
import MentorshipHub from './components/MentorshipHub';

const JudgeDashboard = () => {
  const [activeView, setActiveView] = useState('queue');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showScoringModal, setShowScoringModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [biasReductionEnabled, setBiasReductionEnabled] = useState(true);
  const [biasSettings, setBiasSettings] = useState({
    anonymize_teams: true,
    randomize_order: true,
    blind_scoring: true,
    calibration_mode: false,
    structured_feedback: true,
    time_limits: false,
    time_limit: 15,
    calibration_count: 3
  });

  // Mock data for submissions
  const mockSubmissions = [
    {
      id: 1,
      title: "AI-Powered Healthcare Assistant",
      description: "An intelligent healthcare assistant that uses natural language processing to help patients understand medical information and connect with appropriate care providers.",
      status: "pending",
      team: {
        name: "Team Alpha",
        members: [
          { name: "John Doe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
          { name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
          { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
        ]
      },
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
      category: "Healthcare",
      submittedAt: "2025-01-25T10:30:00Z",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Smart City Traffic Optimizer",
      description: "A machine learning system that optimizes traffic flow in urban areas by analyzing real-time data from sensors and cameras.",
      status: "in_progress",
      team: {
        name: "Team Beta",
        members: [
          { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
          { name: "David Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" }
        ]
      },
      technologies: ["Python", "TensorFlow", "IoT", "AWS"],
      category: "Smart Cities",
      submittedAt: "2025-01-25T09:15:00Z",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Sustainable Fashion Marketplace",
      description: "A blockchain-based marketplace for sustainable fashion that tracks the entire supply chain and rewards eco-friendly practices.",
      status: "pending",
      team: {
        name: "Team Gamma",
        members: [
          { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
          { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
          { name: "Lisa Wang", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" },
          { name: "Tom Rodriguez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
        ]
      },
      technologies: ["Solidity", "React", "IPFS", "Web3"],
      category: "Sustainability",
      submittedAt: "2025-01-25T08:45:00Z",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    }
  ];

  // Mock scoring rubric
  const mockRubric = {
    criteria: [
      {
        id: 'innovation',
        name: 'Innovation & Creativity',
        description: 'How novel and creative is the solution? Does it address the problem in a unique way?',
        weight: 3,
        guidelines: {
          poor: 'Lacks originality, uses common approaches',
          good: 'Shows some creativity, moderate innovation',
          excellent: 'Highly innovative, breakthrough approach'
        }
      },
      {
        id: 'technical',
        name: 'Technical Implementation',
        description: 'Quality of code, architecture, and technical execution',
        weight: 3,
        guidelines: {
          poor: 'Poor code quality, basic implementation',
          good: 'Solid implementation, good practices',
          excellent: 'Exceptional code quality, advanced techniques'
        }
      },
      {
        id: 'impact',
        name: 'Potential Impact',
        description: 'How significant could the impact be if this solution were implemented?',
        weight: 2,
        guidelines: {
          poor: 'Limited impact, niche application',
          good: 'Moderate impact, useful for many',
          excellent: 'Transformative potential, wide-reaching impact'
        }
      },
      {
        id: 'presentation',
        name: 'Presentation Quality',
        description: 'How well is the solution presented and demonstrated?',
        weight: 1,
        guidelines: {
          poor: 'Unclear presentation, hard to understand',
          good: 'Clear presentation, easy to follow',
          excellent: 'Compelling presentation, engaging demo'
        }
      }
    ]
  };

  // Mock judge stats
  const mockStats = {
    reviewedCount: 24,
    totalSubmissions: 45,
    averageScore: 7.2,
    averageTime: 12,
    feedbackScore: 94
  };

  // Mock judges data
  const mockJudges = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      expertise: "AI/ML Expert",
      status: "online",
      reviewedCount: 32,
      isLead: true
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: "Software Architecture",
      status: "online",
      reviewedCount: 28,
      isLead: false
    },
    {
      id: 3,
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: "UX Design",
      status: "busy",
      reviewedCount: 19,
      isLead: false
    }
  ];

  // Mock discussions
  const mockDiscussions = [
    {
      id: 1,
      title: "Scoring Calibration Discussion",
      status: "active",
      participants: [1, 2, 3],
      lastMessage: "2025-01-27T16:30:00Z",
      lastMessageText: "I think we should adjust the technical criteria weight...",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: { name: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
          content: "I think we should adjust the technical criteria weight for this category.",
          timestamp: "2025-01-27T16:30:00Z"
        },
        {
          id: 2,
          sender: { name: "Prof. Michael Rodriguez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
          content: "Agreed. The current weight seems too high for early-stage prototypes.",
          timestamp: "2025-01-27T16:32:00Z"
        }
      ]
    }
  ];

  // Mock mentorship requests
  const mockMentorshipRequests = [
    {
      id: 1,
      participant: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "alex.chen@email.com",
        location: "San Francisco, CA"
      },
      project: {
        title: "AI-Powered Code Review Tool",
        description: "A tool that uses machine learning to automatically review code and suggest improvements."
      },
      skills: ["Machine Learning", "Python", "Code Analysis"],
      mentorshipGoals: "I want to improve my ML model accuracy and learn about production deployment best practices.",
      requestedAt: "2025-01-25T10:00:00Z",
      expectedDuration: "3 months",
      matchScore: 95,
      commitmentLevel: 80
    },
    {
      id: 2,
      participant: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        email: "sarah.j@email.com",
        location: "New York, NY"
      },
      project: {
        title: "Sustainable Fashion Marketplace",
        description: "A blockchain-based platform for trading sustainable fashion items."
      },
      skills: ["Blockchain", "React", "Smart Contracts"],
      mentorshipGoals: "Looking for guidance on blockchain architecture and smart contract security.",
      requestedAt: "2025-01-24T14:30:00Z",
      expectedDuration: "2 months",
      matchScore: 87,
      commitmentLevel: 90
    }
  ];

  const navigationItems = [
    { id: 'queue', name: 'Evaluation Queue', icon: 'List', count: mockSubmissions?.filter(s => s?.status === 'pending')?.length },
    { id: 'stats', name: 'My Statistics', icon: 'BarChart3' },
    { id: 'bias-tools', name: 'Bias Reduction', icon: 'Shield' },
    { id: 'collaboration', name: 'Judge Panel', icon: 'Users' },
    { id: 'mentorship', name: 'Mentorship Hub', icon: 'GraduationCap' }
  ];

  const handleEvaluate = (submission) => {
    setSelectedSubmission(submission);
    setShowScoringModal(true);
  };

  const handleSkip = (submission) => {
    console.log('Skipping submission:', submission?.id);
  };

  const handleScoreSubmit = async (evaluationData) => {
    console.log('Submitting evaluation:', evaluationData);
    setShowScoringModal(false);
    setSelectedSubmission(null);
  };

  const handleSendMessage = (discussionId, message) => {
    console.log('Sending message to discussion:', discussionId, message);
  };

  const handleStartDiscussion = (judgeId) => {
    console.log('Starting discussion with judge:', judgeId);
  };

  const handleAcceptMentorshipRequest = (requestId) => {
    console.log('Accepting mentorship request:', requestId);
  };

  const handleDeclineMentorshipRequest = (requestId) => {
    console.log('Declining mentorship request:', requestId);
  };

  const handleOfferMentorship = () => {
    console.log('Offering new mentorship');
  };

  useEffect(() => {
    document.title = 'Judge Dashboard - HackFlow Pro';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Judge Excellence Center</h1>
              <p className="text-muted-foreground">
                Streamlined evaluation workflows with bias-reduction tools
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => setActiveView(item?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeView === item?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
                {item?.count !== undefined && (
                  <span className="px-2 py-1 bg-background/20 rounded-full text-xs">
                    {item?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {activeView === 'queue' && (
              <EvaluationQueue
                submissions={mockSubmissions}
                onEvaluate={handleEvaluate}
                onSkip={handleSkip}
              />
            )}

            {activeView === 'stats' && (
              <JudgeStats stats={mockStats} />
            )}

            {activeView === 'bias-tools' && (
              <BiasReductionTools
                isEnabled={biasReductionEnabled}
                onToggle={() => setBiasReductionEnabled(!biasReductionEnabled)}
                settings={biasSettings}
                onSettingsChange={setBiasSettings}
              />
            )}

            {activeView === 'collaboration' && (
              <CollaborationPanel
                judges={mockJudges}
                discussions={mockDiscussions}
                onSendMessage={handleSendMessage}
                onStartDiscussion={handleStartDiscussion}
              />
            )}

            {activeView === 'mentorship' && (
              <MentorshipHub
                mentorshipRequests={mockMentorshipRequests}
                onAcceptRequest={handleAcceptMentorshipRequest}
                onDeclineRequest={handleDeclineMentorshipRequest}
                onOfferMentorship={handleOfferMentorship}
              />
            )}
          </div>
        </div>
      </main>
      {/* Scoring Modal */}
      {showScoringModal && selectedSubmission && (
        <ScoringRubric
          rubric={mockRubric}
          submission={selectedSubmission}
          onScoreSubmit={handleScoreSubmit}
          onClose={() => {
            setShowScoringModal(false);
            setSelectedSubmission(null);
          }}
        />
      )}
    </div>
  );
};

export default JudgeDashboard;