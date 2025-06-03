import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Users, Briefcase, ArrowLeft, Share2, Bell, BellOff, MessageSquare, Calendar, Globe, Edit, Camera } from 'lucide-react'
import { ProjectFeed } from './ProjectFeed'
import { FilterBar } from './FilterBar'
import { EventCardGallery } from './EventCardGallery'
import useContentLoader from '../../hooks/useContentLoader'
import LoadingIndicator from '../common/LoadingIndicator'

interface Community {
  id: string;
  name: string;
  logo: string;
  members: number;
  description: string;
  projects: number;
  joinStatus: 'join' | 'request' | 'joined';
  coverImage?: string;
  longDescription?: string;
  createdAt?: string;
  website?: string;
  tags?: string[];
  admins?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  photoCount?: number;
}

// Extended mock data for communities
const communitiesData: Community[] = [
  {
    id: '1',
    name: 'EcoTech Innovators',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 3,
    description: 'A community of developers, designers, and entrepreneurs building technology solutions for environmental sustainability.',
    longDescription: 'EcoTech Innovators brings together passionate individuals from diverse backgrounds who share a common goal: leveraging technology to address environmental challenges. Our community focuses on developing sustainable solutions, sharing knowledge, and collaborating on projects that make a positive impact on our planet. From renewable energy applications to waste reduction technologies, our members are at the forefront of the green tech revolution.',
    projects: 2,
    joinStatus: 'join',
    createdAt: '2023-01-15T10:30:00Z',
    website: 'https://ecotechinnovators.example.com',
    tags: ['Sustainability', 'CleanTech', 'GreenInnovation', 'Environment'],
    photoCount: 24,
    admins: [
      {
        id: 'a1',
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Founder'
      },
      {
        id: 'a2',
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Community Manager'
      }
    ]
  },
  {
    id: '2',
    name: 'AI Creators Collective',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 3,
    description: 'A collaborative community exploring the frontiers of artificial intelligence and machine learning applications.',
    longDescription: 'The AI Creators Collective is a vibrant community dedicated to advancing the field of artificial intelligence through collaboration, education, and innovation. Our members range from AI researchers and data scientists to developers and entrepreneurs, all united by a passion for exploring the possibilities of machine learning, neural networks, and other AI technologies. We host regular workshops, hackathons, and discussion forums to share knowledge and push the boundaries of what\'s possible with AI.',
    projects: 1,
    joinStatus: 'request',
    createdAt: '2023-03-22T14:45:00Z',
    website: 'https://aicreators.example.com',
    tags: ['ArtificialIntelligence', 'MachineLearning', 'DeepLearning', 'DataScience'],
    photoCount: 18,
    admins: [
      {
        id: 'a3',
        name: 'Sophia Lee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Founder & AI Researcher'
      }
    ]
  },
  {
    id: '3',
    name: 'Design Systems Guild',
    logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 3,
    description: 'A professional community dedicated to advancing the practice of design systems and component-based design.',
    longDescription: 'The Design Systems Guild brings together designers, developers, and product managers who are passionate about creating cohesive, scalable design systems. Our community focuses on sharing best practices, tools, and methodologies for building and maintaining design systems that enhance product development workflows. From component libraries to design tokens, documentation, and governance, we explore all aspects of design systems to help organizations create more consistent and efficient product experiences.',
    projects: 1,
    joinStatus: 'join',
    createdAt: '2023-02-10T09:15:00Z',
    website: 'https://designsystemsguild.example.com',
    tags: ['DesignSystems', 'UX', 'UI', 'ComponentDesign', 'ProductDesign'],
    photoCount: 32,
    admins: [
      {
        id: 'a4',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Founder & Design Lead'
      },
      {
        id: 'a5',
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Community Manager'
      }
    ]
  }
];

