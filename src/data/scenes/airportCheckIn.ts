import type { Scene } from '../../types';

export const airportCheckInScene: Scene = {
  id: 'airport-checkin',
  category: 'travel',
  title: 'Airport Check-in',
  coverImage: '✈️',
  description: 'Learn essential phrases for checking in at the airport.',
  coreSentence: 'I\'d like to check in for my flight.',
  dialogue: {
    id: 'airport-dialogue',
    context: 'Passenger checking in at the airline counter',
    speakers: [
      { id: 's1', name: 'Passenger', avatar: '🧳' },
      { id: 's2', name: 'Agent', avatar: '👔' }
    ],
    lines: [
      { speakerId: 's1', text: 'Hello, I\'d like to check in for my flight to London.' },
      { speakerId: 's2', text: 'May I see your passport and ticket, please?' },
      { speakerId: 's1', text: 'Here you go.' },
      { speakerId: 's2', text: 'Thank you. Would you prefer a window or aisle seat?' },
      { speakerId: 's1', text: 'Window seat, please.' },
      { speakerId: 's2', text: 'Alright. Here\'s your boarding pass. Your flight departs from Gate 12.' }
    ]
  },
  sentences: [
    {
      id: 'airport-s1',
      text: 'I\'d like to check in.',
      audioUrl: '/audio/airport/id-like-to-check-in.mp3',
      context: 'Starting the check-in process at the airport',
      phrases: [
        {
          id: 'airport-p1',
          text: 'I\'d like to check in',
          meaning: 'Expressing desire to register for a flight',
          usage: 'Say this to the airline agent when you arrive',
          example: 'Good morning. I\'d like to check in for flight BA284.',
          words: [
            { id: 'airport-w1', word: 'would', phonetic: '/wʊd/', meaning: 'used to make a polite request', image: '🙏', audioUrl: '/audio/words/would.mp3' },
            { id: 'airport-w2', word: 'like', phonetic: '/laɪk/', meaning: 'to want', image: '👍', audioUrl: '/audio/words/like.mp3' },
            { id: 'airport-w3', word: 'check', phonetic: '/tʃek/', meaning: 'to verify or register', image: '✓', audioUrl: '/audio/words/check.mp3' },
            { id: 'airport-w4', word: 'in', phonetic: '/ɪn/', meaning: 'indicating entry', image: '🚪', audioUrl: '/audio/words/in.mp3' }
          ]
        }
      ]
    },
    {
      id: 'airport-s2',
      text: 'Window or aisle seat?',
      audioUrl: '/audio/airport/window-or-aisle.mp3',
      context: 'Airline agent asking seat preference',
      phrases: [
        {
          id: 'airport-p2',
          text: 'Window or aisle seat',
          meaning: 'Asking which type of seat the passenger prefers',
          usage: 'Common question during airline check-in',
          example: 'Would you like a window or aisle seat?',
          words: [
            { id: 'airport-w5', word: 'window', phonetic: '/ˈwɪndoʊ/', meaning: 'an opening in the wall', image: '🪟', audioUrl: '/audio/words/window.mp3' },
            { id: 'airport-w6', word: 'aisle', phonetic: '/aɪl/', meaning: 'passage between rows of seats', image: '🚶', audioUrl: '/audio/words/aisle.mp3' },
            { id: 'airport-w7', word: 'seat', phonetic: '/siːt/', meaning: 'place to sit', image: '💺', audioUrl: '/audio/words/seat.mp3' }
          ]
        }
      ]
    }
  ]
};
