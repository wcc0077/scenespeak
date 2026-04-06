import type { Scene } from '../../types';

export const takingTaxiScene: Scene = {
  id: 'taking-taxi',
  category: 'travel',
  title: 'Taking a Taxi',
  coverImage: '🚕',
  description: 'Learn how to communicate with taxi drivers when traveling.',
  coreSentence: 'Can you take me to...?',
  dialogue: {
    id: 'taxi-dialogue',
    context: 'Passenger getting into a taxi',
    speakers: [
      { id: 's1', name: 'Passenger', avatar: '🙋' },
      { id: 's2', name: 'Driver', avatar: '👨‍✈️' }
    ],
    lines: [
      { speakerId: 's1', text: 'Hello, can you take me to the airport, please?' },
      { speakerId: 's2', text: 'Sure thing. Which terminal?' },
      { speakerId: 's1', text: 'Terminal 3, international departures.' },
      { speakerId: 's2', text: 'Got it. How long will it take to get there?' },
      { speakerId: 's1', text: 'About 30 minutes, depending on traffic.' },
      { speakerId: 's2', text: 'Alright, we\'re here. That\'ll be $45.' },
      { speakerId: 's1', text: 'Here\'s $50. Keep the change.' }
    ]
  },
  sentences: [
    {
      id: 'taxi-s1',
      text: 'Can you take me to...?',
      audioUrl: '/audio/taxi/can-you-take-me-to.mp3',
      context: 'Requesting transportation to a destination',
      phrases: [
        {
          id: 'taxi-p1',
          text: 'Can you take me to',
          meaning: 'Requesting a ride to a specific location',
          usage: 'Use when telling the driver your destination',
          example: 'Can you take me to the train station, please?',
          words: [
            { id: 'taxi-w1', word: 'can', phonetic: '/kæn/', meaning: 'ability or possibility', image: '✅', audioUrl: '/audio/words/can.mp3' },
            { id: 'taxi-w2', word: 'take', phonetic: '/teɪk/', meaning: 'to transport or carry', image: '🚗', audioUrl: '/audio/words/take.mp3' },
            { id: 'taxi-w3', word: 'me', phonetic: '/miː/', meaning: 'referring to myself', image: '🙋', audioUrl: '/audio/words/me.mp3' },
            { id: 'taxi-w4', word: 'to', phonetic: '/tuː/', meaning: 'indicating direction', image: '➡️', audioUrl: '/audio/words/to.mp3' }
          ]
        }
      ]
    },
    {
      id: 'taxi-s2',
      text: 'How long will it take?',
      audioUrl: '/audio/taxi/how-long-will-it-take.mp3',
      context: 'Asking about travel time',
      phrases: [
        {
          id: 'taxi-p2',
          text: 'How long will it take',
          meaning: 'Asking about the duration of a journey',
          usage: 'Use when you want to know travel time',
          example: 'How long will it take to get downtown?',
          words: [
            { id: 'taxi-w5', word: 'how', phonetic: '/haʊ/', meaning: 'to what extent', image: '❓', audioUrl: '/audio/words/how.mp3' },
            { id: 'taxi-w6', word: 'long', phonetic: '/lɔːŋ/', meaning: 'duration of time', image: '⏱️', audioUrl: '/audio/words/long.mp3' },
            { id: 'taxi-w7', word: 'will', phonetic: '/wɪl/', meaning: 'future tense marker', image: '🔮', audioUrl: '/audio/words/will.mp3' },
            { id: 'taxi-w8', word: 'it', phonetic: '/ɪt/', meaning: 'referring to the journey', image: '🚗', audioUrl: '/audio/words/it.mp3' },
            { id: 'taxi-w9', word: 'take', phonetic: '/teɪk/', meaning: 'to require time', image: '⏰', audioUrl: '/audio/words/take.mp3' }
          ]
        }
      ]
    }
  ]
};
