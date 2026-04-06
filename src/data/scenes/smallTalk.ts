import type { Scene } from '../../types';

export const smallTalkScene: Scene = {
  id: 'small-talk',
  category: 'social',
  title: 'Small Talk',
  coverImage: '💬',
  description: 'Learn casual conversation starters about work and daily life.',
  coreSentence: 'What do you do?',
  dialogue: {
    id: 'smalltalk-dialogue',
    context: 'Two acquaintances chatting at a coffee shop',
    speakers: [
      { id: 's1', name: 'Emma', avatar: '👩‍💼' },
      { id: 's2', name: 'James', avatar: '👨‍💻' }
    ],
    lines: [
      { speakerId: 's1', text: 'So, what do you do?' },
      { speakerId: 's2', text: 'I\'m a software engineer at a tech company.' },
      { speakerId: 's1', text: 'That sounds interesting! What kind of projects do you work on?' },
      { speakerId: 's2', text: 'I mainly build mobile apps. How long have you worked at your company?' },
      { speakerId: 's1', text: 'I\'ve been there for about three years now.' }
    ]
  },
  sentences: [
    {
      id: 'smalltalk-s1',
      text: 'What do you do?',
      audioUrl: '/audio/smalltalk/what-do-you-do.mp3',
      context: 'Asking about someone\'s profession or occupation',
      phrases: [
        {
          id: 'smalltalk-p1',
          text: 'What do you do',
          meaning: 'Asking about someone\'s job or profession',
          usage: 'Common conversation starter in social situations',
          example: 'Nice to meet you. What do you do for a living?',
          words: [
            { id: 'smalltalk-w1', word: 'what', phonetic: '/wʌt/', meaning: 'asking for information', image: '❓', audioUrl: '/audio/words/what.mp3' },
            { id: 'smalltalk-w2', word: 'do', phonetic: '/duː/', meaning: 'to perform an action', image: '✅', audioUrl: '/audio/words/do.mp3' },
            { id: 'smalltalk-w3', word: 'you', phonetic: '/juː/', meaning: 'the person being spoken to', image: '👤', audioUrl: '/audio/words/you.mp3' }
          ]
        }
      ]
    },
    {
      id: 'smalltalk-s2',
      text: 'How long have you worked there?',
      audioUrl: '/audio/smalltalk/how-long-have-you-worked.mp3',
      context: 'Asking about duration of employment',
      phrases: [
        {
          id: 'smalltalk-p2',
          text: 'How long have you worked',
          meaning: 'Asking about the duration of someone\'s employment',
          usage: 'Use after learning where someone works',
          example: 'That\'s a great company. How long have you worked there?',
          words: [
            { id: 'smalltalk-w4', word: 'how', phonetic: '/haʊ/', meaning: 'to what extent or degree', image: '📏', audioUrl: '/audio/words/how.mp3' },
            { id: 'smalltalk-w5', word: 'long', phonetic: '/lɔːŋ/', meaning: 'lasting for a great amount of time', image: '📅', audioUrl: '/audio/words/long.mp3' },
            { id: 'smalltalk-w6', word: 'worked', phonetic: '/wɜːrkt/', meaning: 'performed labor or duties', image: '💼', audioUrl: '/audio/words/worked.mp3' },
            { id: 'smalltalk-w7', word: 'there', phonetic: '/ðer/', meaning: 'in or at that place', image: '📍', audioUrl: '/audio/words/there.mp3' }
          ]
        }
      ]
    }
  ]
};
