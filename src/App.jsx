import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Overworld from './pages/Overworld';
import SimpleView from './pages/SimpleView';
import QuickView from './pages/QuickView';
import Preview from './pages/Preview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overworld />} />
        <Route path="/simple" element={<SimpleView />} />
        <Route path="/quick" element={<QuickView />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
