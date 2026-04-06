import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { AudioPlayer } from '../components/AudioPlayer';
import { Recorder } from '../components/Recorder';
import { getSceneById } from '../data';

export function Vocabulary() {
  const navigate = useNavigate();
  const { sceneId } = useParams<{ sceneId: string }>();
  const scene = sceneId ? getSceneById(sceneId) : undefined;

  const [currentSentenceIndex, _setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

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
  void sentences[currentSentenceIndex];

  // Flatten all words from all phrases
  const allWords = sentences.flatMap(s =>
    s.phrases.flatMap(p => p.words)
  );
  const currentWord = allWords[currentWordIndex];

  const isLastWord = currentWordIndex === allWords.length - 1;

  const handleNext = () => {
    if (isLastWord) {
      navigate(`/scenes/${scene.id}/complete`);
    } else {
      setCurrentWordIndex(prev => prev + 1);
    }
  };

  // Calculate total words and current position
  const currentWordNumber = currentWordIndex + 1;
  const totalWordCount = allWords.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/scenes/${scene.id}/phrases`)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Word Practice</h1>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <ProgressBar current={4} total={5} />
      </div>

      <main className="px-4 py-6">
        {/* Word Counter */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Word {currentWordNumber} of {totalWordCount}
          </span>
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          {/* Word Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-6xl">
              {currentWord.image}
            </div>
          </div>

          {/* Word Info */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentWord.word}
            </h2>
            <p className="text-lg text-primary-600 font-medium mb-1">
              {currentWord.phonetic}
            </p>
            <p className="text-gray-600">{currentWord.meaning}</p>
          </div>

          {/* Audio Player */}
          <div className="flex justify-center gap-3">
            <AudioPlayer text={currentWord.word} size="lg" />
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Practice Speaking
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Hold the button and say the word
          </p>
          <Recorder referenceText={currentWord.word} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentWordIndex(prev => Math.max(0, prev - 1))}
            disabled={currentWordIndex === 0}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 active:scale-95 transition-all"
          >
            {isLastWord ? 'Complete Scene' : 'Next Word'}
          </button>
        </div>
      </div>
    </div>
  );
}
