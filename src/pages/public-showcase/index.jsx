import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import FilterPanel from './components/FilterPanel';
import ProjectModal from './components/ProjectModal';
import StatsOverview from './components/StatsOverview';
import TrendingSection from './components/TrendingSection';
import CategoryTabs from './components/CategoryTabs';

const PublicShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    hackathon: 'all',
    sortBy: 'votes',
    techStack: [],
    hasAward: false,
    teamSize: 'all'
  });

  const projectsPerPage = 12;

  // Mock data
  const mockProjects = [
    {
      id: 1,
      title: "EcoTrack - Carbon Footprint Monitor",
      description: "AI-powered platform that tracks and analyzes personal carbon footprint with actionable insights for sustainable living. Features real-time monitoring, personalized recommendations, and community challenges.",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop",
      category: "sustainability",
      hackathon: "Google I/O Hackathon 2024",
      votes: 1247,
      views: 3421,
      hasVoted: false,
      trending: true,
      award: "1st Place",
      techStack: ["React", "Node.js", "AI/ML", "Python"],
      team: [
        { name: "Sarah Chen", role: "Full Stack Developer", skills: "React, Node.js" },
        { name: "Marcus Johnson", role: "AI Engineer", skills: "Python, TensorFlow" },
        { name: "Elena Rodriguez", role: "UX Designer", skills: "Figma, Research" }
      ],
      features: [
        "Real-time carbon footprint tracking",
        "AI-powered sustainability recommendations",
        "Community challenges and leaderboards",
        "Integration with smart home devices",
        "Detailed analytics and reporting"
      ]
    },
    {
      id: 2,
      title: "MediConnect - Telemedicine Platform",
      description: "Comprehensive telemedicine solution connecting patients with healthcare providers through secure video consultations, prescription management, and health monitoring.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      category: "healthtech",
      hackathon: "Microsoft Build 2024",
      votes: 892,
      views: 2156,
      hasVoted: false,
      trending: true,
      award: "Best Healthcare Solution",
      techStack: ["React", "Node.js", "MongoDB", "WebRTC"],
      team: [
        { name: "Dr. James Wilson", role: "Medical Advisor", skills: "Healthcare, Strategy" },
        { name: "Lisa Park", role: "Frontend Developer", skills: "React, TypeScript" },
        { name: "Ahmed Hassan", role: "Backend Developer", skills: "Node.js, MongoDB" },
        { name: "Rachel Kim", role: "Security Engineer", skills: "Cybersecurity, HIPAA" }
      ]
    },
    {
      id: 3,
      title: "CryptoLearn - Blockchain Education",
      description: "Interactive learning platform that gamifies blockchain and cryptocurrency education with hands-on simulations, quizzes, and real-world trading scenarios.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      category: "edtech",
      hackathon: "TechCrunch Disrupt 2024",
      votes: 756,
      views: 1834,
      hasVoted: false,
      trending: true,
      techStack: ["Vue.js", "Blockchain", "Web3", "Solidity"],
      team: [
        { name: "Alex Thompson", role: "Blockchain Developer", skills: "Solidity, Web3" },
        { name: "Maya Patel", role: "Frontend Developer", skills: "Vue.js, CSS" },
        { name: "David Lee", role: "Content Creator", skills: "Education, Writing" }
      ]
    },
    {
      id: 4,
      title: "SmartFarm IoT - Agricultural Monitoring",
      description: "IoT-based agricultural monitoring system that uses sensors and machine learning to optimize crop yields, water usage, and pest management for sustainable farming.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
      category: "iot",
      hackathon: "AWS re:Invent 2024",
      votes: 634,
      views: 1567,
      hasVoted: false,
      award: "Innovation Award",
      techStack: ["Python", "IoT", "AWS", "Machine Learning"],
      team: [
        { name: "Carlos Rodriguez", role: "IoT Engineer", skills: "Arduino, Sensors" },
        { name: "Jennifer Wu", role: "Data Scientist", skills: "Python, ML" },
        { name: "Tom Anderson", role: "Cloud Architect", skills: "AWS, DevOps" }
      ]
    },
    {
      id: 5,
      title: "GameHub - Social Gaming Platform",
      description: "Cross-platform social gaming hub that connects players worldwide with real-time multiplayer games, tournaments, and community features.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      category: "gaming",
      hackathon: "NVIDIA GTC 2024",
      votes: 543,
      views: 1289,
      hasVoted: false,
      techStack: ["Unity", "Node.js", "WebSocket", "MongoDB"],
      team: [
        { name: "Ryan Mitchell", role: "Game Developer", skills: "Unity, C#" },
        { name: "Sophie Zhang", role: "Backend Developer", skills: "Node.js, WebSocket" },
        { name: "Jake Williams", role: "UI/UX Designer", skills: "Game Design, Unity UI" }
      ]
    },
    {
      id: 6,
      title: "FinanceAI - Personal Budget Assistant",
      description: "AI-powered personal finance assistant that analyzes spending patterns, provides budget recommendations, and helps users achieve their financial goals.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      category: "fintech",
      hackathon: "Apple WWDC 2024",
      votes: 487,
      views: 1123,
      hasVoted: false,
      techStack: ["React Native", "Python", "AI/ML", "Firebase"],
      team: [
        { name: "Michael Brown", role: "Mobile Developer", skills: "React Native, iOS" },
        { name: "Anna Kowalski", role: "AI Engineer", skills: "Python, NLP" },
        { name: "Chris Taylor", role: "Product Manager", skills: "Strategy, Analytics" }
      ]
    },
    {
      id: 7,
      title: "VirtualMeet - AR Meeting Platform",
      description: "Augmented reality meeting platform that creates immersive virtual workspaces for remote collaboration with 3D avatars and interactive whiteboards.",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
      category: "web",
      hackathon: "Meta Reality Hack 2024",
      votes: 421,
      views: 987,
      hasVoted: false,
      award: "Best AR/VR Solution",
      techStack: ["React", "WebXR", "Three.js", "WebRTC"],
      team: [
        { name: "Kevin Park", role: "AR Developer", skills: "WebXR, Three.js" },
        { name: "Maria Santos", role: "Frontend Developer", skills: "React, WebGL" },
        { name: "Daniel Kim", role: "3D Artist", skills: "Blender, 3D Modeling" }
      ]
    },
    {
      id: 8,
      title: "EcoDelivery - Sustainable Logistics",
      description: "Green logistics platform that optimizes delivery routes to minimize carbon emissions while providing real-time tracking and eco-friendly packaging solutions.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "sustainability",
      hackathon: "Google I/O Hackathon 2024",
      votes: 389,
      views: 856,
      hasVoted: false,
      techStack: ["Flutter", "Node.js", "Google Maps API", "MongoDB"],
      team: [
        { name: "Isabella Chen", role: "Mobile Developer", skills: "Flutter, Dart" },
        { name: "Roberto Silva", role: "Backend Developer", skills: "Node.js, APIs" }
      ]
    }
  ];

  const mockStats = {
    totalProjects: 1247,
    totalVotes: 45632,
    activeHackathons: 12,
    totalParticipants: 8934
  };

  const categories = [
    { value: 'all', label: 'All Projects', count: mockProjects?.length },
    { value: 'web', label: 'Web Development', count: mockProjects?.filter(p => p?.category === 'web')?.length },
    { value: 'mobile', label: 'Mobile Apps', count: mockProjects?.filter(p => p?.category === 'mobile')?.length },
    { value: 'ai-ml', label: 'AI/ML', count: mockProjects?.filter(p => p?.techStack?.includes('AI/ML'))?.length },
    { value: 'blockchain', label: 'Blockchain', count: mockProjects?.filter(p => p?.techStack?.includes('Blockchain'))?.length },
    { value: 'iot', label: 'IoT', count: mockProjects?.filter(p => p?.category === 'iot')?.length },
    { value: 'gaming', label: 'Gaming', count: mockProjects?.filter(p => p?.category === 'gaming')?.length },
    { value: 'fintech', label: 'FinTech', count: mockProjects?.filter(p => p?.category === 'fintech')?.length },
    { value: 'healthtech', label: 'HealthTech', count: mockProjects?.filter(p => p?.category === 'healthtech')?.length },
    { value: 'edtech', label: 'EdTech', count: mockProjects?.filter(p => p?.category === 'edtech')?.length },
    { value: 'sustainability', label: 'Sustainability', count: mockProjects?.filter(p => p?.category === 'sustainability')?.length }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, projects, activeCategory]);

  const applyFilters = () => {
    let filtered = [...projects];

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'ai-ml') {
        filtered = filtered?.filter(project => project?.techStack?.includes('AI/ML'));
      } else if (activeCategory === 'blockchain') {
        filtered = filtered?.filter(project => project?.techStack?.includes('Blockchain'));
      } else {
        filtered = filtered?.filter(project => project?.category === activeCategory);
      }
    }

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(searchTerm) ||
        project?.description?.toLowerCase()?.includes(searchTerm) ||
        project?.techStack?.some(tech => tech?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Hackathon filter
    if (filters?.hackathon !== 'all') {
      filtered = filtered?.filter(project => project?.hackathon === filters?.hackathon);
    }

    // Tech stack filter
    if (filters?.techStack?.length > 0) {
      filtered = filtered?.filter(project =>
        filters?.techStack?.some(tech => project?.techStack?.includes(tech))
      );
    }

    // Award filter
    if (filters?.hasAward) {
      filtered = filtered?.filter(project => project?.award);
    }

    // Team size filter
    if (filters?.teamSize !== 'all') {
      filtered = filtered?.filter(project => {
        const teamSize = project?.team?.length;
        switch (filters?.teamSize) {
          case 'solo': return teamSize === 1;
          case 'small': return teamSize >= 2 && teamSize <= 3;
          case 'medium': return teamSize >= 4 && teamSize <= 5;
          case 'large': return teamSize >= 6;
          default: return true;
        }
      });
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'votes':
          return b?.votes - a?.votes;
        case 'recent':
          return b?.id - a?.id;
        case 'views':
          return b?.views - a?.views;
        case 'trending':
          return (b?.trending ? 1 : 0) - (a?.trending ? 1 : 0);
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        default:
          return b?.votes - a?.votes;
      }
    });

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const handleVote = (projectId) => {
    setProjects(prev => prev?.map(project =>
      project?.id === projectId
        ? { ...project, votes: project?.votes + 1, hasVoted: true }
        : project
    ));
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: 'all',
      hackathon: 'all',
      sortBy: 'votes',
      techStack: [],
      hasAward: false,
      teamSize: 'all'
    };
    setFilters(clearedFilters);
    setActiveCategory('all');
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
  };

  // Pagination
  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading amazing projects...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-b border-border">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Trophy" size={24} color="white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
                  Innovation Showcase
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover breakthrough solutions from the world's most talented developers.\nVote for your favorites and get inspired by cutting-edge innovation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="ArrowDown"
                  iconPosition="right"
                  iconSize={20}
                >
                  Explore Projects
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/participant-portal'}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={20}
                >
                  Submit Your Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <StatsOverview stats={mockStats} />

          {/* Trending Section */}
          <TrendingSection
            projects={projects}
            onVote={handleVote}
            onViewDetails={handleViewDetails}
          />

          {/* Main Content */}
          <div id="projects-section" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Projects Grid */}
            <div className="lg:col-span-3">
              {/* Category Tabs */}
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {activeCategory === 'all' ? 'All Projects' : categories?.find(c => c?.value === activeCategory)?.label}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredProjects?.length} project{filteredProjects?.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={16}
                >
                  Filters
                </Button>
              </div>

              {/* Projects Grid */}
              {currentProjects?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {currentProjects?.map((project) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        onVote={handleVote}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        iconName="ChevronLeft"
                        iconSize={16}
                      >
                      </Button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        iconName="ChevronRight"
                        iconSize={16}
                      >
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms to find more projects.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVote={handleVote}
      />
    </div>
  );
};

export default PublicShowcase;