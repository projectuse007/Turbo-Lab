import React, { useState } from 'react';
import { LabProblem, SimulationType } from '../types';
import PatternSimulator from './simulations/PatternSimulator';
import FormSimulator from './simulations/FormSimulator';
import TerminalSimulator from './simulations/TerminalSimulator';
import { RefreshCcw } from 'lucide-react';

interface SimulationAreaProps {
  problem: LabProblem;
}

const SimulationArea: React.FC<SimulationAreaProps> = ({ problem }) => {
  const [chartInput, setChartInput] = useState("85, 45, 66, 72, 90, 30, 55, 60, 40, 88");
  
  const renderChart = () => {
      const marks = chartInput.split(',').map(s => parseInt(s.trim()) || 0);
      const bins = { A: 0, B: 0, C: 0, D: 0, F: 0 };
      
      marks.forEach(m => {
          if (m >= 80) bins.A++;
          else if (m >= 60) bins.B++;
          else if (m >= 50) bins.C++;
          else if (m >= 40) bins.D++;
          else bins.F++;
      });
      
      const maxCount = Math.max(...Object.values(bins));

      return (
         <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 shadow-sm transition-colors">
             <div className="mb-6">
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Enter Marks (comma separated):</label>
                 <div className="flex gap-2">
                    <input 
                        className="flex-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded px-3 py-2 font-mono text-sm"
                        value={chartInput}
                        onChange={(e) => setChartInput(e.target.value)}
                    />
                    <button 
                        onClick={() => setChartInput("85, 45, 66, 72, 90, 30, 55, 60, 40, 88")} 
                        className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Reset"
                    >
                        <RefreshCcw className="w-4 h-4 text-slate-600 dark:text-slate-400"/>
                    </button>
                 </div>
             </div>

             <div className="space-y-4">
                 {[
                     { label: 'A (80-100)', count: bins.A, color: 'bg-green-500' },
                     { label: 'B (60-79)', count: bins.B, color: 'bg-blue-500' },
                     { label: 'C (50-59)', count: bins.C, color: 'bg-yellow-500' },
                     { label: 'D (40-49)', count: bins.D, color: 'bg-orange-500' },
                     { label: 'F (0-39)', count: bins.F, color: 'bg-red-500' },
                 ].map((g) => (
                     <div key={g.label} className="flex items-center gap-3">
                         <div className="w-20 font-bold text-slate-600 dark:text-slate-400 text-xs text-right uppercase">{g.label}</div>
                         <div className="flex-1 bg-slate-50 dark:bg-slate-800 h-8 rounded-full overflow-hidden relative border border-slate-100 dark:border-slate-700">
                             <div 
                                className={`h-full transition-all duration-1000 ease-out ${g.color} opacity-90`} 
                                style={{ width: `${maxCount > 0 ? (g.count / maxCount) * 100 : 0}%` }}
                             ></div>
                             {g.count > 0 && (
                                <span className="absolute left-2 top-1.5 text-xs text-white font-bold drop-shadow-md">
                                    {g.count}
                                </span>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
             
             <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-5 gap-2 text-center text-xs text-slate-400">
                 <div>Total: {marks.length}</div>
                 <div>Pass: {marks.length - bins.F}</div>
                 <div>Fail: {bins.F}</div>
             </div>
         </div>
      );
  };

  const renderContent = () => {
    switch (problem.simulationType) {
      case SimulationType.PATTERN:
        return <PatternSimulator problemId={problem.id} />;
      case SimulationType.INTERACTIVE_FORM:
        return <FormSimulator problemId={problem.id} />;
      case SimulationType.CONSOLE:
        return <TerminalSimulator problemId={problem.id} />;
      case SimulationType.CHART:
         return renderChart();
      default:
        return <div>Simulation not available</div>;
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
        {renderContent()}
    </div>
  );
};

export default SimulationArea;