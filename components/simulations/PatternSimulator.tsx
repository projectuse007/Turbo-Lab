import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface PatternSimulatorProps {
  problemId: string;
}

const PatternSimulator: React.FC<PatternSimulatorProps> = ({ problemId }) => {
  const [rows, setRows] = useState(5);
  const [output, setOutput] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const generateSteps = () => {
    const steps: string[] = [];
    
    // Logic branching based on sub-problem ID
    switch(problemId) {
        case 'u2-p6a': // Increasing Stars
            for (let i = 1; i <= rows; i++) {
                let line = "";
                for (let j = 1; j <= i; j++) line += "* ";
                steps.push(line);
            }
            break;
        case 'u2-p6b': // Decreasing Stars
            for (let i = rows; i >= 1; i--) {
                let line = "";
                for (let j = 1; j <= i; j++) line += "* ";
                steps.push(line);
            }
            break;
        case 'u2-p6c': // Decreasing Numbers
            for (let i = rows; i >= 1; i--) {
                let line = "";
                for (let j = 1; j <= i; j++) line += `${j} `;
                steps.push(line);
            }
            break;
        case 'u2-p6d': // Increasing Numbers
            for (let i = 1; i <= rows; i++) {
                let line = "";
                for (let j = 1; j <= i; j++) line += `${j} `;
                steps.push(line);
            }
            break;
        case 'u2-p7a': // Hollow Square
            for (let i = 1; i <= rows; i++) {
                let line = "";
                for (let j = 1; j <= rows; j++) {
                    if (i === 1 || i === rows || j === 1 || j === rows) line += "# ";
                    else line += "\u00A0\u00A0"; // Double space
                }
                steps.push(line);
            }
            break;
        case 'u2-p7b': // Number Pyramid
            for (let i = 1; i <= rows; i++) {
                let line = "";
                // Spaces
                for (let s = 1; s <= rows - i; s++) line += "\u00A0\u00A0";
                // Up
                for (let j = 1; j <= i; j++) line += `${j} `;
                // Down
                for (let j = i - 1; j >= 1; j--) line += `${j} `;
                steps.push(line);
            }
            break;
        case 'u2-p7c': // Square Diagonals
            for (let i = 1; i <= rows; i++) {
                let line = "";
                for (let j = 1; j <= rows; j++) {
                    if (i === 1 || i === rows || j === 1 || j === rows || i === j || j === (rows - i + 1)) line += "* ";
                    else line += "\u00A0\u00A0";
                }
                steps.push(line);
            }
            break;
        case 'u2-p7d': // Diamond
            // Upper
            for (let i = 1; i <= rows; i++) {
                let line = "";
                for (let s = 1; s <= rows - i; s++) line += "\u00A0\u00A0";
                for (let j = 1; j <= 2 * i - 1; j++) line += "* ";
                steps.push(line);
            }
            // Lower
            for (let i = rows - 1; i >= 1; i--) {
                let line = "";
                for (let s = 1; s <= rows - i; s++) line += "\u00A0\u00A0";
                for (let j = 1; j <= 2 * i - 1; j++) line += "* ";
                steps.push(line);
            }
            break;
        default:
            steps.push("Pattern type not found.");
    }
    return steps;
  };

  const handleRun = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setOutput([]);
  };

  useEffect(() => {
    if (isAnimating) {
      const steps = generateSteps();
      if (currentStep < steps.length) {
        const timer = setTimeout(() => {
          setOutput(prev => [...prev, steps[currentStep]]);
          setCurrentStep(prev => prev + 1);
        }, 300); // Faster speed for complex patterns
        return () => clearTimeout(timer);
      } else {
        setIsAnimating(false);
      }
    }
  }, [isAnimating, currentStep, rows, problemId]);

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex gap-4 mb-4 items-end">
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size (N)</label>
            <input 
                type="number" 
                min="3" 
                max="15" 
                value={rows} 
                onChange={(e) => setRows(parseInt(e.target.value))}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded text-sm w-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                disabled={isAnimating}
            />
        </div>
        <button
            onClick={handleRun}
            disabled={isAnimating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
        >
            <Play className="w-4 h-4" />
            Simulate
        </button>
        <button
            onClick={() => { setOutput([]); setIsAnimating(false); setCurrentStep(0); }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
        >
            <RotateCcw className="w-4 h-4" />
            Clear
        </button>
      </div>

      <div className="bg-black p-6 rounded-lg font-mono text-green-400 min-h-[400px] shadow-inner text-lg leading-8 overflow-auto flex flex-col items-start border border-slate-800">
        {output.length === 0 && !isAnimating && <span className="opacity-50 text-sm">// Output will appear here...</span>}
        {output.map((line, idx) => (
            <div key={idx} className="whitespace-pre animate-fade-in">{line}</div>
        ))}
        {isAnimating && <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"/>}
      </div>
    </div>
  );
};

export default PatternSimulator;