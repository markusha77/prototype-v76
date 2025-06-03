import React from 'react';
import { Play, ExternalLink, Clock, User, Eye } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  className?: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  views?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId, 
  title, 
  thumbnail,
  className = "",
  duration,
  difficulty,
  views = "1.2k"
}) => {
  // Convert Google Drive share link to direct download/view URL
  const getDirectUrl = (id: string) => {
    return `https://drive.google.com/file/d/${id}/view`;
  };

  // Use provided thumbnail or fallback to default
  const getThumbnailUrl = () => {
    // Only use thumbnail if it's a valid direct image URL
    if (thumbnail && thumbnail.trim() && !thumbnail.includes('google.com/url')) {
      return thumbnail;
    }
    // Professional coding-themed fallback
    return `https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80`;
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handlePlayClick = () => {
    // Open video in new tab instead of embedding
    window.open(getDirectUrl(videoId), '_blank');
  };

  // Define difficulty badge color
  const difficultyColor = {
    'Beginner': 'bg-green-500 text-white',
    'Intermediate': 'bg-blue-500 text-white',
    'Advanced': 'bg-purple-500 text-white'
  }[difficulty || 'Beginner'];

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Debug logging
  React.useEffect(() => {
    const url = getThumbnailUrl();
    console.log(`VideoPlayer for "${title}":`, {
      originalThumbnail: thumbnail,
      finalUrl: url,
      isCustom: thumbnail && thumbnail.trim() && !thumbnail.includes('google.com/url')
    });
  }, [thumbnail, title]);

  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className="relative w-full h-0 pb-[56.25%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlayClick}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Image */}
        <img
          src={getThumbnailUrl()}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          crossOrigin="anonymous"
        />

        {/* Error state - show fallback */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <Play className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-indigo-700 font-medium text-sm">{title}</p>
            </div>
          </div>
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-40' : 'opacity-0'
        }`}></div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {difficulty && (
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${difficultyColor} shadow-lg`}>
              {difficulty}
            </span>
          )}
          <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0' : '-translate-y-2'
          }`}>
            <div className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-90 rounded-full shadow-lg">
              <ExternalLink className="h-4 w-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center px-2 py-1 bg-black bg-opacity-75 text-white text-xs font-medium rounded-md">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
          </div>
        )}
        
        {/* Central Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative transition-all duration-300 transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            {/* Outer ring */}
            <div className={`absolute inset-0 w-20 h-20 bg-white rounded-full transition-all duration-300 ${
              isHovered ? 'bg-opacity-25 scale-125' : 'bg-opacity-20'
            }`}></div>
            
            {/* Inner button */}
            <button className={`relative flex items-center justify-center w-20 h-20 bg-white rounded-full transition-all duration-300 shadow-2xl ${
              isHovered ? 'bg-opacity-95 shadow-3xl' : 'bg-opacity-90'
            }`}>
              <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
            </button>
            
            {/* Pulse effect */}
            <div className={`absolute inset-0 w-20 h-20 bg-white rounded-full animate-ping transition-opacity duration-300 ${
              isHovered ? 'opacity-20' : 'opacity-0'
            }`}></div>
          </div>
        </div>
        
        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className={`transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
          }`}>
            <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-white text-xs opacity-90">Click to watch on Google Drive</p>
              <div className="flex items-center text-white text-xs opacity-75">
                <Eye className="h-3 w-3 mr-1" />
                {views} views
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay with additional info */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? 'bg-opacity-10' : 'bg-opacity-0'
        }`}>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 text-white">
              <p className="text-sm font-medium">Watch Tutorial</p>
              <p className="text-xs opacity-75">Opens in new tab</p>
            </div>
          </div>
        </div>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs p-1 rounded">
            {thumbnail ? 'Custom' : 'Default'}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
