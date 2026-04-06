import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookCheck, Zap, Clock, Target } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useProgressStore } from '../store/progressStore';
import { scenes } from '../data';

export function Stats() {
  const navigate = useNavigate();
  const { completedScenes, stats, sentenceProgress } = useProgressStore();

  // Calculate statistics
  const totalScenes = scenes.length;
  const completedCount = completedScenes.length;
  const progressPercentage = Math.round((completedCount / totalScenes) * 100);
  const recordedSentences = Object.keys(sentenceProgress).length;

  // Format study time
  const hours = Math.floor(stats.totalStudyTime / 60);
  const minutes = stats.totalStudyTime % 60;
  const studyTimeDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Statistics</h1>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Scenes Completed */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <BookCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                <p className="text-xs text-gray-500">Scenes Completed</p>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.streakDays}</p>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
            </div>
          </div>

          {/* Study Time */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{studyTimeDisplay}</p>
                <p className="text-xs text-gray-500">Study Time</p>
              </div>
            </div>
          </div>

          {/* Sentences Practiced */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Target size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{recordedSentences}</p>
                <p className="text-xs text-gray-500">Sentences Practiced</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercentage * 1.76} 176`}
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                {progressPercentage}%
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Keep it up!</p>
              <p className="text-sm text-gray-500">
                {completedCount} of {totalScenes} scenes completed
              </p>
            </div>
          </div>
        </section>

        {/* Scene Progress List */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Scene Progress</h2>
          <div className="space-y-2">
            {scenes.map((scene) => {
              const isCompleted = completedScenes.includes(scene.id);
              return (
                <div
                  key={scene.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{scene.coverImage}</span>
                    <div>
                      <p className="font-medium text-gray-900">{scene.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{scene.category}</p>
                    </div>
                  </div>
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <BookCheck size={18} />
                      <span className="text-sm font-medium">Done</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      <span className="text-sm">Pending</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
