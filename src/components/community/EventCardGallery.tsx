import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { FollowedAttendees } from './FollowedAttendees';
import { useFollowedAttendees } from '../../hooks/useFollowedAttendees';

// Event type definition
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  category: string;
}

// Props interface
interface EventCardGalleryProps {
  size?: 'default' | 'large';
}

// Sample event data
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'React Developer Meetup',
    date: 'May 15, 2023 • 6:00 PM',
    location: 'Tech Hub, San Francisco',
    image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 87,
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'AI & Machine Learning Workshop',
    date: 'May 22, 2023 • 10:00 AM',
    location: 'Innovation Center, New York',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 124,
    category: 'AI & Machine Learning'
  },
  {
    id: '3',
    title: 'Mobile App Design Principles',
    date: 'June 3, 2023 • 2:00 PM',
    location: 'Design Studio, Austin',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 56,
    category: 'Design'
  },
  {
    id: '4',
    title: 'Blockchain Developer Conference',
    date: 'June 10, 2023 • 9:00 AM',
    location: 'Crypto Center, Miami',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 210,
    category: 'Blockchain'
  },
  {
    id: '5',
    title: 'Game Development Hackathon',
    date: 'June 17-18, 2023 • All Day',
    location: 'Game Studio, Seattle',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 95,
    category: 'Game Development'
  },
  {
    id: '6',
    title: 'Data Science Summit',
    date: 'June 25, 2023 • 11:00 AM',
    location: 'Data Center, Chicago',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    attendees: 178,
    category: 'Data Science'
  }
];

export const EventCardGallery: React.FC<EventCardGalleryProps> = ({ size = 'default' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Get event IDs for the hook
  const eventIds = upcomingEvents.map(event => event.id);
  const { followedAttendees, loading } = useFollowedAttendees(eventIds);

  // Determine card width and image height based on size prop
  const cardWidth = size === 'large' ? 'w-80' : 'w-72';
  const imageHeight = size === 'large' ? 'h-48' : 'h-40';
  const scrollAmount = size === 'large' ? 350 : 300;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="flex justify-end space-x-2 mb-4">
        <button 
          onClick={scrollLeft}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <button 
          onClick={scrollRight}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Events container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4">
          {upcomingEvents.map(event => {
            const eventFollowedAttendees = followedAttendees[event.id]?.followedAttendees || [];
            
            return (
              <div 
                key={event.id}
                className={`flex-shrink-0 ${cardWidth} snap-start bg-white rounded-2xl border border-gray-200/60 hover:border-indigo-300/70 overflow-hidden transition-all duration-300 flex flex-col`}
                style={{
                  boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(59, 130, 246, 0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px -2px rgba(0, 0, 0, 0.15), 0 8px 24px -4px rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(59, 130, 246, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className={`${imageHeight} w-full object-cover`}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-700 shadow-sm border border-indigo-100/50">
                    {event.category}
                  </div>
                </div>
                
                {/* Content area with flex-1 to push button to bottom */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {event.date}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {event.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {event.attendees} attending
                    </div>
                  </div>

                  {/* Followed Attendees Section */}
                  {!loading && eventFollowedAttendees.length > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50">
                      <FollowedAttendees 
                        attendees={eventFollowedAttendees}
                        className="justify-start"
                      />
                    </div>
                  )}
                  
                  {/* Spacer to push button to bottom */}
                  <div className="flex-1"></div>
                  
                  {/* Register button - always at bottom */}
                  <button className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Register Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
