import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageSquare, Eye } from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { saveScrollPosition } from '../../utils/scrollUtils'

interface Author {
  name: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: Author;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'community'; // Add variant prop to control layout
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  variant = 'default' // Default variant for main Community Page
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on a link or button inside the card
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    
    // Save current scroll position before navigating
    saveScrollPosition('scrollPosition-/community');
    
    // Navigate to project detail page
    navigate(`/community/project/${project.id}`);
  };
  
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveScrollPosition('scrollPosition-/community');
  };
  
  return (    
    <div 
      className="bg-white rounded-2xl border border-gray-200/60 hover:border-purple-300/70 overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(147, 51, 234, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px -2px rgba(0, 0, 0, 0.15), 0 8px 24px -4px rgba(168, 85, 247, 0.25)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(147, 51, 234, 0.15)';
        e.currentTarget.style.transform = 'translateY(0px)';
      }}
      onClick={handleCardClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback image if the project image fails to load
            e.currentTarget.src = "https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
          <Link 
            to={`/community/project/${project.id}`}
            onClick={handleTitleClick}
            className="block"
          >
            {project.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center mb-4">
          <img 
            src={project.author.avatar} 
            alt={project.author.name}
            className="h-8 w-8 rounded-full mr-2 ring-2 ring-purple-100"
            onError={(e) => {
              // Fallback avatar if the author avatar fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80";
            }}
          />
          <span className="text-sm text-gray-700 font-medium">{project.author.name}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100 hover:from-purple-100 hover:to-pink-100 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Conditional rendering based on variant */}
        {variant === 'community' ? (
          // Community page variant with aligned date and metrics
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center hover:text-red-500 transition-colors duration-200">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span className="font-medium">{project.likes}</span>
              </div>
              
              <div className="flex items-center hover:text-blue-500 transition-colors duration-200">
                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                <span className="font-medium">{project.comments}</span>
              </div>
              
              <div className="flex items-center hover:text-green-500 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-medium">{project.views}</span>
              </div>
            </div>
            <span className="text-gray-400 font-medium">{formatDate(project.createdAt)}</span>
          </div>
        ) : (
          // Default variant for main Community Page (original layout)
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center hover:text-red-500 transition-colors duration-200">
                <Heart className="h-4 w-4 mr-1 text-red-500" />
                <span className="font-medium">{project.likes}</span>
              </div>
              
              <div className="flex items-center hover:text-blue-500 transition-colors duration-200">
                <Heart className="h-4 w-4 mr-1 text-blue-500" />
                <span className="font-medium">{project.comments}</span>
              </div>
              
              <div className="flex items-center hover:text-green-500 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-medium">{project.views}</span>
              </div>
            </div>
            <span className="text-gray-400 font-medium">{formatDate(project.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
