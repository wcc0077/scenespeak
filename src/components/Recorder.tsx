import { useState } from 'react';
import { Mic, Play, RotateCcw } from 'lucide-react';
import { useRecorder } from '../hooks/useRecorder';

interface RecorderProps {
  referenceText: string;
  onRecordingComplete?: () => void;
}

export function Recorder({ referenceText: _referenceText, onRecordingComplete }: RecorderProps) {
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording } = useRecorder();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleMouseDown = () => { clearRecording(); startRecording(); };
  const handleMouseUp = () => { stopRecording(); if (onRecordingComplete) onRecordingComplete(); };
  const handlePlayRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-600 mb-2">{isRecording ? 'Recording...' : 'Hold to record'}</div>
      <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 scale-110' : 'bg-primary-500 hover:bg-primary-600'} text-white`}>
        <Mic size={32} />
      </button>
      {audioUrl && !isRecording && (
        <div className="flex gap-3">
          <button onClick={handlePlayRecording} disabled={isPlaying} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50">
            <Play size={16} /> {isPlaying ? 'Playing...' : 'Play'}
          </button>
          <button onClick={() => clearRecording()} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            <RotateCcw size={16} /> Retry
          </button>
        </div>
      )}
    </div>
  );
}
