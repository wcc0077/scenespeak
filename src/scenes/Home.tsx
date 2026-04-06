import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, ChevronRight } from 'lucide-react';
import { SceneCard } from '../components/SceneCard';
import { Navigation } from '../components/Navigation';
import { useProgressStore } from '../store/progressStore';
import { scenes } from '../data';

export function Home() {
  const navigate = useNavigate();
  const { completedScenes, stats } = useProgressStore();

  const totalScenes = scenes.length;
  const completedCount = completedScenes.length;
  const progressPercentage = Math.round((completedCount / totalScenes) * 100);

  // Get first uncompleted scene as recommended, or first scene if all completed
  const recommendedScene = scenes.find(scene => !completedScenes.includes(scene.id)) || scenes[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎭</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SceneSpeak</h1>
        </div>
        <p className="text-gray-600 text-sm">Practice real-world English conversations</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Today's Progress */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercentage * 2.26} 226`}
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
                {progressPercentage}%
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCount}/{totalScenes}</p>
              <p className="text-sm text-gray-500">Scenes completed</p>
              {stats.streakDays > 0 && (
                <p className="text-sm text-primary-600 mt-1">{stats.streakDays} day streak!</p>
              )}
            </div>
          </div>
        </section>

        {/* Recommended Scene */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommended for You</h2>
          <SceneCard
            scene={recommendedScene}
            isCompleted={completedScenes.includes(recommendedScene.id)}
            onClick={() => navigate(`/scenes/${recommendedScene.id}/dialogue`)}
          />
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/scenes')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <BookOpen size={24} className="text-primary-600" />
            </div>
            <span className="font-medium text-gray-900">Browse Scenes</span>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/stats')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BarChart3 size={24} className="text-green-600" />
            </div>
            <span className="font-medium text-gray-900">Statistics</span>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
