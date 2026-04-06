import type { Scene } from '../../types';

export const greetingsScene: Scene = {
  id: 'greetings',
  category: 'social',
  title: 'Greetings',
  coverImage: '👋',
  description: 'Learn essential greeting phrases for meeting new people and starting conversations.',
  coreSentence: 'Nice to meet you.',
  dialogue: {
    id: 'greetings-dialogue',
    context: 'Two people meeting for the first time at a social event',
    speakers: [
      { id: 's1', name: 'Alice', avatar: '👩' },
      { id: 's2', name: 'Bob', avatar: '👨' }
    ],
    lines: [
      { speakerId: 's1', text: 'Hello! What\'s your name?' },
      { speakerId: 's2', text: 'I\'m Bob. Nice to meet you.' },
      { speakerId: 's1', text: 'Nice to meet you too. How are you doing?' },
      { speakerId: 's2', text: 'I\'m doing well, thanks. Where are you from?' },
      { speakerId: 's1', text: 'I\'m from New York. How about you?' }
    ]
  },
  sentences: [
    {
      id: 'greetings-s1',
      text: 'Nice to meet you.',
      audioUrl: '/audio/greetings/nice-to-meet-you.mp3',
      context: 'Used when meeting someone for the first time',
      phrases: [
        {
          id: 'greetings-p1',
          text: 'Nice to meet you',
          meaning: 'A polite expression used when greeting someone for the first time',
          usage: 'Use this when you are introduced to someone new',
          example: 'Hi, I\'m Sarah. Nice to meet you!',
          words: [
            { id: 'greetings-w1', word: 'nice', phonetic: '/naɪs/', meaning: 'pleasant, enjoyable', image: '😊', audioUrl: '/audio/words/nice.mp3' },
            { id: 'greetings-w2', word: 'meet', phonetic: '/miːt/', meaning: 'to come into contact with someone for the first time', image: '🤝', audioUrl: '/audio/words/meet.mp3' },
            { id: 'greetings-w3', word: 'you', phonetic: '/juː/', meaning: 'the person being spoken to', image: '👤', audioUrl: '/audio/words/you.mp3' }
          ]
        }
      ]
    },
    {
      id: 'greetings-s2',
      text: 'How are you doing?',
      audioUrl: '/audio/greetings/how-are-you-doing.mp3',
      context: 'A friendly way to ask about someone\'s well-being',
      phrases: [
        {
          id: 'greetings-p2',
          text: 'How are you doing',
          meaning: 'An informal greeting asking about someone\'s current state',
          usage: 'Use with friends or in casual situations',
          example: 'Hey! How are you doing today?',
          words: [
            { id: 'greetings-w4', word: 'how', phonetic: '/haʊ/', meaning: 'in what way or manner', image: '❓', audioUrl: '/audio/words/how.mp3' },
            { id: 'greetings-w5', word: 'are', phonetic: '/ɑːr/', meaning: 'second person singular of "be"', image: '🟰', audioUrl: '/audio/words/are.mp3' },
            { id: 'greetings-w6', word: 'doing', phonetic: '/ˈduːɪŋ/', meaning: 'performing an action or activity', image: '🏃', audioUrl: '/audio/words/doing.mp3' }
          ]
        }
      ]
    },
    {
      id: 'greetings-s3',
      text: 'Where are you from?',
      audioUrl: '/audio/greetings/where-are-you-from.mp3',
      context: 'Asking about someone\'s origin or hometown',
      phrases: [
        {
          id: 'greetings-p3',
          text: 'Where are you from',
          meaning: 'Asking about someone\'s place of origin',
          usage: 'Use when you want to know where someone lives or grew up',
          example: 'You have an interesting accent. Where are you from?',
          words: [
            { id: 'greetings-w7', word: 'where', phonetic: '/wer/', meaning: 'in or to what place', image: '📍', audioUrl: '/audio/words/where.mp3' },
            { id: 'greetings-w8', word: 'from', phonetic: '/frʌm/', meaning: 'indicating the point in space where something starts', image: '🏠', audioUrl: '/audio/words/from.mp3' }
          ]
        }
      ]
    }
  ]
};
