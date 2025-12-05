import React, { useState } from 'react';
import { LabProblem } from '../types';
import CodeBlock from './CodeBlock';
import SimulationArea from './SimulationArea';
import { BookOpen, Code, PlayCircle, GitBranch, Youtube, Instagram, Facebook, MessageCircle, Moon, Sun, Monitor, TestTube, Lightbulb } from 'lucide-react';

interface LabBenchProps {
  problem: LabProblem;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LabBench: React.FC<LabBenchProps> = ({ problem, isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'algorithm' | 'code' | 'sim'>('problem');

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex justify-between items-start">
        <div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm mb-2">
            <span>Problem ID: {problem.id}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl">{problem.description}</p>
        </div>
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Tabs */}
      <div className="px-8 flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <TabButton 
          active={activeTab === 'problem'} 
          onClick={() => setActiveTab('problem')}
          icon={<BookOpen className="w-4 h-4" />}
          label="Problem"
        />
        <TabButton 
          active={activeTab === 'algorithm'} 
          onClick={() => setActiveTab('algorithm')}
          icon={<GitBranch className="w-4 h-4" />}
          label="Algorithm"
        />
        <TabButton 
          active={activeTab === 'code'} 
          onClick={() => setActiveTab('code')}
          icon={<Code className="w-4 h-4" />}
          label="C Code"
        />
        <TabButton 
          active={activeTab === 'sim'} 
          onClick={() => setActiveTab('sim')}
          icon={<PlayCircle className="w-4 h-4" />}
          label="Simulation"
          special
        />
      </div>

      {/* Content */}
      <div className="p-8 max-w-5xl flex-1">
        {activeTab === 'problem' && (
          <div className="space-y-8 animate-fade-in">
            {/* Deep Dive Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-950 rounded-lg shadow-sm text-blue-600 dark:text-blue-400">
                        <Lightbulb className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Deep Dive</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                            {problem.details.explanation}
                        </p>
                        {problem.details.formula && (
                            <div className="mt-4 p-3 bg-white dark:bg-slate-950 rounded border border-blue-100 dark:border-slate-700 inline-block">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Formula</span>
                                <code className="text-blue-700 dark:text-blue-300 font-mono text-sm">{problem.details.formula}</code>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-white">
                        <span className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">I/O</span>
                        Input Analysis
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{problem.details.inputAnalysis}</p>
                </div>
                 <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-slate-800 dark:text-white">
                        <span className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">LOGIC</span>
                        Logic Construction
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{problem.details.logicConstruction}</p>
                </div>
            </div>

            {/* Test Cases */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                    <TestTube className="w-4 h-4" />
                    Test Cases
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {problem.details.testCases.map((tc, idx) => (
                        <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Input</span>
                                <code className="bg-slate-100 dark:bg-slate-950 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 block w-fit">
                                    {tc.input}
                                </code>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Expected Output</span>
                                <code className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded border border-green-100 dark:border-green-900/30 block w-fit">
                                    {tc.output}
                                </code>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithm' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200">
                    Step-by-Step Procedure
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {problem.algorithm.map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center text-sm border border-slate-200 dark:border-slate-700">
                                    {idx + 1}
                                </div>
                                <div className="py-1 text-slate-700 dark:text-slate-300 leading-relaxed">{step}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="animate-fade-in space-y-4">
             <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-md text-sm mb-4 border border-blue-100 dark:border-blue-900/30">
                <strong>Note:</strong> This code is optimized for Turbo C++ compiler. Includes <code>conio.h</code> for <code>clrscr()</code> and <code>getch()</code>.
             </div>
             <CodeBlock code={problem.cCode} />
          </div>
        )}

        {activeTab === 'sim' && (
          <div className="animate-fade-in">
             <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Interactive Simulation</h3>
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> Runtime Env
                </span>
             </div>
             <SimulationArea problem={problem} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center mt-auto transition-colors">
        <div className="text-slate-700 dark:text-slate-300 font-semibold mb-2">
            Designed by Manthan Pandit &copy; Infini80 Tech
        </div>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-400 uppercase tracking-wider text-xs self-center">Follow Infini80 Tech</span>
            <span className="flex items-center gap-1">
                <Youtube className="w-4 h-4" /> YouTube
            </span>
            <span className="flex items-center gap-1">
                <Instagram className="w-4 h-4" /> Instagram
            </span>
            <span className="flex items-center gap-1">
                <Facebook className="w-4 h-4" /> Facebook
            </span>
             <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> Discord
            </span>
        </div>
      </footer>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, special }: any) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative
      ${active 
        ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border-t-2 border-t-blue-600 dark:border-t-blue-400' 
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      }
      ${special && active ? 'text-purple-600 dark:text-purple-400 border-t-purple-600 dark:border-t-purple-400' : ''}
    `}
  >
    {icon}
    {label}
  </button>
);

export default LabBench;