const CommunityDetail: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortOption, setSortOption] = useState('Most Recent');
  
  // Use the content loader hook to manage loading state
  const { 
    isLoading, 
    contentStyle, 
    prepareContent 
  } = useContentLoader({
    scrollToTop: true,
    loadingDelay: 200,
    fadeInDuration: 300
  });
  
  // Trigger content preparation when component mounts
  useEffect(() => {
    prepareContent();
  }, [communityId, prepareContent]);
  
  // Find the community data based on the ID from the URL
  const community = communitiesData.find(c => c.id === communityId);
  
  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleEditCommunity = () => {
    console.log('Edit community:', communityId);
    // TODO: Implement edit functionality
  };
  
  const renderJoinButton = (status: Community['joinStatus']) => {
    switch (status) {
      case 'join':
        return (
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Join Community
          </button>
        );
      case 'request':
        return (
          <button className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium">
            Request Access
          </button>
        );
      case 'joined':
        return (
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md cursor-default font-medium">
            Joined
          </button>
        );
    }
  };
  
  // Show loading indicator while content is being prepared
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <LoadingIndicator 
            size="md" 
            color="indigo" 
            message="Loading community..." 
          />
        </div>
      </div>
    );
  }
  
  // Show not found message if community doesn't exist
  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community not found</h2>
            <Link 
              to="/communities"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Communities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div style={contentStyle}>
        {/* Back button section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              to="/communities"
              className="group inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Communities</span>
            </Link>
          </div>
        </div>

        {/* Hero section with cover image and community info */}
        <div className="relative">
          {/* Cover image */}
          <div className="h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={community.coverImage || 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'} 
              alt={community.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          </div>
          
          {/* Community info overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={community.logo} 
                  alt={community.name}
                  className="h-24 w-24 rounded-lg border-4 border-white shadow-sm object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
                <p className="text-white text-opacity-90 mb-4 max-w-3xl">
                  {community.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{community.members} members</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{community.projects} projects</span>
                  </div>
                  
                  {community.createdAt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created {formatDate(community.createdAt)}</span>
                    </div>
                  )}
                  
                  {community.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <a 
                        href={community.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col md:flex-row items-center gap-3">
                {renderJoinButton(community.joinStatus)}
                
                <button 
                  onClick={toggleSubscription}
                  className="flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition-colors"
                >
                  {isSubscribed ? (
                    <>
                      <BellOff className="h-4 w-4 mr-2" />
                      <span>Unsubscribe</span>
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
                
                <button className="flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition-colors">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Share</span>
                </button>

                {community.name === 'EcoTech Innovators' && (
                  <Link 
                    to={`/community/${communityId}/edit`}
                    className="flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition-colors"
                    title="Edit Community"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Edit</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              {/* About section - Changed from amber/orange to blue-purple */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg border border-blue-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-14 translate-x-14"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full translate-y-10 -translate-x-10"></div>
                
                <div className="relative z-10">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">About</h2>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm">
                    <p className="text-gray-700 mb-6">
                      {community.longDescription || community.description}
                    </p>

                    {/* Photo Gallery Section */}
                    {community.photoCount && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-700">Community Photos</h3>
                          <span className="text-xs text-gray-500">{community.photoCount} photos</span>
                        </div>
                        
                        {/* Photo preview grid */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {[...Array(3)].map((_, index) => (
                            <div key={index} className="aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80`}
                                alt={`Community photo ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80";
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                        <Link 
                          to={`/community/${community.id}/gallery`}
                          className="group flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-700 rounded-lg transition-all duration-200 font-medium"
                        >
                          <Camera className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>View photo gallery</span>
                        </Link>
                      </div>
                    )}
                    
                    {community.tags && community.tags.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {community.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {community.admins && community.admins.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Community Admins</h3>
                        <div className="space-y-4">
                          {community.admins.map(admin => (
                            <div key={admin.id} className="flex items-center">
                              <img 
                                src={admin.avatar} 
                                alt={admin.name}
                                className="h-10 w-10 rounded-full mr-3"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                                }}
                              />
                              <div>
                                <p className="font-medium text-gray-900">{admin.name}</p>
                                <p className="text-sm text-gray-500">{admin.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Members preview - Enhanced Design */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl shadow-lg border border-blue-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full -translate-y-14 translate-x-14"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-sky-200/20 to-blue-200/20 rounded-full translate-y-10 -translate-x-10"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">Members</h2>
                    <Link to={`/community/${community.id}/members`} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors">
                      View all
                    </Link>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm">
                    <div className="flex -space-x-2 overflow-hidden mb-4">
                      {[...Array(Math.min(5, community.members))].map((_, index) => (
                        <img
                          key={index}
                          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                          src={`https://images.unsplash.com/photo-${1490000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80`}
                          alt={`Member ${index + 1}`}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                          }}
                        />
                      ))}
                      
                      {community.members > 5 && (
                        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-700 text-sm font-medium ring-2 ring-white">
                          +{community.members - 5}
                        </span>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
                      Invite Members
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Gallery - Enhanced Design */}
              <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-lg border border-indigo-100 p-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      Upcoming Events
                    </h2>
                    <Link 
                      to={`/community/${community.id}/events`} 
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline transition-colors"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm">
                    <EventCardGallery />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-2">
              {/* Projects section - Enhanced Design */}
              <div className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 rounded-xl shadow-lg border border-violet-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 rounded-full -translate-y-18 translate-x-18"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/20 to-violet-200/20 rounded-full translate-y-14 -translate-x-14"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">Community Projects</h2>
                    
                    <div className="flex space-x-4">
                      <select 
                        className="border border-violet-200 rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      >
                        <option>All Categories</option>
                        <option>Web Development</option>
                        <option>Mobile Apps</option>
                        <option>Data Science</option>
                        <option>Design</option>
                      </select>
                      
                      <select 
                        className="border border-violet-200 rounded-lg px-3 py-1.5 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm"
                        value={sortOption}
                        onChange={handleSortChange}
                      >
                        <option>Most Recent</option>
                        <option>Most Popular</option>
                        <option>Most Commented</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-sm">
                    {/* Featured project */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Project</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                            alt="Featured Project"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Task Manager</h3>
                          
                          <p className="text-gray-600 mb-4">
                            A task management app that uses AI to prioritize and suggest tasks based on your work patterns and deadlines. 
                            The system learns from your habits and helps you focus on what matters most.
                          </p>
                          
                          <div className="flex items-center mb-4">
                            <img 
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" 
                              alt="Alex Johnson"
                              className="h-8 w-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-700">Alex Johnson</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">AI</span>
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">Productivity</span>
                            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">React</span>
                          </div>
                          
                          <Link 
                            to="/community/project/1"
                            className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-colors"
                          >
                            View Project
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project feed */}
                    <FilterBar />
                    <ProjectFeed 
                      categoryFilter={selectedCategory} 
                      sortOption={sortOption} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Discussions section - Changed from red to slate/gray */}
              <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-xl shadow-lg border border-slate-100 p-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/30 to-gray-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-zinc-200/20 to-slate-200/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent">Recent Discussions</h2>
                    
                    <Link to={`/community/${community.id}/discussions`} className="text-slate-600 hover:text-slate-800 text-sm font-medium hover:underline transition-colors">
                      View all
                    </Link>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-sm">
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <Link 
                            to={`/community/${community.id}/discussion/${index + 1}`}
                            className="block hover:bg-slate-50/50 rounded-lg p-3 -mx-3 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {index === 0 ? 'Welcome to our community!' : 
                               index === 1 ? 'Best practices for sustainable development' : 
                               'Upcoming virtual hackathon - Join us!'}
                            </h3>
                            
                            <div className="flex items-center mb-2">
                              <img 
                                src={`https://images.unsplash.com/photo-${1490000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80`}
                                alt="User avatar"
                                className="h-6 w-6 rounded-full mr-2"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                                }}
                              />
                              <span className="text-sm text-gray-600">
                                {index === 0 ? community.admins?.[0]?.name || 'Community Admin' : 
                                 `Community Member ${index}`}
                              </span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500">
                                {index === 0 ? '2 days ago' : 
                                 index === 1 ? '1 week ago' : 
                                 'Yesterday'}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{(index + 1) * 3} replies</span>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Link 
                        to={`/community/${community.id}/discussions/new`}
                        className="block w-full text-center px-4 py-2 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-md hover:from-slate-700 hover:to-gray-700 transition-colors"
                      >
                        Start a Discussion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
