import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { AudioPlayer } from '../components/AudioPlayer';
import { Recorder } from '../components/Recorder';
import { getSceneById } from '../data';
import { useProgressStore } from '../store/progressStore';

export function Sentences() {
  const navigate = useNavigate();
  const { sceneId } = useParams<{ sceneId: string }>();
  const scene = sceneId ? getSceneById(sceneId) : undefined;
  const { recordSentenceAttempt } = useProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const sentences = scene.sentences;
  const currentSentence = sentences[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sentences.length - 1;

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      navigate(`/scenes/${scene.id}/phrases`);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRecordingComplete = () => {
    recordSentenceAttempt(currentSentence.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/scenes/${scene.id}/dialogue`)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Learn Sentences</h1>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <ProgressBar current={2} total={5} />
      </div>

      <main className="px-4 py-6">
        {/* Sentence Counter */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Sentence {currentIndex + 1} of {sentences.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={isFirst}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Sentence Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">💬</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {currentSentence.text}
              </h2>
            </div>
          </div>

          {/* Context */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{currentSentence.context}</p>
            </div>
          </div>

          {/* Audio Player */}
          <div className="flex items-center gap-3">
            <AudioPlayer text={currentSentence.text} size="md" />
            <span className="text-sm text-gray-500">Listen to pronunciation</span>
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Practice Speaking
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Hold the button and repeat the sentence
          </p>
          <Recorder
            referenceText={currentSentence.text}
            onRecordingComplete={handleRecordingComplete}
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={isFirst}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 active:scale-95 transition-all"
          >
            {isLast ? 'Next Step' : 'Next Sentence'}
          </button>
        </div>
      </div>
    </div>
  );
}
