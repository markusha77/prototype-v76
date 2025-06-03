import { useState, useEffect } from 'react';
import { EventService } from '../services/eventService';
import { FollowedAttendeesResponse } from '../types/events';

export const useFollowedAttendees = (eventIds: string[]) => {
  const [followedAttendees, setFollowedAttendees] = useState<Record<string, FollowedAttendeesResponse>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowedAttendees = async () => {
      try {
        setLoading(true);
        const results = await EventService.getFollowedAttendeesForMultipleEvents(eventIds);
        setFollowedAttendees(results);
      } catch (err) {
        setError('Failed to load followed attendees');
        console.error('Error fetching followed attendees:', err);
      } finally {
        setLoading(false);
      }
    };

    if (eventIds.length > 0) {
      fetchFollowedAttendees();
    } else {
      setLoading(false);
    }
  }, [eventIds]);

  return { followedAttendees, loading, error };
};
