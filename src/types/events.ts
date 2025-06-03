// Event and attendee types
export interface EventAttendee {
  id: string;
  name: string;
  avatar: string;
  isFollowed: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  category: string;
  followedAttendees: EventAttendee[];
}

export interface FollowedAttendeesResponse {
  eventId: string;
  followedAttendees: EventAttendee[];
  totalFollowedCount: number;
}
