import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { SceneCard } from '../components/SceneCard';
import { Navigation } from '../components/Navigation';
import { useProgressStore } from '../store/progressStore';
import { scenes, getScenesByCategory } from '../data';
import type { Scene } from '../types';

export function SceneSelect() {
  const navigate = useNavigate();
  const { completedScenes } = useProgressStore();
  const [activeCategory, setActiveCategory] = useState<'social' | 'travel'>('social');

  const filteredScenes = getScenesByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Select a Scene</h1>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('social')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeCategory === 'social'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Social
          </button>
          <button
            onClick={() => setActiveCategory('travel')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeCategory === 'travel'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Travel
          </button>
        </div>

        {/* Scene Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredScenes.map((scene) => (
            <SceneCard
              key={scene.id}
              scene={scene}
              isCompleted={completedScenes.includes(scene.id)}
              onClick={() => navigate(`/scenes/${scene.id}/dialogue`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredScenes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-3 block">📭</span>
            <p className="text-gray-500">No scenes available in this category</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}
