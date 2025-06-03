import React from 'react';
import { EventAttendee } from '../../types/events';

interface FollowedAttendeesProps {
  attendees: EventAttendee[];
  className?: string;
}

export const FollowedAttendees: React.FC<FollowedAttendeesProps> = ({ 
  attendees, 
  className = "" 
}) => {
  if (attendees.length === 0) return null;

  const displayAttendees = attendees.slice(0, 3);
  const remainingCount = attendees.length - 3;

  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-xs font-medium text-blue-700 mr-2">
        Friends attending:
      </span>
      <div className="flex items-center">
        <div className="flex -space-x-1">
          {displayAttendees.map((attendee) => (
            <img
              key={attendee.id}
              src={attendee.avatar}
              alt={attendee.name}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              title={attendee.name}
            />
          ))}
          {remainingCount > 0 && (
            <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
