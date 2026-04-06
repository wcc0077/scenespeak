import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import { AudioPlayer } from '../components/AudioPlayer';
import { getSceneById } from '../data';

export function Dialogue() {
  const navigate = useNavigate();
  const { sceneId } = useParams<{ sceneId: string }>();
  const scene = sceneId ? getSceneById(sceneId) : undefined;

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

  const { dialogue } = scene;
  const speakerMap = new Map(dialogue.speakers.map(s => [s.id, s]));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/scenes')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">{scene.title}</h1>
            <p className="text-sm text-gray-500 line-clamp-1">{dialogue.context}</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <ProgressBar current={1} total={5} />
      </div>

      <main className="px-4 py-6">
        {/* Dialogue Context */}
        <div className="bg-primary-50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <MessageCircle size={20} className="text-primary-600 mt-0.5" />
            <p className="text-sm text-primary-800">{dialogue.context}</p>
          </div>
        </div>

        {/* Conversation Bubbles */}
        <div className="space-y-4">
          {dialogue.lines.map((line, index) => {
            const speaker = speakerMap.get(line.speakerId);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex gap-3 ${isEven ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {speaker?.avatar || '👤'}
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${isEven ? '' : 'text-right'}`}>
                    {speaker?.name || 'Unknown'}
                  </p>
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 ${isEven ? '' : 'text-right'}`}>
                  <div
                    className={`inline-block max-w-[85%] px-4 py-3 rounded-2xl ${
                      isEven
                        ? 'bg-white rounded-tl-none shadow-sm'
                        : 'bg-primary-500 text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{line.text}</p>
                  </div>
                  <div className={`mt-2 ${isEven ? '' : 'flex justify-end'}`}>
                    <AudioPlayer text={line.text} size="sm" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
        <button
          onClick={() => navigate(`/scenes/${scene.id}/sentences`)}
          className="w-full py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 active:scale-95 transition-all"
        >
          Start Learning Sentences
        </button>
      </div>
    </div>
  );
}
