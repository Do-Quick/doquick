import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ToolDetailPage from './pages/ToolDetailPage';

/**
 * App.jsx - Dedicated Strictly to Routing & Global Application Frame
 * Do-Quick (doquick.in)
 */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-purple-500 selection:text-white">
          
          {/* Header with doquick logo from assets/logo.png & global search redirect */}
          <Header />

          {/* Main View Router */}
          <main className="flex-1">
            <Routes>
              {/* Home Page: Motto of Do-Quick & Featured quickQr Showcase */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated Tools Directory Page */}
              <Route path="/tools" element={<ToolsPage />} />

              {/* Dedicated Tool Detail & Documentation Page (e.g. /tool/quickqr) */}
              <Route path="/tool/:toolId" element={<ToolDetailPage />} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Clean, Neat Footer with legal, open-source info, and AdSense compliance */}
          <Footer />

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
