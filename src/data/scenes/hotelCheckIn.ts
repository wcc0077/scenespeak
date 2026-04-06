import type { Scene } from '../../types';

export const hotelCheckInScene: Scene = {
  id: 'hotel-checkin',
  category: 'travel',
  title: 'Hotel Check-in',
  coverImage: '🏨',
  description: 'Learn phrases for checking into a hotel and handling reservations.',
  coreSentence: 'I have a reservation.',
  dialogue: {
    id: 'hotel-dialogue',
    context: 'Guest arriving at hotel reception',
    speakers: [
      { id: 's1', name: 'Guest', avatar: '🧳' },
      { id: 's2', name: 'Receptionist', avatar: '💁' }
    ],
    lines: [
      { speakerId: 's1', text: 'Hello, I have a reservation.' },
      { speakerId: 's2', text: 'Welcome! Under what name is the reservation?' },
      { speakerId: 's1', text: 'It\'s under Johnson.' },
      { speakerId: 's2', text: 'Yes, I found it. You\'re staying for two nights, checking out on Thursday?' },
      { speakerId: 's1', text: 'Yes, that\'s right.' },
      { speakerId: 's2', text: 'Perfect. Breakfast is included, served from 7 to 10 AM.' }
    ]
  },
  sentences: [
    {
      id: 'hotel-s1',
      text: 'I have a reservation.',
      audioUrl: '/audio/hotel/i-have-a-reservation.mp3',
      context: 'Informing the hotel that you booked a room',
      phrases: [
        {
          id: 'hotel-p1',
          text: 'I have a reservation',
          meaning: 'Stating that you previously booked accommodation',
          usage: 'Say this when you arrive at the hotel reception',
          example: 'Good evening. I have a reservation for tonight.',
          words: [
            { id: 'hotel-w1', word: 'have', phonetic: '/hæv/', meaning: 'to possess', image: '✋', audioUrl: '/audio/words/have.mp3' },
            { id: 'hotel-w2', word: 'reservation', phonetic: '/ˌrezərˈveɪʃn/', meaning: 'a booking made in advance', image: '📋', audioUrl: '/audio/words/reservation.mp3' }
          ]
        }
      ]
    },
    {
      id: 'hotel-s2',
      text: 'Checking out tomorrow.',
      audioUrl: '/audio/hotel/checking-out-tomorrow.mp3',
      context: 'Confirming departure date',
      phrases: [
        {
          id: 'hotel-p2',
          text: 'Checking out tomorrow',
          meaning: 'Leaving the hotel the next day',
          usage: 'Use when confirming your departure date',
          example: 'Yes, I\'m checking out tomorrow morning.',
          words: [
            { id: 'hotel-w3', word: 'checking', phonetic: '/ˈtʃekɪŋ/', meaning: 'the process of leaving', image: '🚪', audioUrl: '/audio/words/checking.mp3' },
            { id: 'hotel-w4', word: 'out', phonetic: '/aʊt/', meaning: 'indicating exit', image: '➡️', audioUrl: '/audio/words/out.mp3' },
            { id: 'hotel-w5', word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', meaning: 'the day after today', image: '📅', audioUrl: '/audio/words/tomorrow.mp3' }
          ]
        }
      ]
    }
  ]
};
