import { greetingsScene } from './scenes/greetings';
import { smallTalkScene } from './scenes/smallTalk';
import { makingPlansScene } from './scenes/makingPlans';
import { airportCheckInScene } from './scenes/airportCheckIn';
import { hotelCheckInScene } from './scenes/hotelCheckIn';
import { takingTaxiScene } from './scenes/takingTaxi';
import type { Scene } from '../types';

export const scenes: Scene[] = [
  greetingsScene,
  smallTalkScene,
  makingPlansScene,
  airportCheckInScene,
  hotelCheckInScene,
  takingTaxiScene
];

export function getSceneById(id: string): Scene | undefined {
  return scenes.find(scene => scene.id === id);
}

export function getScenesByCategory(category: 'social' | 'travel'): Scene[] {
  return scenes.filter(scene => scene.category === category);
}
