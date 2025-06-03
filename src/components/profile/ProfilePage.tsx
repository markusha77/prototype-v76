import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Edit3, Github, Twitter, Globe } from 'lucide-react'
import logo from '../../assets/logo.svg'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine if we came from the community page
  const fromCommunity = location.state?.from === '/community' || document.referrer.includes('/community')

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    username: 'alexjohnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    bio: 'Full-stack developer with a passion for AI and productivity tools. Working at the intersection of machine learning and user experience.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    github: 'alexjohnson',
    twitter: 'alexjohnson',
    projects: [
      {
        id: '1',
        title: 'AI-Powered Task Manager',
        description: 'A task management app that uses AI to prioritize and suggest tasks based on your work patterns and deadlines.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        likes: 124,
        comments: 18
      },
      {
        id: '7',
        title: 'Personal Finance Dashboard',
        description: 'A comprehensive dashboard for tracking expenses, investments, and financial goals with data visualization.',
        image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        likes: 87,
        comments: 12
      },
      {
        id: '8',
        title: 'Recipe Recommendation Engine',
        description: 'An app that suggests recipes based on ingredients you have, dietary preferences, and past cooking history.',
        image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        likes: 56,
        comments: 8
      }
    ]
  }

  const handleCancel = () => {
    navigate('/community')
  }

  const handleEditProfile = () => {
    // Navigate to edit profile with state indicating we came from profile page
    navigate('/profile/edit', { state: { from: '/profile' } });
  }

  const handleCreateNewProject = () => {
    // Navigate to create new project page
    navigate('/projects/new');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/community" className="flex items-center">
                <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
              </Link>
              
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {/* <Link to="/community" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Community
                </Link> */}
               
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* Profile header */}
      <div className="bg-white shadow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile content with back button aligned to profile image center */}
          <div className="relative">
            {/* Back button positioned to align with the middle of profile image */}
            <div className="absolute left-0" style={{ top: '17px' }}>
              <button 
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Communities
              </button>
            </div>

            {/* Edit Profile button positioned to align with the middle of profile image on the right */}
            <div className="absolute right-0" style={{ top: '17px' }}>
              <button 
                onClick={handleEditProfile}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Centered profile content */}
            <div className="flex flex-col items-center text-center">
              {/* Centered profile image */}
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-white shadow-md mb-4"
              />

              {/* Profile info */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
                
                <div className="mt-2 flex flex-wrap justify-center items-center text-sm text-gray-500">
                  {user.location && (
                    <span className="mr-4">{user.location}</span>
                  )}
                  
                  {user.website && (
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center mr-4 hover:text-indigo-600"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  )}
                  
                  {user.github && (
                    <a 
                      href={`https://github.com/${user.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center mr-4 hover:text-indigo-600"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      GitHub
                    </a>
                  )}
                  
                  {user.twitter && (
                    <a 
                      href={`https://twitter.com/${user.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-indigo-600"
                    >
                      <Twitter className="h-4 w-4 mr-1" />
                      Twitter
                    </a>
                  )}
                </div>
              </div>
              
              {/* Centered bio */}
              <div className="max-w-2xl mb-6">
                <p className="text-gray-700">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Projects</h2>
          
          <button 
            onClick={handleCreateNewProject}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.projects.map((project) => (
            <Link 
              key={project.id}
              to={`/community/project/${project.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{project.likes} likes</span>
                  <span>{project.comments} comments</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
