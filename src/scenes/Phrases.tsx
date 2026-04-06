import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, RotateCw, BookOpen, Sparkles, Quote } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { Recorder } from '../components/Recorder';
import { getSceneById } from '../data';

export function Phrases() {
  const navigate = useNavigate();
  const { sceneId } = useParams<{ sceneId: string }>();
  const scene = sceneId ? getSceneById(sceneId) : undefined;

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
  const currentSentence = sentences[currentSentenceIndex];
  const phrases = currentSentence.phrases;
  const currentPhrase = phrases[currentPhraseIndex];

  const isLastSentence = currentSentenceIndex === sentences.length - 1;
  const isLastPhrase = currentPhraseIndex === phrases.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (isLastPhrase && isLastSentence) {
      navigate(`/scenes/${scene.id}/vocabulary`);
    } else if (isLastPhrase) {
      setCurrentSentenceIndex(prev => prev + 1);
      setCurrentPhraseIndex(0);
      setIsFlipped(false);
    } else {
      setCurrentPhraseIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  // Calculate total phrases and current position
  let totalPhrasesBefore = 0;
  for (let i = 0; i < currentSentenceIndex; i++) {
    totalPhrasesBefore += sentences[i].phrases.length;
  }
  const currentPhraseNumber = totalPhrasesBefore + currentPhraseIndex + 1;
  const totalPhraseCount = sentences.reduce((sum, s) => sum + s.phrases.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/scenes/${scene.id}/sentences`)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Learn Phrases</h1>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <ProgressBar current={3} total={5} />
      </div>

      <main className="px-4 py-6">
        {/* Phrase Counter */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Phrase {currentPhraseNumber} of {totalPhraseCount}
          </span>
          <button
            onClick={handleFlip}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <RotateCw size={16} />
            Flip Card
          </button>
        </div>

        {/* Flip Card */}
        <div
          className="relative h-80 mb-6 cursor-pointer"
          onClick={handleFlip}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {currentPhrase.text}
              </h2>
              <p className="text-sm text-gray-500">Tap to reveal meaning</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-primary-500 rounded-2xl shadow-sm p-6 flex flex-col justify-center text-white"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <h3 className="text-xl font-bold mb-3">{currentPhrase.text}</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-primary-200" />
                    <span className="text-sm font-medium text-primary-100">Meaning</span>
                  </div>
                  <p className="text-white">{currentPhrase.meaning}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen size={16} className="text-primary-200" />
                    <span className="text-sm font-medium text-primary-100">Usage</span>
                  </div>
                  <p className="text-white text-sm">{currentPhrase.usage}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Quote size={16} className="text-primary-200" />
                    <span className="text-sm font-medium text-primary-100">Example</span>
                  </div>
                  <p className="text-white text-sm italic">{currentPhrase.example}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Practice Speaking
          </h3>
          <Recorder referenceText={currentPhrase.text} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <button
          onClick={handleNext}
          className="w-full py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 active:scale-95 transition-all"
        >
          {isLastPhrase && isLastSentence ? 'Next Step' : 'Next Phrase'}
        </button>
      </div>
    </div>
  );
}
