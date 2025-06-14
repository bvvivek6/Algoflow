import { useState, useRef, useEffect, use } from "react";
import InputArray from "./components/InputArray";
import AlgorithmSelector from "./components/AlgorithmSelector";
import Visualizer from "./components/Visualizer";
import { getBubbleSortSteps } from "./utils/bubbleSortSteps";
import { getSelectionSortSteps } from "./utils/selectionSortSteps";
import { getInsertionSortSteps } from "./utils/insertionSortSteps";
import { getQuickSortSteps } from "./utils/quickSortSteps";
import { getHeapSortSteps } from "./utils/heapSortSteps";
import Resources from "./components/Resources";
import { motion, AnimatePresence } from "framer-motion";
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
  {
    value: "quick",
    label: "Quick Sort",
    getSteps: getQuickSortSteps,
    pseudocode: [
      "if low < high:",
      "    pi = partition(arr, low, high)",
      "    quickSort(arr, low, pi - 1)",
      "    quickSort(arr, pi + 1, high)",
    ],
    description:
      "Quick Sort picks a pivot and partitions the array around the pivot, sorting recursively.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
  },
  {
    value: "heap",
    label: "Heap Sort",
    getSteps: getHeapSortSteps,
    pseudocode: [
      "buildMaxHeap(arr)",
      "for i = n-1 down to 1:",
      "    swap arr[0] and arr[i]",
      "    heapify(arr, 0, i)",
    ],
    description:
      "Heap Sort uses a binary heap to sort the array by repeatedly removing the largest element.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
  },
];

const DEFAULT_ARRAY = [5, 3, 8, 1, 4, 7, 2];

async function fetchResources(algorithmLabel) {
  const ytApi = "https://www.googleapis.com/youtube/v3/search";
  const ytKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const ytQuery = encodeURIComponent(
    algorithmLabel + " sorting algorithm explained"
  );
  let ytVideos = [];
  try {
    const res = await fetch(
      `${ytApi}?part=snippet&q=${ytQuery}&type=video&maxResults=4&key=${ytKey}`
    );
    if (res.ok) {
      const data = await res.json();
      ytVideos = data.items || [];
    }
  } catch {
    alert("Failed to fetch data");
  }

  return { ytVideos };
}

function App() {
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [steps, setSteps] = useState(() => getBubbleSortSteps(DEFAULT_ARRAY));
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resources, setResources] = useState({ ytVideos: [] });
  const [loadingResources, setLoadingResources] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
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
      }, 1500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps.length]);

  const algoObj = ALGORITHMS.find((a) => a.value === algorithm);

  useEffect(() => {
    setLoadingResources(true);
    fetchResources(algoObj.label).then((res) => {
      setResources(res);
      setLoadingResources(false);
    });
  }, [algorithm, algoObj.label]);

  const maxVal = Math.max(...array, 1);
  const atEnd = stepIdx === steps.length - 1;
  const currentStep = steps[stepIdx];

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
  } else if (algorithm === "quick") {
    if (currentStep.selected && currentStep.selected.length === 1)
      highlightLines.push(1);
    if (currentStep.compared && currentStep.compared.length === 2)
      highlightLines.push(2);
    if (currentStep.swapped && currentStep.swapped.length === 2) {
      highlightLines.push(3);
      highlightLines.push(4);
    }
  } else if (algorithm === "heap") {
    if (currentStep.compared && currentStep.compared.length === 2)
      highlightLines.push(2);
    if (currentStep.swapped && currentStep.swapped.length === 2)
      highlightLines.push(3);
  }
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-0">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[90vw] md:w-[32vw] px-6 py-3 bg-black/70  z-20 flex items-center backdrop-blur-lg justify-center rounded-full shadow-lg"
            initial={{ opacity: 0, y: -20, filter: "blur(20px)", scale: 0.6 }}
            animate={{ opacity: 1, y: 25, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(20px)", scale: 0.6 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <p className="text-center w-full text-white font-medium md:text-sm text-xs">
              Analyzing algorithms made simple — Welcome to{" "}
              <span className="text-blue-400">AlgoFlow! </span>🚀📊
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="min-h-screen bg-slate-100 items-center tracking-tight z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <header className="bg-white/50 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="md:max-w-7xl w-full mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-lg md:text-2xl font-semibold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AlgoFlow
                  </h1>
                  <p className="md:text-sm text-xs text-slate-500">
                    Learn how sorting algorithms work step by step
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
                <div className="text-right">
                  <p className="font-semibold text-slate-700">
                    {algoObj.label}
                  </p>
                  <p>
                    Time: {algoObj.timeComplexity} | Space:{" "}
                    {algoObj.spaceComplexity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="md:max-w-7xl w-full flex md:flex-row  flex-col grid-cols-1 md:grid-cols-3 grid-row-2 gap-2 mx-auto px-2 pb-2 pt-2">
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
        </div>
        <div className="max-w-7xl mx-auto px-2 pb-4">
          <Resources
            resources={resources}
            loadingResources={loadingResources}
          />
        </div>
        <footer className=" text-black p-6 my-2">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">Built with ❤️ by Vivek.</div>
            <div className="flex space-x-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="https://github.com/bvvivek6/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
