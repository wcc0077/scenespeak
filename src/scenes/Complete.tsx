import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, Clock, Zap, BookCheck, ChevronRight, RotateCcw } from 'lucide-react';
import { SceneCard } from '../components/SceneCard';
import { Navigation } from '../components/Navigation';
import { useProgressStore } from '../store/progressStore';
import { scenes, getSceneById } from '../data';

export function Complete() {
  const navigate = useNavigate();
  const { sceneId } = useParams<{ sceneId: string }>();
  const scene = sceneId ? getSceneById(sceneId) : undefined;
  const { completeScene, completedScenes, stats, updateStudyTime, checkAndUpdateStreak } = useProgressStore();

  useEffect(() => {
    // Mark scene as completed
    if (sceneId) {
      completeScene(sceneId);
    }
    // Update streak and study time
    checkAndUpdateStreak();
    updateStudyTime(5); // Assume 5 minutes for now
  }, []);

  // Get next recommended scene
  const nextScene = scenes.find(s => !completedScenes.includes(s.id) && s.id !== sceneId);

  // Calculate stats
  const completedCount = completedScenes.length;
  const totalScenes = scenes.length;

  if (!scene) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl mb-3 block">😕</span>
          <p className="text-gray-600">Scene not found</p>
          <button
            onClick={() => navigate('/scenes')}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Back to Scenes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 text-center">Scene Complete!</h1>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Trophy Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg mb-4 animate-bounce">
            <Trophy size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Great Job!
          </h2>
          <p className="text-gray-600">
            You completed "{scene.title}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookCheck size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-xs text-gray-500">Scenes Completed</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap size={20} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.streakDays}</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalStudyTime}</p>
            <p className="text-xs text-gray-500">Minutes Studied</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <RotateCcw size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((completedCount / totalScenes) * 100)}%
            </p>
            <p className="text-xs text-gray-500">Progress</p>
          </div>
        </div>

        {/* Next Recommended Scene */}
        {nextScene && (
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Up</h3>
            <SceneCard
              scene={nextScene}
              isCompleted={completedScenes.includes(nextScene.id)}
              onClick={() => navigate(`/scenes/${nextScene.id}/dialogue`)}
            />
          </section>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/scenes/${scene.id}/dialogue`)}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Review
          </button>
          <button
            onClick={() => navigate('/scenes')}
            className="flex-1 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
          >
            More Scenes
            <ChevronRight size={18} />
          </button>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
