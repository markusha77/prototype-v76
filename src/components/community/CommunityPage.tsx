import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Play } from 'lucide-react'
import { ProjectFeed } from './ProjectFeed'
import { FilterBar } from './FilterBar'
import { EventCardGallery } from './EventCardGallery'
import { CATEGORIES } from '../../types'
import logo from '../../assets/logo.svg'
import { restoreScrollPosition } from '../../utils/scrollUtils'
import { HeroSection as SectionWelcoming } from './SectionWelcoming'
import { Navbar } from './Navbar'

const CommunityPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortOption, setSortOption] = useState('Most Recent')
  const location = useLocation()
  
  // Use direct scroll position restoration without animation
  useEffect(() => {
    const scrollPositionKey = `scrollPosition-${location.pathname}`
    
    // Use a small timeout to ensure the DOM is ready
    const timer = setTimeout(() => {
      restoreScrollPosition(scrollPositionKey);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the Navbar component instead of inline header */}
      <Navbar />
      
      {/* Section Welcome */}
      <SectionWelcoming />
      
      {/* Replace HeroSection with EventCardGallery - Pass size prop for main page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          </div>
          <EventCardGallery size="large" />
        </div>
      </div>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Community Projects</h1>
          
          <div className="flex space-x-4">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option>All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
            
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Most Commented</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Featured Project</h2>
            

          </div>
          
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
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">AI</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Productivity</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">React</span>
              </div>
              
              <Link 
                to="/community/project/1"
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
        
        <FilterBar />
        <ProjectFeed 
          categoryFilter={selectedCategory} 
          sortOption={sortOption} 
        />
      </main>

      {/* Footer with Gradient Line */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="ChatAndBuild Logo" className="h-6 w-6 mr-2" />
            <p className="text-gray-500">
              © 2025 Community Spaces. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CommunityPage
