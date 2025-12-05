import React from 'react';
import { LAB_DATA } from '../constants';
import { LabProblem } from '../types';
import { Code2, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentProblemId: string;
  onSelectProblem: (problem: LabProblem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentProblemId, onSelectProblem }) => {
  return (
    <div className="w-64 bg-slate-900 text-slate-100 h-screen overflow-y-auto border-r border-slate-700 flex flex-col shrink-0 transition-colors duration-300">
      <div className="p-4 border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
        <h1 className="text-xl font-bold flex items-center gap-2 text-yellow-400">
          <Code2 className="w-6 h-6" />
          TurboLab
        </h1>
        <p className="text-xs text-slate-400 mt-1">Problem Solving Manual</p>
      </div>
      
      <div className="flex-1 py-4">
        {LAB_DATA.map((unit) => (
          <div key={unit.id} className="mb-6">
            <h2 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {unit.title}
            </h2>
            <ul>
              {unit.problems.map((problem) => (
                <li key={problem.id}>
                  <button
                    onClick={() => onSelectProblem(problem)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between group ${
                      currentProblemId === problem.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{problem.title}</span>
                    {currentProblemId === problem.id && (
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 bg-slate-950">
        Compatible with Turbo C++
      </div>
    </div>
  );
};

export default Sidebar;