import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function PrivacyNotice() {
  const { darkMode } = useTheme();
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('privacyNoticeDismissed') === 'true';
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    sessionStorage.setItem('privacyNoticeDismissed', 'true');
    setDismissed(true);
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 px-4 py-3 text-sm rounded-lg border transition-colors duration-300 ${
        darkMode
          ? 'bg-blue-900/30 border-blue-700/50 text-blue-300'
          : 'bg-blue-50 border-blue-200 text-blue-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <span>🔒</span>
        <span>
          <strong>Session Storage Active:</strong> Cart data is stored only for this browser session and will be cleared when you close the tab or browser.
        </span>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss privacy notice"
        className={`flex-shrink-0 hover:opacity-70 transition-opacity ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
