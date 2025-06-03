import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Users, Briefcase, ArrowLeft, Share2, Bell, BellOff, MessageSquare, Calendar, Globe, Edit, Camera } from 'lucide-react'
import { ProjectFeed } from './ProjectFeed'
import { FilterBar } from './FilterBar'
import { EventCardGallery } from './EventCardGallery'
import useContentLoader from '../../hooks/useContentLoader'
import LoadingIndicator from '../common/LoadingIndicator'

interface OpenSpace {
  id: string;
  title: string;
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
  photoCount?: number;
  admins?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
}

// Extended mock data for open spaces
const openSpacesData: OpenSpace[] = [
  {
    id: '1',
    title: 'AI & Machine Learning',
    logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 1250,
    description: 'Explore the latest in artificial intelligence, machine learning, and their applications across industries.',
    longDescription: 'AI & Machine Learning is a vibrant open space where researchers, developers, and enthusiasts come together to explore the cutting-edge developments in artificial intelligence. Our community focuses on sharing knowledge about neural networks, deep learning, natural language processing, computer vision, and the ethical implications of AI. Whether you\'re a beginner looking to learn the fundamentals or an expert pushing the boundaries of what\'s possible, this space provides a collaborative environment for growth and innovation.',
    projects: 15,
    joinStatus: 'join',
    createdAt: '2023-01-10T08:00:00Z',
    website: 'https://aiml-space.example.com',
    tags: ['AI', 'Machine Learning', 'Data Science', 'Neural Networks', 'Deep Learning'],
    photoCount: 47,
    admins: [
      {
        id: 'a1',
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Space Moderator'
      },
      {
        id: 'a2',
        name: 'Alex Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'AI Research Lead'
      }
    ]
  },
  {
    id: '2',
    title: 'Sustainability Tech',
    logo: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 875,
    description: 'A space for discussing and developing technology solutions that address environmental challenges and promote sustainability.',
    longDescription: 'Sustainability Tech is an open space dedicated to harnessing technology for environmental good. Our community brings together engineers, scientists, entrepreneurs, and activists who are passionate about creating solutions for climate change, renewable energy, waste reduction, and sustainable living. We collaborate on projects ranging from smart grid technologies to biodegradable materials, always with the goal of creating a more sustainable future for our planet.',
    projects: 12,
    joinStatus: 'request',
    createdAt: '2023-02-05T12:30:00Z',
    website: 'https://sustaintech.example.com',
    tags: ['Sustainability', 'CleanTech', 'Environment', 'Green Solutions', 'Renewable Energy'],
    photoCount: 35,
    admins: [
      {
        id: 'a3',
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Environmental Tech Lead'
      }
    ]
  },
  {
    id: '3',
    title: 'Design Tools & Systems',
    logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 1050,
    description: 'Discuss design tools, systems, and methodologies that improve workflow and collaboration between designers and developers.',
    longDescription: 'Design Tools & Systems is an open space for designers, developers, and product managers who are passionate about creating efficient, scalable design workflows. Our community explores the latest design tools, component libraries, design tokens, and systematic approaches to design. We share best practices for design-development collaboration, discuss emerging tools and technologies, and work together to push the boundaries of what\'s possible in digital design.',
    projects: 8,
    joinStatus: 'join',
    createdAt: '2023-01-20T16:45:00Z',
    website: 'https://designtools.example.com',
    tags: ['Design Systems', 'UI/UX', 'Tools', 'Component Design', 'Collaboration'],
    photoCount: 28,
    admins: [
      {
        id: 'a4',
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Design Systems Lead'
      },
      {
        id: 'a5',
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'UX Research Lead'
      }
    ]
  },
  {
    id: '4',
    title: 'Web3 & Blockchain',
    logo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 930,
    description: 'Explore decentralized technologies, blockchain applications, and the future of web3 development.',
    longDescription: 'Web3 & Blockchain is an open space for developers, entrepreneurs, and enthusiasts exploring the decentralized web. Our community dives deep into blockchain technologies, smart contracts, DeFi protocols, NFTs, and the broader web3 ecosystem. We discuss technical implementations, share project ideas, and collaborate on building the next generation of decentralized applications that will shape the future of the internet.',
    projects: 20,
    joinStatus: 'joined',
    createdAt: '2023-03-01T11:20:00Z',
    website: 'https://web3blockchain.example.com',
    tags: ['Web3', 'Blockchain', 'Crypto', 'DeFi', 'Smart Contracts'],
    photoCount: 52,
    admins: [
      {
        id: 'a6',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'Blockchain Developer'
      }
    ]
  },
  {
    id: '5',
    title: 'No-Code Movement',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    members: 720,
    description: 'A space for no-code and low-code enthusiasts to share tools, techniques, and projects built without traditional programming.',
    longDescription: 'No-Code Movement is an open space that empowers creators to build amazing applications without traditional coding. Our community explores the latest no-code and low-code platforms, shares automation techniques, and celebrates the democratization of software development. Whether you\'re a business professional looking to streamline workflows or an entrepreneur building your next startup, this space provides the knowledge and support to turn your ideas into reality.',
    projects: 25,
    joinStatus: 'join',
    createdAt: '2023-02-28T14:10:00Z',
    website: 'https://nocodemovement.example.com',
    tags: ['No-Code', 'Low-Code', 'Automation', 'Tools', 'Citizen Developers'],
    photoCount: 19,
    admins: [
      {
        id: 'a7',
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
        role: 'No-Code Evangelist'
      }
    ]
  }
];

