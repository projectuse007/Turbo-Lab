import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, CheckCircle, XCircle, RefreshCw, BarChart2, Scale } from 'lucide-react';

interface FormSimulatorProps {
  problemId: string;
}

const FormSimulator: React.FC<FormSimulatorProps> = ({ problemId }) => {
  // BMI State
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(1.75);
  
  // Temp State
  const [celsius, setCelsius] = useState(0);
  
  // Number Checks
  const [numInput, setNumInput] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{valid: boolean, msg: string} | null>(null);

  // Sort State
  const [sortNums, setSortNums] = useState([50, 10, 30]);
  const [isSorting, setIsSorting] = useState(false);

  // Multi Input
  const [multiInput, setMultiInput] = useState({ x: 2, y: 3, z: 5 });

  const renderBMI = () => {
    const bmi = weight / (height * height);
    let category = '';
    let color = '';
    let percent = 0;
    
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; percent = 15; }
    else if (bmi < 25) { category = 'Normal'; color = 'text-green-500'; percent = 50; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-orange-500'; percent = 80; }
    else { category = 'Obese'; color = 'text-red-600'; percent = 95; }

    return (
      <div className="space-y-8 max-w-lg mx-auto py-4">
        <div className="relative h-40 flex items-center justify-center">
            {/* Gauge Background */}
            <div className="w-64 h-32 bg-slate-200 dark:bg-slate-700 rounded-t-full overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex">
                    <div className="flex-1 bg-blue-300 dark:bg-blue-900/50"></div>
                    <div className="flex-1 bg-green-300 dark:bg-green-900/50"></div>
                    <div className="flex-1 bg-orange-300 dark:bg-orange-900/50"></div>
                    <div className="flex-1 bg-red-300 dark:bg-red-900/50"></div>
                </div>
                {/* Needle */}
                <div 
                    className="absolute bottom-0 left-1/2 w-1 h-28 bg-slate-800 dark:bg-slate-100 origin-bottom transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-50%) rotate(${(Math.min(Math.max(bmi, 15), 35) - 15) * 9 - 90}deg)` }}
                >
                    <div className="w-4 h-4 bg-slate-900 dark:bg-slate-100 rounded-full absolute -bottom-2 -left-1.5 border-2 border-white dark:border-slate-800"></div>
                </div>
            </div>
            <div className="absolute -bottom-10 text-center">
                <div className="text-4xl font-bold text-slate-800 dark:text-white">{bmi.toFixed(1)}</div>
                <div className={`text-sm font-bold uppercase tracking-wider ${color}`}>{category}</div>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 mt-12">
            <div>
                <div className="flex justify-between mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span>Weight</span>
                    <span>{weight} kg</span>
                </div>
                <input type="range" min="30" max="150" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"/>
            </div>
            <div>
                <div className="flex justify-between mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <span>Height</span>
                    <span>{height} m</span>
                </div>
                <input type="range" min="1.0" max="2.5" step="0.01" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"/>
            </div>
        </div>
      </div>
    );
  };

  const renderTemp = () => {
    const fahrenheit = (celsius * 9/5) + 32;
    // Thermometer Logic
    const h = Math.min(Math.max(celsius + 20, 0), 120); // Mapping -20 to 100 range roughly
    
    return (
        <div className="flex items-center justify-center gap-12 py-8">
            <div className="relative w-16 h-64 bg-slate-200 dark:bg-slate-700 rounded-full border-4 border-slate-300 dark:border-slate-600 shadow-inner flex justify-center">
                <div className="absolute bottom-4 w-8 bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ height: `${h}%`, minHeight: '32px' }}></div>
                <div className="absolute bottom-2 w-10 h-10 bg-red-600 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                
                {/* Marks */}
                <div className="absolute right-0 top-4 w-2 h-1 bg-slate-400"></div>
                <div className="absolute right-0 bottom-1/2 w-2 h-1 bg-slate-400"></div>
            </div>

            <div className="space-y-6">
                <div className="w-64 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                     <label className="text-xs font-bold text-slate-400 uppercase">Input Celsius</label>
                     <div className="flex items-center gap-2 mt-2">
                        <input type="number" value={celsius} onChange={(e) => setCelsius(Number(e.target.value))} className="p-2 border border-slate-300 dark:border-slate-600 rounded w-full font-mono text-lg bg-transparent text-slate-900 dark:text-white"/>
                        <span className="text-xl font-bold text-slate-600 dark:text-slate-400">°C</span>
                     </div>
                </div>
                <div className="w-64 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900/30">
                    <label className="text-xs font-bold text-orange-400 uppercase">Result Fahrenheit</label>
                    <div className="text-3xl font-bold text-orange-800 dark:text-orange-400 mt-1">{fahrenheit.toFixed(1)} °F</div>
                </div>
            </div>
        </div>
    );
  };

  const handleCheck = (type: string) => {
      setIsChecking(true);
      setCheckResult(null);
      
      const n = parseInt(numInput) || 0;
      
      setTimeout(() => {
        let valid = false;
        let msg = "";
        
        if (type === 'PALINDROME') {
            const rev = numInput.split('').reverse().join('');
            valid = numInput === rev;
            msg = valid ? `${n} is a Palindrome` : `${n} (Rev: ${rev}) is not a Palindrome`;
        } else if (type === 'PRIME') {
            valid = true;
            if(n <= 1) valid = false;
            for(let i=2; i*i<=n; i++) if(n%i===0) valid=false;
            msg = valid ? `${n} is Prime` : `${n} is Composite`;
        } else if (type === 'ARMSTRONG') {
            let sum = 0, temp = n;
            const digits = n.toString().length;
            while(temp>0) {
                const r = temp%10;
                sum += Math.pow(r, digits); // Generic Armstrong for any digits
                temp = Math.floor(temp/10);
            }
            // For classic 3 digit armstrong definition often used in labs (sum of cubes):
            let cubeSum = 0; temp=n;
            while(temp>0) { let r=temp%10; cubeSum += r*r*r; temp=Math.floor(temp/10); }
            
            valid = cubeSum === n;
            msg = valid ? `Sum of cubes ${cubeSum} == ${n}` : `Sum of cubes ${cubeSum} != ${n}`;
        } else if (type === 'FACTORIAL') {
             let f = 1;
             for(let i=1;i<=n;i++) f*=i;
             valid = true;
             msg = `Factorial(${n}) = ${f}`;
        }
        
        setCheckResult({valid, msg});
        setIsChecking(false);
      }, 1000); // Fake processing delay
  };

  const renderNumberCheck = (type: 'PALINDROME' | 'PRIME' | 'ARMSTRONG' | 'FACTORIAL') => {
    return (
        <div className="py-8 space-y-6 max-w-md mx-auto">
             <div className="relative">
                 <input 
                    type="number" 
                    placeholder="Enter number..." 
                    value={numInput} 
                    onChange={(e) => setNumInput(e.target.value)}
                    className="w-full p-4 pl-6 text-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full shadow-inner text-center tracking-widest outline-none focus:border-blue-400 transition-colors"
                 />
                 <button 
                    onClick={() => handleCheck(type)}
                    disabled={isChecking || !numInput}
                    className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all font-bold"
                 >
                    {isChecking ? <RefreshCw className="animate-spin w-5 h-5"/> : 'CHECK'}
                 </button>
             </div>
             
             {/* Result Area */}
             <div className={`transition-all duration-500 overflow-hidden ${checkResult ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                {checkResult && (
                    <div className={`p-4 rounded-xl border-2 flex items-center gap-4 ${checkResult.valid ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-400'}`}>
                        {checkResult.valid ? <CheckCircle className="w-8 h-8 shrink-0"/> : <XCircle className="w-8 h-8 shrink-0"/>}
                        <div>
                            <div className="font-bold text-lg">{checkResult.valid ? "Success" : "Failed"}</div>
                            <div className="text-sm opacity-80">{checkResult.msg}</div>
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
  };

  const renderSort = () => {
      const handleSort = async () => {
          setIsSorting(true);
          // Bubble sort visualization
          const arr = [...sortNums];
          const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
          
          for(let i=0; i<arr.length; i++) {
              for(let j=0; j<arr.length-i-1; j++) {
                  if(arr[j] > arr[j+1]) {
                      // Swap
                      let temp = arr[j];
                      arr[j] = arr[j+1];
                      arr[j+1] = temp;
                      setSortNums([...arr]);
                      await delay(600); // Visual delay
                  }
              }
          }
          setIsSorting(false);
      };

      return (
          <div className="py-8 text-center space-y-8">
              <div className="flex justify-center gap-4">
                  {sortNums.map((val, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                           <input 
                              type="number"
                              disabled={isSorting}
                              value={val}
                              onChange={(e) => {
                                  const n = [...sortNums];
                                  n[idx] = parseInt(e.target.value) || 0;
                                  setSortNums(n);
                              }}
                              className="w-20 p-2 text-center border border-slate-300 dark:border-slate-600 rounded shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                           />
                           {/* Visual Block */}
                           <div 
                                className="w-20 bg-blue-500 text-white font-bold rounded shadow-lg transition-all duration-500 ease-in-out flex items-center justify-center"
                                style={{ height: `${Math.max(val * 2, 40)}px` }}
                           >
                               {val}
                           </div>
                      </div>
                  ))}
              </div>
              <button 
                onClick={handleSort} 
                disabled={isSorting}
                className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                  {isSorting ? <RefreshCw className="animate-spin w-4 h-4"/> : <Scale className="w-4 h-4"/>}
                  Visualize Bubble Sort
              </button>
          </div>
      )
  };

  const renderMultiMath = (type: 'POWER' | 'AMICABLE' | 'BASE' | 'AP' | 'GP') => {
      const {x, y, z} = multiInput;
      
      const renderResult = () => {
          if(type === 'BASE') {
              const destBase = z || 2;
              const result = x.toString(destBase).toUpperCase();
              
              return (
                  <div className="text-left bg-slate-800 text-green-400 p-4 rounded font-mono text-sm">
                      <div>Converting {x} (Dec) to Base {destBase}:</div>
                      <div className="my-2 border-b border-slate-600"></div>
                      {(() => {
                          let temp = x;
                          const steps = [];
                          while(temp > 0) {
                              steps.push(`${temp} % ${destBase} = ${temp % destBase} (Quotient: ${Math.floor(temp/destBase)})`);
                              temp = Math.floor(temp/destBase);
                          }
                          return steps.map((s,i) => <div key={i}>{s}</div>);
                      })()}
                      <div className="mt-2 font-bold">Result: {result}</div>
                  </div>
              )
          }
          if(type === 'AP' || type === 'GP') {
               const series = [];
               let term = x;
               for(let i=0; i<Math.min(z, 10); i++) {
                   series.push(term);
                   term = type === 'AP' ? term + y : term * y;
               }
               return (
                   <div className="flex flex-wrap gap-2 justify-center mt-4">
                       {series.map((t, i) => (
                           <div key={i} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-sm flex flex-col items-center animate-fade-in text-slate-800 dark:text-slate-200">
                               <span className="text-xs text-slate-400">n={i+1}</span>
                               <span className="font-bold">{t}</span>
                           </div>
                       ))}
                   </div>
               )
          }
          return null;
      };

      return (
          <div className="py-8 space-y-6">
               <div className="flex flex-wrap justify-center gap-4 items-end bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  {type === 'BASE' ? (
                      <>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Number (Dec)</label>
                            <input type="number" className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={x} onChange={e => setMultiInput({...multiInput, x: +e.target.value})}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">To Base</label>
                            <input type="number" className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={z} onChange={e => setMultiInput({...multiInput, z: +e.target.value})}/>
                        </div>
                      </>
                  ) : (
                      <>
                        <div className="flex flex-col">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                               {['AP','GP'].includes(type) ? 'Start (a)' : 'Num 1 / Base'}
                           </label>
                           <input type="number" className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={x} onChange={e => setMultiInput({...multiInput, x: +e.target.value})}/>
                        </div>
                        <div className="flex flex-col">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
                               {['AP'].includes(type) ? 'Diff (d)' : ['GP'].includes(type) ? 'Ratio (r)' : 'Num 2 / Exp'}
                           </label>
                           <input type="number" className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={y} onChange={e => setMultiInput({...multiInput, y: +e.target.value})}/>
                        </div>
                        {['AP','GP'].includes(type) && (
                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Count (n)</label>
                                <input type="number" className="w-24 p-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value={z} onChange={e => setMultiInput({...multiInput, z: +e.target.value})}/>
                            </div>
                        )}
                      </>
                  )}
               </div>
               
               {/* Result Display */}
               {type === 'POWER' && (
                   <div className="text-center text-4xl font-bold text-slate-800 dark:text-white">
                       {x}<sup className="text-lg">{y}</sup> = <span className="text-blue-600 dark:text-blue-400">{Math.pow(x, y)}</span>
                   </div>
               )}
               {type === 'AMICABLE' && (
                   <div className="text-center text-slate-800 dark:text-slate-200">
                       <div className="text-lg mb-2">Sum Divisors({x}) = {(() => {let s=0;for(let i=1;i<x;i++)if(x%i==0)s+=i; return s;})()}</div>
                       <div className="text-lg mb-4">Sum Divisors({y}) = {(() => {let s=0;for(let i=1;i<y;i++)if(y%i==0)s+=i; return s;})()}</div>
                       {(() => {
                           let s1=0;for(let i=1;i<x;i++)if(x%i==0)s1+=i;
                           let s2=0;for(let i=1;i<y;i++)if(y%i==0)s2+=i;
                           return s1===y && s2===x ? 
                            <span className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-bold">Amicable Pair!</span> : 
                            <span className="px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full font-bold">Not Amicable</span>
                       })()}
                   </div>
               )}
               
               {renderResult()}
          </div>
      );
  }

  // Render Logic
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm min-h-[400px] transition-colors">
      {problemId === 'u3-p15' && renderBMI()}
      {problemId === 'u2-p1' && renderTemp()}
      {problemId === 'u3-p3' && renderNumberCheck('PALINDROME')}
      {problemId === 'u3-p6' && renderNumberCheck('PRIME')}
      {problemId === 'u3-p9' && renderNumberCheck('PRIME')} 
      {problemId === 'u3-p10' && renderNumberCheck('ARMSTRONG')}
      {problemId === 'u4-p8a' && renderNumberCheck('FACTORIAL')}
      {problemId === 'u2-p2' && renderSort()}
      {problemId === 'u4-p8c' && renderMultiMath('POWER')}
      {problemId === 'u3-p8' && renderMultiMath('AMICABLE')}
      {problemId === 'u3-p11' && renderMultiMath('BASE')}
      {problemId === 'u2-p8a' && renderMultiMath('AP')}
      {problemId === 'u2-p8b' && renderMultiMath('GP')}
      
      {problemId === 'u4-p5' && (
          <div className="text-center py-12 text-slate-400">
             String operations logic is best visualized in code trace. <br/> See "Algorithm" tab for details.
          </div>
      )}
      
      {['u2-p11', 'u3-p4'].includes(problemId) && (
          <div className="text-center py-10 font-bold text-slate-400">
              Interactive Form logic similar to others. <br/> Refer to Code/Algorithm.
          </div>
      )}
    </div>
  );
};

export default FormSimulator;