import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatsCard from './components/StatsCard';
import EventCard from './components/EventCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import EventTimeline from './components/EventTimeline';
import PerformanceChart from './components/PerformanceChart';

const OrganizerDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [notifications, setNotifications] = useState([]);

  // Mock data for dashboard
  const statsData = [
    {
      title: "Active Events",
      value: "12",
      change: "+2.5%",
      changeType: "positive",
      icon: "Calendar",
      color: "primary"
    },
    {
      title: "Total Participants",
      value: "1,247",
      change: "+18.2%",
      changeType: "positive",
      icon: "Users",
      color: "secondary"
    },
    {
      title: "Submissions",
      value: "892",
      change: "+12.4%",
      changeType: "positive",
      icon: "FileText",
      color: "accent"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+3.1%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success"
    }
  ];

  const eventsData = [
    {
      id: 1,
      name: "AI Innovation Challenge 2024",
      description: "Build the next generation of AI-powered solutions for healthcare and sustainability.",
      status: "active",
      startDate: "2024-10-15",
      participants: 324,
      teams: 89,
      location: "San Francisco, CA",
      duration: "48 hours",
      teamAvatars: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      id: 2,
      name: "Blockchain for Good Hackathon",
      description: "Leverage blockchain technology to solve real-world social and environmental challenges.",
      status: "upcoming",
      startDate: "2024-11-20",
      participants: 156,
      teams: 42,
      location: "Virtual Event",
      duration: "72 hours",
      teamAvatars: [1, 2, 3, 4]
    },
    {
      id: 3,
      name: "Mobile App Development Sprint",
      description: "Create innovative mobile applications that enhance user productivity and engagement.",
      status: "completed",
      startDate: "2024-09-10",
      participants: 198,
      teams: 56,
      location: "New York, NY",
      duration: "36 hours",
      teamAvatars: [1, 2, 3, 4, 5]
    }
  ];

  const activitiesData = [
    {
      id: 1,
      type: "registration",
      message: "Sarah Chen registered for AI Innovation Challenge 2024",
      timestamp: new Date(Date.now() - 300000),
      event: "AI Innovation Challenge",
      urgent: false
    },
    {
      id: 2,
      type: "team_formed",
      message: "Team \'Neural Networks\' formed with 4 members",
      timestamp: new Date(Date.now() - 600000),
      event: "AI Innovation Challenge",
      urgent: false
    },
    {
      id: 3,
      type: "submission",
      message: "Project \'HealthAI Assistant\' submitted by Team Alpha",
      timestamp: new Date(Date.now() - 900000),
      event: "AI Innovation Challenge",
      urgent: false
    },
    {
      id: 4,
      type: "judge_assigned",
      message: "Dr. Michael Rodriguez assigned as judge",
      timestamp: new Date(Date.now() - 1200000),
      event: "Blockchain for Good",
      urgent: true
    },
    {
      id: 5,
      type: "announcement",
      message: "New workshop \'Advanced React Patterns\' scheduled",
      timestamp: new Date(Date.now() - 1800000),
      event: "Mobile App Sprint",
      urgent: false
    }
  ];

  const timelineData = [
    {
      id: 1,
      title: "AI Innovation Challenge - Judging Phase",
      description: "Final evaluation of 89 team submissions",
      date: "2024-10-17T14:00:00",
      status: "active",
      participants: 324,
      location: "Virtual",
      actions: ["View Submissions", "Contact Judges"]
    },
    {
      id: 2,
      title: "Blockchain Hackathon - Registration Opens",
      description: "Open registration for blockchain developers",
      date: "2024-10-20T09:00:00",
      status: "upcoming",
      actions: ["Edit Details", "Send Invites"]
    },
    {
      id: 3,
      title: "Mobile Sprint - Awards Ceremony",
      description: "Announce winners and distribute prizes",
      date: "2024-10-25T18:00:00",
      status: "upcoming",
      location: "Grand Ballroom",
      actions: ["Prepare Ceremony"]
    },
    {
      id: 4,
      title: "Q4 Planning Meeting",
      description: "Strategic planning for upcoming events",
      date: "2024-11-01T10:00:00",
      status: "upcoming",
      actions: ["Schedule Meeting"]
    }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: "New participant registered",
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev?.slice(0, 4)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle different quick actions
    switch (actionId) {
      case 'create-event':
        // Navigate to event creation
        break;
      case 'invite-participants':
        // Open invitation modal
        break;
      case 'review-submissions':
        // Navigate to submissions review
        break;
      default:
        break;
    }
  };

  const handleEventView = (eventId) => {
    console.log(`Viewing event: ${eventId}`);
    // Navigate to event details
  };

  const handleEventManage = (eventId) => {
    console.log(`Managing event: ${eventId}`);
    // Navigate to event management
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient">Organizer Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, John! Here's what's happening with your events.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Create Event
                </Button>
              </div>
            </div>

            {/* Real-time Status Bar */}
            <div className="glass-card p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-foreground">System Status: All Good</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">1,247 Active Participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Activity" size={16} className="text-secondary" />
                    <span className="text-sm text-foreground">Real-time Updates</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <PerformanceChart 
                title="Event Performance Analytics"
                type="bar"
                period={selectedPeriod}
                data={statsData}
              />
            </div>

            {/* Quick Actions */}
            <div>
              <QuickActions onAction={handleQuickAction} />
            </div>
          </div>

          {/* Events and Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Active Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Active Events</h2>
                <Button variant="ghost" size="sm">
                  View All
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
              
              <div className="space-y-6">
                {eventsData?.slice(0, 2)?.map((event) => (
                  <EventCard
                    key={event?.id}
                    event={event}
                    onViewDetails={handleEventView}
                    onManage={handleEventManage}
                  />
                ))}
              </div>
            </div>

            {/* Event Timeline */}
            <div>
              <EventTimeline events={timelineData} />
            </div>
          </div>

          {/* Activity Feed and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <ActivityFeed activities={activitiesData} />
            </div>

            {/* Additional Insights */}
            <div className="space-y-6">
              {/* Engagement Metrics */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Insights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Team Formation Rate</span>
                    <span className="text-sm font-medium text-foreground">87%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Submission Rate</span>
                    <span className="text-sm font-medium text-foreground">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Judge Satisfaction</span>
                    <span className="text-sm font-medium text-foreground">94%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Achievements</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="Trophy" size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">1000+ Participants</p>
                      <p className="text-xs text-muted-foreground">Milestone reached</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Star" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">5-Star Rating</p>
                      <p className="text-xs text-muted-foreground">Event feedback</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="Award" size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Top Organizer</p>
                      <p className="text-xs text-muted-foreground">Platform recognition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrganizerDashboard;