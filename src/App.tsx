import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, SceneSelect, Dialogue, Sentences, Phrases, Vocabulary, Complete, Stats } from './scenes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenes" element={<SceneSelect />} />
        <Route path="/scenes/:sceneId/dialogue" element={<Dialogue />} />
        <Route path="/scenes/:sceneId/sentences" element={<Sentences />} />
        <Route path="/scenes/:sceneId/phrases" element={<Phrases />} />
        <Route path="/scenes/:sceneId/vocabulary" element={<Vocabulary />} />
        <Route path="/scenes/:sceneId/complete" element={<Complete />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
