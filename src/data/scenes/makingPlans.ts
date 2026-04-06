import type { Scene } from '../../types';

export const makingPlansScene: Scene = {
  id: 'making-plans',
  category: 'social',
  title: 'Making Plans',
  coverImage: '📅',
  description: 'Learn how to make social plans and invitations with friends.',
  coreSentence: 'Are you free this weekend?',
  dialogue: {
    id: 'makingplans-dialogue',
    context: 'Two friends discussing weekend plans',
    speakers: [
      { id: 's1', name: 'Lisa', avatar: '👩' },
      { id: 's2', name: 'Tom', avatar: '👨' }
    ],
    lines: [
      { speakerId: 's1', text: 'Hey Tom, are you free this weekend?' },
      { speakerId: 's2', text: 'Yes, I\'m free on Saturday. What\'s up?' },
      { speakerId: 's1', text: 'Would you like to go hiking in the mountains?' },
      { speakerId: 's2', text: 'That sounds great! What time should we meet?' },
      { speakerId: 's1', text: 'How about 8 AM at the train station?' }
    ]
  },
  sentences: [
    {
      id: 'makingplans-s1',
      text: 'Are you free this weekend?',
      audioUrl: '/audio/makingplans/are-you-free-this-weekend.mp3',
      context: 'Checking someone\'s availability',
      phrases: [
        {
          id: 'makingplans-p1',
          text: 'Are you free this weekend',
          meaning: 'Asking if someone has available time',
          usage: 'Use when you want to invite someone to an activity',
          example: 'Are you free this weekend? I\'d love to catch up over coffee.',
          words: [
            { id: 'makingplans-w1', word: 'free', phonetic: '/friː/', meaning: 'available, not busy', image: '⏰', audioUrl: '/audio/words/free.mp3' },
            { id: 'makingplans-w2', word: 'this', phonetic: '/ðɪs/', meaning: 'referring to a specific time', image: '📌', audioUrl: '/audio/words/this.mp3' },
            { id: 'makingplans-w3', word: 'weekend', phonetic: '/ˈwiːkend/', meaning: 'Saturday and Sunday', image: '📅', audioUrl: '/audio/words/weekend.mp3' }
          ]
        }
      ]
    },
    {
      id: 'makingplans-s2',
      text: 'Would you like to...?',
      audioUrl: '/audio/makingplans/would-you-like-to.mp3',
      context: 'Polite way to extend an invitation',
      phrases: [
        {
          id: 'makingplans-p2',
          text: 'Would you like to',
          meaning: 'A polite invitation or offer',
          usage: 'Use when inviting someone to do something',
          example: 'Would you like to join us for dinner tonight?',
          words: [
            { id: 'makingplans-w4', word: 'would', phonetic: '/wʊd/', meaning: 'used to express a polite request', image: '🙏', audioUrl: '/audio/words/would.mp3' },
            { id: 'makingplans-w5', word: 'like', phonetic: '/laɪk/', meaning: 'to want or prefer', image: '👍', audioUrl: '/audio/words/like.mp3' }
          ]
        }
      ]
    }
  ]
};
