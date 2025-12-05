import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface TerminalSimulatorProps {
  problemId: string;
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ problemId }) => {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [visualData, setVisualData] = useState<any>(null); // For arrays/matrices/graphs
  
  // Ref for auto-scrolling
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputLines]);

  const addLine = (text: string) => {
    setOutputLines(prev => [...prev, text]);
  };

  const clear = () => {
    setOutputLines([]);
    setVisualData(null);
    setIsRunning(false);
  };

  const simulateExecution = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutputLines([]);
    setVisualData(null);
    
    addLine(`> RUN ${problemId}.EXE`);
    await new Promise(r => setTimeout(r, 500));

    const n = parseInt(inputVal) || 5; 
    
    // ----------- UNIT II: LOOP & SERIES -----------
    if (['u2-p3', 'u2-p4', 'u2-p5', 'u2-p9', 'u2-p10', 'u2-p12', 'u2-p13', 'u2-p14'].includes(problemId)) {
        if (problemId === 'u2-p3') { // Square Cube
            addLine("Num\tSquare\tCube");
            addLine("------------------------");
            for(let i=1; i<=n; i++) {
                await new Promise(r => setTimeout(r, 100));
                addLine(`${i}\t${i*i}\t${i*i*i}`);
            }
        } 
        else if (problemId === 'u2-p5') { // Tables
            for(let i=1; i<=n; i++) {
                addLine(`\n--- Table of ${i} ---`);
                for(let j=1; j<=5; j++) {
                    await new Promise(r => setTimeout(r, 50));
                    addLine(`${i} * ${j} = ${i*j}`);
                }
            }
        }
        else if (problemId === 'u2-p9' || problemId === 'u2-p10') { // Fibonacci/Tribonacci
            const isTrib = problemId === 'u2-p10';
            let terms = isTrib ? [0, 1, 1] : [0, 1];
            addLine(isTrib ? "Tribonacci Series:" : "Fibonacci Series:");
            
            // Initial print
            addLine(terms.join(', '));
            setVisualData({ type: 'SERIES', data: [...terms] });

            for(let i=terms.length; i<n; i++) {
                await new Promise(r => setTimeout(r, 200));
                let next = 0;
                if(isTrib) next = terms[i-1] + terms[i-2] + terms[i-3];
                else next = terms[i-1] + terms[i-2];
                
                terms.push(next);
                addLine(`Term ${i+1}: ${next}`);
                setVisualData({ type: 'SERIES', data: [...terms] });
            }
        }
        else if (['u2-p12', 'u2-p13', 'u2-p14'].includes(problemId)) { // Taylor Series
            addLine(`Calculating Taylor Series for N=${n}...`);
            let sum = 0;
            const history = [];
            for(let i=0; i<n; i++) {
                await new Promise(r => setTimeout(r, 150));
                let term = 0;
                // Simplified approximations for visual simulation
                if (problemId === 'u2-p12') { // PI
                    term = (Math.pow(-1, i) / (2*i + 1));
                    if (i===0) sum = 0; // Reset logic for sim
                    sum += term;
                    addLine(`i=${i}: term=${term.toFixed(4)}, approx PI=${(4*sum).toFixed(4)}`);
                    history.push(4*sum);
                } else if (problemId === 'u2-p13') { // e^x (x=1 assumed)
                    let fact = 1; for(let k=1; k<=i; k++) fact*=k;
                    term = 1 / fact;
                    sum += term;
                    addLine(`i=${i}: term=${term.toFixed(4)}, approx e=${sum.toFixed(4)}`);
                    history.push(sum);
                } else { // sin(x) (x=30deg assumed)
                     // Visual placeholder
                     addLine(`Iteration ${i+1}: Computing term...`);
                     history.push(Math.sin(30 * Math.PI/180) + (Math.random()*0.1 - 0.05)); // Fake convergence
                }
                setVisualData({ type: 'CHART', data: history });
            }
        }
        else {
             // Generic loop
             for(let i=1; i<=n; i++) {
                 if (problemId === 'u2-p4' && i%2===0) continue;
                 await new Promise(r => setTimeout(r, 50));
                 addLine(`Output: ${i}`);
             }
        }
    }
    // ----------- UNIT III: DIGITS & FACTORS -----------
    else if (['u3-p1', 'u3-p2', 'u3-p5', 'u3-p7', 'u3-p12', 'u3-p14', 'u4-p7', 'u4-p8b', 'u4-p8d'].includes(problemId)) {
        if (problemId === 'u3-p1' || problemId === 'u3-p12') { // Extract Digits / Text
            let num = n;
            addLine(`Input: ${num}`);
            let str = num.toString();
            addLine("Extracting digits...");
            for(let char of str) {
                 await new Promise(r => setTimeout(r, 300));
                 if(problemId === 'u3-p12') {
                     const map = ['ZERO','ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE'];
                     addLine(`Digit ${char} -> ${map[parseInt(char)]}`);
                 } else {
                     addLine(`Digit: ${char}`);
                 }
            }
        }
        else if (problemId === 'u3-p7') { // Prime Factors
            addLine(`Finding prime factors of ${n}...`);
            let temp = n, d = 2;
            const factors = [];
            while(temp > 1) {
                if(temp % d === 0) {
                    await new Promise(r => setTimeout(r, 300));
                    addLine(`Factor found: ${d}`);
                    factors.push(d);
                    temp /= d;
                    setVisualData({ type: 'FACTORS', data: factors, current: temp });
                } else {
                    d++;
                }
            }
            addLine(`Complete: ${factors.join(' x ')} = ${n}`);
        }
        else if (problemId === 'u3-p14') { // Min Max Avg
            const nums = inputVal ? inputVal.split(',').map(Number) : [10, 5, 20, 8, 15];
            addLine(`Sequence: ${nums.join(', ')}`);
            let min = nums[0], max = nums[0], sum = 0;
            
            for(let i=0; i<nums.length; i++) {
                 await new Promise(r => setTimeout(r, 200));
                 const val = nums[i];
                 if(val < min) min = val;
                 if(val > max) max = val;
                 sum += val;
                 addLine(`Read ${val} | Min:${min} Max:${max} Sum:${sum}`);
                 setVisualData({ type: 'STATS', data: nums, currentIndex: i, stats: {min, max, sum} });
            }
            addLine(`Average: ${(sum/nums.length).toFixed(2)}`);
        }
        else {
            addLine(`Processing logic for ${problemId}...`);
            addLine(`Result: Done.`);
        }
    }
    // ----------- UNIT IV: ARRAYS & MATRICES -----------
    else if (['u4-p1', 'u4-p2', 'u4-p3', 'u4-p4', 'u4-p6'].includes(problemId)) {
        if (problemId === 'u4-p6') { // Matrix
             setVisualData({ type: 'MATRIX_SETUP' });
             addLine("Initializing Matrices...");
        } else {
            // Array stats
            const arr = inputVal ? inputVal.split(',').map(Number) : [12, 45, 7, 23, 56, 89, 34, 12];
            
            if (problemId === 'u4-p2') { // Max
                addLine(`Array: [${arr.join(', ')}]`);
                let max = arr[0];
                for(let i=0; i<arr.length; i++) {
                    await new Promise(r => setTimeout(r, 200));
                    if(arr[i] > max) max = arr[i];
                    setVisualData({ type: 'ARRAY_SCAN', data: arr, activeIdx: i, highlight: max });
                }
                addLine(`Max Value: ${max}`);
            } 
            else if (problemId === 'u4-p4') { // Median
                addLine(`Array: [${arr.join(', ')}]`);
                addLine("Sorting array...");
                await new Promise(r => setTimeout(r, 500));
                const sorted = [...arr].sort((a,b)=>a-b);
                setVisualData({ type: 'ARRAY_SORTED', data: sorted });
                addLine(`Sorted: [${sorted.join(', ')}]`);
                addLine(`Median: ${sorted.length%2!==0 ? sorted[Math.floor(sorted.length/2)] : (sorted[sorted.length/2-1]+sorted[sorted.length/2])/2}`);
            }
            else if (problemId === 'u4-p1') { // Circular Prime (Logic Update)
                 let num = n;
                 let digits = 0;
                 let temp = num;
                 // Count digits
                 while(temp > 0) { digits++; temp = Math.floor(temp/10); }

                 // Calculate power
                 let multiplier = 1;
                 for(let i=1; i<digits; i++) multiplier *= 10;

                 addLine(`Input: ${num}`);
                 
                 // Generate Rotations
                 const rotations: number[] = [];
                 let currentVal = num;
                 for(let i=0; i<digits; i++) {
                     rotations.push(currentVal);
                     let lastDigit = currentVal % 10;
                     let rest = Math.floor(currentVal / 10);
                     currentVal = (lastDigit * multiplier) + rest;
                 }

                 addLine(`Rotations: ${rotations.join(', ')}`);
                 setVisualData({ type: 'STATS', data: rotations, activeIdx: -1 });

                 let allPrime = true;

                 // Check Loop
                 for(let i=0; i<rotations.length; i++) {
                     const val = rotations[i];
                     setVisualData({ type: 'STATS', data: rotations, activeIdx: i });
                     await new Promise(r => setTimeout(r, 600));

                     let isPrime = true;
                     if (val <= 1) isPrime = false;
                     for(let k=2; k*k<=val; k++) {
                         if(val % k === 0) isPrime = false;
                     }

                     addLine(`${val} is ${isPrime ? "Prime" : "Not Prime"}`);
                     if(!isPrime) allPrime = false;
                 }

                 setVisualData({ type: 'STATS', data: rotations, activeIdx: -1 });
                 addLine("----------------");
                 
                 if(allPrime) {
                     addLine(`Result: ${n} is a CIRCULAR PRIME`);
                 } else {
                     addLine(`Result: ${n} is NOT a circular prime`);
                 }
            }
            else { // Mean Range Mode
                 addLine(`Array: [${arr.join(', ')}]`);
                 let sum = arr.reduce((a,b)=>a+b,0);
                 addLine(`Sum: ${sum}, Mean: ${(sum/arr.length).toFixed(2)}`);
                 setVisualData({ type: 'ARRAY_STATIC', data: arr });
            }
        }
    }
    
    setIsRunning(false);
  };

  // --- Sub-components for Visuals ---

  const renderVisuals = () => {
      if(!visualData) return null;

      if(visualData.type === 'SERIES' || visualData.type === 'CHART') {
          return (
              <div className="h-32 flex items-end gap-1 p-4 bg-slate-800/50 rounded border border-slate-700 mb-4 overflow-hidden">
                  {visualData.data.map((val: number, idx: number) => (
                      <div key={idx} className="flex-1 bg-green-500/50 hover:bg-green-400 transition-all rounded-t relative group" style={{ height: `${Math.min((val / (Math.max(...visualData.data)||1)) * 100, 100)}%` }}>
                          <span className="absolute -top-6 left-0 text-xs text-slate-300 opacity-0 group-hover:opacity-100">{val.toFixed(2)}</span>
                      </div>
                  ))}
              </div>
          );
      }

      if(visualData.type === 'FACTORS') {
          return (
              <div className="flex items-center gap-2 p-4 mb-4 text-xl font-bold text-yellow-400">
                  {visualData.data.map((f: number, i: number) => (
                      <div key={i} className="animate-pop-in flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-yellow-500">{f}</div>
                          <span>x</span>
                      </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center border-2 border-dashed border-slate-400">{visualData.current}</div>
              </div>
          );
      }

      if (visualData.type === 'STATS' || visualData.type === 'ARRAY_SCAN' || visualData.type === 'ARRAY_SORTED' || visualData.type === 'ARRAY_STATIC') {
          const arr = visualData.data;
          return (
              <div className="flex flex-wrap gap-2 p-4 mb-4 justify-center">
                  {arr.map((val: number, idx: number) => {
                      const isActive = visualData.activeIdx === idx;
                      const isMax = visualData.highlight === val;
                      return (
                          <div key={idx} className={`
                              w-12 h-12 flex items-center justify-center rounded font-bold transition-all duration-300
                              ${isActive ? 'bg-blue-600 scale-110 shadow-lg border-2 border-white' : 'bg-slate-700'}
                              ${isMax ? 'bg-green-600 text-white ring-2 ring-green-400' : 'text-slate-300'}
                          `}>
                              {val}
                          </div>
                      );
                  })}
              </div>
          );
      }

      if (visualData.type === 'MATRIX_SETUP') {
           return <MatrixVisualizer />;
      }

      return null;
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 text-green-400 text-sm font-mono font-bold">
            <Terminal className="w-4 h-4" />
            <span>TURBO_C_SIMULATOR.EXE</span>
        </div>
        <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"/>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"/>
            <div className="w-3 h-3 rounded-full bg-green-500/80"/>
        </div>
      </div>
      
      {/* Visualizer Area */}
      {visualData && (
          <div className="bg-slate-900 border-b border-slate-800 animate-fade-in">
              {renderVisuals()}
          </div>
      )}

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 p-6 font-mono text-sm md:text-base overflow-y-auto font-medium scroll-smooth bg-slate-900 text-slate-300"
      >
         <div className="opacity-50 mb-4 text-xs">Microsoft Windows [Version 10.0.19045.4291]<br/>(c) Microsoft Corporation. All rights reserved.</div>
         
         {outputLines.map((line, i) => (
             <div key={i} className="mb-1 break-words animate-fade-in text-green-400">{line}</div>
         ))}
         {isRunning && <div className="animate-pulse text-green-500">_</div>}
      </div>

      {/* Input Controls */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
         <div className="flex gap-2">
             <div className="relative flex-1">
                 <span className="absolute left-3 top-2.5 text-slate-500 font-mono">{'>'}</span>
                 <input 
                    type="text" 
                    placeholder={problemId.includes('u3-p14') || problemId.includes('u4') ? "Enter numbers (e.g. 10,20,30)..." : "Enter N..."}
                    className="w-full bg-slate-900 border border-slate-600 text-white pl-8 pr-4 py-2 rounded font-mono focus:border-blue-500 outline-none transition-colors"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && simulateExecution()}
                    disabled={isRunning}
                 />
             </div>
             <button 
                onClick={simulateExecution}
                disabled={isRunning}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold text-sm transition-all disabled:opacity-50 disabled:grayscale"
             >
                <Play className="w-4 h-4" /> RUN
             </button>
             <button 
                onClick={clear}
                className="flex items-center justify-center w-10 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                title="Clear Screen"
             >
                <RotateCcw className="w-4 h-4" />
             </button>
         </div>
      </div>
    </div>
  );
};

// Sub-component for Matrix Animation
const MatrixVisualizer = () => {
    const [matA, setMatA] = useState([[1,2],[3,4]]);
    const [matB, setMatB] = useState([[5,6],[7,8]]);
    const [res, setRes] = useState<number[][] | null>(null);

    const calc = () => {
        const r = [
            [matA[0][0]+matB[0][0], matA[0][1]+matB[0][1]],
            [matA[1][0]+matB[1][0], matA[1][1]+matB[1][1]]
        ];
        setRes(r);
    }

    const MatInput = ({ data, setData, label }: any) => (
        <div className="bg-slate-800 p-3 rounded border border-slate-700">
            <div className="text-xs text-slate-400 mb-2 font-bold text-center">{label}</div>
            <div className="grid grid-cols-2 gap-2">
                {data.map((row:number[], i:number) => 
                    row.map((val:number, j:number) => (
                        <input 
                            key={`${i}-${j}`}
                            type="number" 
                            className="w-10 h-10 bg-slate-900 text-white text-center rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                            value={val}
                            onChange={(e) => {
                                const newData = [...data];
                                newData[i][j] = parseInt(e.target.value)||0;
                                setData(newData);
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="p-4 flex items-center justify-center gap-4 flex-wrap">
            <MatInput data={matA} setData={setMatA} label="Matrix A" />
            <div className="text-xl text-slate-500 font-bold">+</div>
            <MatInput data={matB} setData={setMatB} label="Matrix B" />
            <button onClick={calc} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-500">=</button>
            {res && (
                <div className="bg-slate-700 p-3 rounded border border-green-500/50 animate-pop-in">
                    <div className="text-xs text-green-400 mb-2 font-bold text-center">Result</div>
                    <div className="grid grid-cols-2 gap-2">
                        {res.map((row, i) => row.map((val, j) => (
                            <div key={`${i}-${j}`} className="w-10 h-10 flex items-center justify-center bg-slate-800 text-green-400 font-bold rounded border border-slate-600">
                                {val}
                            </div>
                        )))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TerminalSimulator;