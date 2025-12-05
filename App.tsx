import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LabBench from './components/LabBench';
import { LAB_DATA } from './constants';
import { LabProblem } from './types';

const App: React.FC = () => {
  // Default to first problem of first unit
  const [currentProblem, setCurrentProblem] = useState<LabProblem>(LAB_DATA[0].problems[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-300`}>
      <Sidebar 
        currentProblemId={currentProblem.id}
        onSelectProblem={setCurrentProblem}
      />
      <LabBench 
        problem={currentProblem} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;