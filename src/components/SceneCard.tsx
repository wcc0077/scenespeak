import { Check } from 'lucide-react';
import type { Scene } from '../types';

interface SceneCardProps {
  scene: Scene;
  isCompleted?: boolean;
  onClick?: () => void;
}

export function SceneCard({ scene, isCompleted, onClick }: SceneCardProps) {
  return (
    <button onClick={onClick} className="relative w-full text-left bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
        <span className="text-4xl">{scene.coverImage}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{scene.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{scene.description}</p>
          </div>
          {isCompleted && (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
          )}
        </div>
        <div className="mt-3 text-xs text-primary-600 font-medium">"{scene.coreSentence}"</div>
      </div>
    </button>
  );
}
