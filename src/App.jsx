import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Overworld from './pages/Overworld';
import SimpleView from './pages/SimpleView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overworld />} />
        <Route path="/simple" element={<SimpleView />} />
      </Routes>
    </BrowserRouter>
  );
}
