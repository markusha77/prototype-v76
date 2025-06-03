import { EventAttendee, FollowedAttendeesResponse } from '../types/events';

// Mock API service for event attendees
export class EventService {
  // Mock data for followed attendees
  private static mockFollowedAttendees: Record<string, EventAttendee[]> = {
    '1': [
      {
        id: 'user1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      }
    ],
    '2': [
      {
        id: 'user2',
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user3',
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      }
    ],
    '3': [
      {
        id: 'user5',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user6',
        name: 'James Brown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user7',
        name: 'Lisa Zhang',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user8',
        name: 'Michael Johnson',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user9',
        name: 'Sophie Taylor',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user10',
        name: 'Ryan Davis',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user11',
        name: 'Anna Martinez',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      }
    ],
    '4': [],
    '5': [
      {
        id: 'user12',
        name: 'Chris Anderson',
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user13',
        name: 'Rachel Green',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      }
    ],
    '6': [
      {
        id: 'user14',
        name: 'Tom Wilson',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user15',
        name: 'Jessica Lee',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      },
      {
        id: 'user16',
        name: 'Mark Thompson',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
        isFollowed: true
      }
    ]
  };

  static async getFollowedAttendees(eventId: string): Promise<FollowedAttendeesResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const followedAttendees = this.mockFollowedAttendees[eventId] || [];
    
    return {
      eventId,
      followedAttendees,
      totalFollowedCount: followedAttendees.length
    };
  }

  static async getFollowedAttendeesForMultipleEvents(eventIds: string[]): Promise<Record<string, FollowedAttendeesResponse>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const results: Record<string, FollowedAttendeesResponse> = {};
    
    for (const eventId of eventIds) {
      results[eventId] = await this.getFollowedAttendees(eventId);
    }
    
    return results;
  }
}
