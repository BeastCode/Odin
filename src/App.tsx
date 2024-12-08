import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Workflow } from './pages/Workflow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workflow" element={<Workflow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
