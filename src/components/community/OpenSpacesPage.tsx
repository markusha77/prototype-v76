import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Search, Users, FileText } from 'lucide-react'

// Define the space type
interface Space {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  members: number;
  projects: number;
}

// Sample data for spaces
const spaces: Space[] = [
  {
    id: '1',
    title: 'AI & Machine Learning',
    description: 'Explore the latest in artificial intelligence, machine learning, and their applications across industries.',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Machine Learning', 'Data Science', '+1'],
    members: 1250,
    projects: 1
  },
  {
    id: '2',
    title: 'Sustainability Tech',
    description: 'A space for discussing and developing technology solutions that address environmental challenges and promote sustainability.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'CleanTech', 'Environment', '+1'],
    members: 875,
    projects: 2
  },
  {
    id: '3',
    title: 'Design Tools & Systems',
    description: 'Discuss design tools, systems, and methodologies that improve workflow and collaboration between designers and developers.',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Design Systems', 'UI/UX', 'Tools', '+1'],
    members: 1050,
    projects: 1
  },
  {
    id: '4',
    title: 'Web3 & Blockchain',
    description: 'Explore decentralized technologies, blockchain applications, and the future of web3 development.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Web3', 'Blockchain', 'Crypto', 'DeFi'],
    members: 930,
    projects: 3
  },
  {
    id: '5',
    title: 'No-Code Movement',
    description: 'A space for no-code and low-code enthusiasts to share tools, techniques, and projects built without traditional programming.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['No-Code', 'Low-Code', 'Automation', 'Tools'],
    members: 720,
    projects: 2
  }
];

// All available tags for filtering
const allTags = [
  'AI', 'Automation', 'Blockchain', 'Citizen Developers', 'CleanTech', 
  'Collaboration', 'Crypto', 'Data Science', 'DeFi', 'Design Systems', 
  'Environment', 'Green Solutions', 'Low-Code', 'Machine Learning', 
  'NFTs', 'Neural Networks', 'No-Code', 'Sustainability', 'Tools', 'UI/UX', 'Web3'
];

const OpenSpacesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter spaces based on search query and selected tags
  const filteredSpaces = spaces.filter(space => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => space.tags.some(t => t.includes(tag)));
    
    return matchesSearch && matchesTags;
  });
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore Open Spaces</h1>
            <p className="text-gray-600 mt-1">
              Join interest-based spaces to connect, learn, and collaborate
            </p>
          </div>
          
          {/* Search bar */}
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full md:w-72 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Filter section */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="mr-2 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium text-gray-700">Filter by tags:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Spaces grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Link 
              key={space.id} 
              to={`/open-space/${space.id}`}
              className="bg-white rounded-lg overflow-hidden shadow border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Space image */}
              <div className="h-48 relative">
                <img 
                  src={space.image} 
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-bold p-4">{space.title}</h3>
                </div>
              </div>
              
              {/* Space content */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {space.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {space.tags.map((tag, index) => (
                    <span 
                      key={`${space.id}-${tag}-${index}`}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tag.startsWith('+') 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{space.members.toLocaleString()} members</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{space.projects} projects</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default OpenSpacesPage
