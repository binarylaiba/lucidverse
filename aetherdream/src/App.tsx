import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/LandingPage';
import WeavePage from '@/pages/WeavePage';
import StreamPage from '@/pages/StreamPage';
import CodexPage from '@/pages/CodexPage';
import ShiftPage from '@/pages/ShiftPage';
import DreamDetailsPage from '@/pages/DreamDetailsPage';
import MyDreamsPage from '@/pages/MyDreamsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="weave" element={<WeavePage />} />
          <Route path="stream" element={<StreamPage />} />
          <Route path="codex" element={<CodexPage />} />
          <Route path="shift" element={<ShiftPage />} />
          <Route path="dream/:id" element={<DreamDetailsPage />} />
          <Route path="my-dreams" element={<MyDreamsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
