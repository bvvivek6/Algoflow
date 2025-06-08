import { useState, useRef, useEffect } from "react";
import InputArray from "./components/InputArray";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Visualizer from "./components/Visualizer";
import { getBubbleSortSteps } from "./utils/bubbleSortSteps";
import { getSelectionSortSteps } from "./utils/selectionSortSteps";
import { getInsertionSortSteps } from "./utils/insertionSortSteps";

const ALGORITHMS = [
  {
    value: "bubble",
    label: "Bubble Sort",
    getSteps: getBubbleSortSteps,
    pseudocode: [
      "for i = 0 to n-1:",
      "    for j = 0 to n-i-2:",
      "        if arr[j] > arr[j+1] then:",
      "            swap arr[j] and arr[j+1]",
    ],
    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  },
  {
    value: "selection",
    label: "Selection Sort",
    getSteps: getSelectionSortSteps,
    pseudocode: [
      "for i = 0 to n-1:",
      "    min_idx = i",
      "    for j = i+1 to n-1:",
      "        if arr[j] < arr[min_idx]:",
      "            min_idx = j",
      "    swap arr[i] and arr[min_idx]",
    ],
    description:
      "Selection Sort finds the minimum element and places it at the beginning, then repeats for the remaining array.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  },
  {
    value: "insertion",
    label: "Insertion Sort",
    getSteps: getInsertionSortSteps,
    pseudocode: [
      "for i = 1 to n-1:",
      "    key = arr[i]",
      "    j = i - 1",
      "    while j >= 0 and arr[j] > key:",
      "        arr[j+1] = arr[j]",
      "        j = j - 1",
      "    arr[j+1] = key",
    ],
    description:
      "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
  },
];

const DEFAULT_ARRAY = [5, 3, 8, 1, 4, 7, 2];

function App() {
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [steps, setSteps] = useState(() => getBubbleSortSteps(DEFAULT_ARRAY));
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSteps(ALGORITHMS.find((a) => a.value === algorithm).getSteps(array));
    setStepIdx(0);
    setIsPlaying(false);
  }, [array, algorithm]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIdx((idx) => {
          if (idx < steps.length - 1) return idx + 1;
          setIsPlaying(false);
          return idx;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps.length]);

  const maxVal = Math.max(...array, 1);
  const atEnd = stepIdx === steps.length - 1;
  const currentStep = steps[stepIdx];
  const algoObj = ALGORITHMS.find((a) => a.value === algorithm);

  let highlightLines = [];
  if (algorithm === "bubble" && currentStep.compared.length === 2) {
    highlightLines = [1, 2];
    if (currentStep.swapped.length === 2) highlightLines.push(3);
  } else if (algorithm === "selection") {
    if (currentStep.selected && currentStep.selected.length > 0)
      highlightLines = [0, 1];
    if (currentStep.compared.length === 2) highlightLines = [2, 3, 4];
    if (currentStep.swapped.length === 2) highlightLines = [5];
  } else if (algorithm === "insertion") {
    if (currentStep.compared.length === 2) highlightLines = [3, 4];
    if (currentStep.swapped.length === 2) highlightLines = [4, 5];
  }

  return (
    <div className="min-h-screen bg-slate-100 items-center tracking-tight ">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="md:max-w-7xl w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg md:text-2xl font-medium tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sorting Algorithm Visualizer
                </h1>
                <p className="md:text-sm text-xs text-slate-500">
                  Learn how sorting algorithms work step by step
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
              <div className="text-right">
                <p className="font-semibold text-slate-700">{algoObj.label}</p>
                <p>
                  Time: {algoObj.timeComplexity} | Space:{" "}
                  {algoObj.spaceComplexity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="md:max-w-7xl w-full flex md:flex-row  flex-col grid-cols-1 md:grid-cols-3 gap-2 mx-auto px-2 pb-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Left Panel - Controls */}
          <div className="xl:col-span-1 space-y-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <AlgorithmSelector
                value={algorithm}
                onChange={setAlgorithm}
                options={ALGORITHMS}
              />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <InputArray onSubmit={setArray} initialArray={array} />
            </div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="col-span-2 space-y-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <Visualizer
                step={currentStep}
                maxVal={maxVal}
                stepIdx={stepIdx}
                atEnd={atEnd}
                steps={steps}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying((p) => !p)}
                onStepBack={() => setStepIdx((idx) => Math.max(0, idx - 1))}
                onStepForward={() =>
                  setStepIdx((idx) => Math.min(steps.length - 1, idx + 1))
                }
                onReset={() => {
                  setStepIdx(0);
                  setIsPlaying(false);
                }}
                canStepBack={stepIdx > 0}
                canStepForward={stepIdx < steps.length - 1}
                isAtEnd={atEnd}
              />
            </div>

            {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
              <Controls
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying((p) => !p)}
                onStepBack={() => setStepIdx((idx) => Math.max(0, idx - 1))}
                onStepForward={() =>
                  setStepIdx((idx) => Math.min(steps.length - 1, idx + 1))
                }
                onReset={() => {
                  setStepIdx(0);
                  setIsPlaying(false);
                }}
                canStepBack={stepIdx > 0}
                canStepForward={stepIdx < steps.length - 1}
                isAtEnd={atEnd}
              />
            </div> */}
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:w-xl  p-6 h-[30%] border border-slate-200">
          <h3 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              📝
            </div>
            Algorithm Info
          </h3>
          <div className="space-y-4">
            <p className="text-slate-600 text-sm leading-tight">
              {algoObj.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="font-semibold text-blue-700">Time Complexity</p>
                <p className="text-blue-600 font-mono">
                  {algoObj.timeComplexity}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="font-semibold text-purple-700">
                  Space Complexity
                </p>
                <p className="text-purple-600 font-mono">
                  {algoObj.spaceComplexity}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="font-semibold text-slate-700 mb-2">Pseudocode</p>
              <pre className="text-xs leading-relaxed">
                {algoObj.pseudocode.map((line, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded transition-all duration-200 ${
                      highlightLines.includes(i)
                        ? "bg-yellow-200 font-semibold"
                        : ""
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white text-gray-800 py-6 mt-8 md:mt-20">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">Built with ❤️ by Vivek.</div>
          <div className="flex space-x-6 text-sm">
            <a
              href="https://github.com/bvvivek6/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
