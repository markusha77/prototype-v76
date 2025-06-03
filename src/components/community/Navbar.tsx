import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, User } from 'lucide-react'
import AuthButtons from '../navigation/AuthButtons'
import logo from '../../assets/logo.svg'
import { Users, CircleDot, Home, BookOpen } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current route - no state, direct calculation
  const getActiveTab = (): 'community' | 'communities' | 'openspaces' | 'tutorials' => {
    const path = location.pathname;
    
    if (path.includes('/tutorials')) {
      return 'tutorials';
    } else if (path.includes('/open-space/') || path.includes('/open-spaces')) {
      return 'openspaces';
    } else if (path.includes('/communities') || path.includes('/community/')) {
      return 'communities';
    } else {
      return 'community';
    }
  };

  const activeTab = getActiveTab();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle tab click
  const handleTabClick = (tab: 'community' | 'communities' | 'openspaces' | 'tutorials') => {
    // Navigate to the appropriate route
    if (tab === 'community') {
      navigate('/community');
    } else if (tab === 'communities') {
      navigate('/communities');
    } else if (tab === 'openspaces') {
      navigate('/open-spaces');
    } else if (tab === 'tutorials') {
      navigate('/tutorials');
    }
  };

  // Handle profile click
  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Handle search click
  const handleSearchClick = () => {
    // You can implement search functionality here
    console.log('Search clicked');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
              </Link>
              
              <nav className="hidden md:ml-10 md:flex">
                <div className="flex items-center">
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'community' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('community')}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </button>
                  
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'communities' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('communities')}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Communities
                  </button>
                  
                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'openspaces' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('openspaces')}
                  >
                    <CircleDot className="mr-2 h-5 w-5" />
                    Open Spaces
                  </button>

                  <button 
                    className={`flex items-center px-4 py-2 text-base font-medium transition-all duration-200 border-b-2 ${
                      activeTab === 'tutorials' 
                        ? 'text-black border-blue-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                    onClick={() => handleTabClick('tutorials')}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Tutorials
                  </button>
                </div>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search icon button */}
              <button 
                onClick={handleSearchClick}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Search projects"
              >
                <Search className="h-6 w-6" />
              </button>
              
              {/* Auth buttons */}
              <AuthButtons />
              
              {/* Profile icon button */}
              <button 
                onClick={handleProfileClick}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Add padding to account for fixed header */}
      <div className="h-16"></div>
    </>
  )
}

export default Navbar;