const OpenSpaceDetailed: React.FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
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
  }, [spaceId, prepareContent]);
  
  // Find the open space data based on the ID from the URL
  const openSpace = openSpacesData.find(s => s.id === spaceId);
  
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

  const handleEditSpace = () => {
    console.log('Edit open space:', spaceId);
    // TODO: Implement edit functionality
  };
  
  const renderJoinButton = (status: OpenSpace['joinStatus']) => {
    switch (status) {
      case 'join':
        return (
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Join Space
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
            message="Loading open space..." 
          />
        </div>
      </div>
    );
  }
  
  // Show not found message if open space doesn't exist
  if (!openSpace) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Space not found</h2>
            <Link 
              to="/open-spaces"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Open Spaces
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
              to="/open-spaces"
              className="group inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Open Spaces</span>
            </Link>
          </div>
        </div>

        {/* Hero section with cover image and space info */}
        <div className="relative">
          {/* Cover image */}
          <div className="h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={openSpace.coverImage || 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'} 
              alt={openSpace.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          </div>
          
          {/* Space info overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={openSpace.logo} 
                  alt={openSpace.title}
                  className="h-24 w-24 rounded-lg border-4 border-white shadow-sm object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80";
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{openSpace.title}</h1>
                <p className="text-white text-opacity-90 mb-4 max-w-3xl">
                  {openSpace.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{openSpace.members} members</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{openSpace.projects} projects</span>
                  </div>
                  
                  {openSpace.createdAt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created {formatDate(openSpace.createdAt)}</span>
                    </div>
                  )}
                  
                  {openSpace.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <a 
                        href={openSpace.website} 
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
                {renderJoinButton(openSpace.joinStatus)}
                
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

                {openSpace.title === 'AI & Machine Learning' && (
                  <button 
                    onClick={handleEditSpace}
                    className="flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md transition-colors"
                    title="Edit Space"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Edit</span>
                  </button>
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
              {/* About section */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg border border-blue-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-14 translate-x-14"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full translate-y-10 -translate-x-10"></div>
                
                <div className="relative z-10">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">About</h2>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm">
                    <p className="text-gray-700 mb-6">
                      {openSpace.longDescription || openSpace.description}
                    </p>

                    {/* Photo Gallery Section */}
                    {openSpace.photoCount && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-gray-700">Space Photos</h3>
                          <span className="text-xs text-gray-500">{openSpace.photoCount} photos</span>
                        </div>
                        
                        {/* Photo preview grid */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {[...Array(3)].map((_, index) => (
                            <div key={index} className="aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={`https://images.unsplash.com/photo-${1520000000000 + index * 100000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80`}
                                alt={`Space photo ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80";
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                        <Link 
                          to={`/open-space/${openSpace.id}/gallery`}
                          className="group flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-700 rounded-lg transition-all duration-200 font-medium"
                        >
                          <Camera className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>View photo gallery</span>
                        </Link>
                      </div>
                    )}
                    
                    {openSpace.tags && openSpace.tags.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {openSpace.tags.map(tag => (
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
                    
                    {openSpace.admins && openSpace.admins.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Space Moderators</h3>
                        <div className="space-y-4">
                          {openSpace.admins.map(admin => (
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
              
              {/* Members preview */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl shadow-lg border border-blue-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full -translate-y-14 translate-x-14"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-sky-200/20 to-blue-200/20 rounded-full translate-y-10 -translate-x-10"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">Members</h2>
                    <Link to={`/open-space/${openSpace.id}/members`} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors">
                      View all
                    </Link>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 shadow-sm">
                    <div className="flex -space-x-2 overflow-hidden mb-4">
                      {[...Array(Math.min(5, openSpace.members))].map((_, index) => (
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
                      
                      {openSpace.members > 5 && (
                        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-700 text-sm font-medium ring-2 ring-white">
                          +{openSpace.members - 5}
                        </span>
                      )}
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
                      Invite Members
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Gallery */}
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
                      to={`/open-space/${openSpace.id}/events`} 
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
              {/* Projects section - Changed title to "Open Space's projects" */}
              <div className="bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 rounded-xl shadow-lg border border-violet-100 p-6 mb-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 rounded-full -translate-y-18 translate-x-18"></div>
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/20 to-violet-200/20 rounded-full translate-y-14 -translate-x-14"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">Open Space's projects</h2>
                    
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
              
              {/* Discussions section */}
              <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-xl shadow-lg border border-slate-100 p-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/30 to-gray-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-zinc-200/20 to-slate-200/20 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent">Recent Discussions</h2>
                    
                    <Link to={`/open-space/${openSpace.id}/discussions`} className="text-slate-600 hover:text-slate-800 text-sm font-medium hover:underline transition-colors">
                      View all
                    </Link>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/50 shadow-sm">
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <Link 
                            to={`/open-space/${openSpace.id}/discussion/${index + 1}`}
                            className="block hover:bg-slate-50/50 rounded-lg p-3 -mx-3 transition-colors"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {index === 0 ? 'Welcome to our open space!' : 
                               index === 1 ? 'Best practices for AI development' : 
                               'Upcoming virtual workshop - Join us!'}
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
                                {index === 0 ? openSpace.admins?.[0]?.name || 'Space Moderator' : 
                                 `Space Member ${index}`}
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
                        to={`/open-space/${openSpace.id}/discussions/new`}
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

export default OpenSpaceDetailed;
