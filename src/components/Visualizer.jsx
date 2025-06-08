export default function Visualizer({
  step,
  maxVal,
  stepIdx, 
  steps,
  atEnd,
  isPlaying,
  onPlayPause,
  onStepBack,
  onStepForward,
  onReset,
  canStepBack,
  canStepForward,
  isAtEnd,
}) {
  return (
    <div className="w-full">
      <h3 className="font-bold text-lg text-slate-700 mb-2 flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          3
        </div>
        Visualization
      </h3>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        <div className="flex items-end justify-center gap-1 h-12 w-full">
          {step &&
            step.array &&
            step.array.map((val, idx) => {
              const isCompared = step.compared.includes(idx);
              const isSwapped = step.swapped.includes(idx);
              const isSelected = step.selected && step.selected.includes(idx);
              const isSorted = step.sorted && step.sorted.includes(idx);
              const height = (val / maxVal) * 100;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 flex-1 max-w-[50px]"
                >
                  <div
                    className={`w-full rounded-full shadow-md transition-all duration-300 ease-in-out  transform ${
                      isSwapped
                        ? "bg-gradient-to-t from-red-500 to-red-400 scale-110 shadow-lg"
                        : isCompared
                        ? "bg-gradient-to-t from-yellow-400 to-yellow-300 scale-105 shadow-md"
                        : isSelected
                        ? "bg-gradient-to-t from-purple-500 to-purple-400 scale-105 shadow-md"
                        : isSorted
                        ? "bg-gradient-to-t from-green-500 to-green-400"
                        : "bg-gradient-to-t from-blue-500 to-blue-400"
                    }`}
                    style={{
                      height: `${height}%`,
                      minHeight: "20px",
                    }}
                    title={`Value: ${val}`}
                  />
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isSwapped
                        ? "text-red-600"
                        : isCompared
                        ? "text-yellow-600"
                        : isSelected
                        ? "text-purple-600"
                        : isSorted
                        ? "text-green-600"
                        : "text-slate-600"
                    }`}
                  >
                    {val}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="mt-4 flex justify-center overflow-x-auto gap-4 pb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded"></div>
            <span className="text-slate-600">Unsorted</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded"></div>
            <span className="text-slate-600">Comparing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
            <span className="text-slate-600">Swapping</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-t from-purple-500 to-purple-400 rounded"></div>
            <span className="text-slate-600">Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gradient-to-t from-green-500 to-green-400 rounded"></div>
            <span className="text-slate-600">Sorted</span>
          </div>
        </div>
      </div>
      <div className="mt-2 min-h-[80px] flex items-center justify-center">
        {step && step.compared && step.compared.length === 2 && !atEnd ? (
          <div className="text-center">
            <p className="text-slate-700 text-lg">
              Comparing{" "}
              <span className="font-bold text-blue-600">
                {step.array[step.compared[0]]}
              </span>{" "}
              and{" "}
              <span className="font-bold text-blue-600">
                {step.array[step.compared[1]]}
              </span>
            </p>
            {step.swapped.length === 2 && (
              <p className="text-red-600 font-semibold mt-2 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Swapped!
              </p>
            )}
          </div>
        ) : atEnd ? (
          <div className="text-center">
            <p className="text-emerald-700 font-bold text-xl mb-2">
              🎉 Sorting Complete!
            </p>
            <p className="text-slate-600">
              Final sorted array: [{steps[stepIdx].array.join(", ")}]
            </p>
          </div>
        ) : (
          <p className="text-slate-500 text-sm tracking-tighter text-center">
            Click play to start the visualization
          </p>
        )}
      </div>
      {/* Controls*/}
      <div className="flex gap-2 mt-2 justify-center items-center">
        <button
          className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 "
          onClick={onStepBack}
          disabled={!canStepBack}
          title="Previous Step"
        >
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className={`px-4 py-2 w-[100px] rounded-full text-white font-medium transition-all duration-200 ${
            isPlaying
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          }`}
          onClick={onPlayPause}
        >
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            {isPlaying ? "Pause" : "Play"}
          </div>
        </button>

        <button
          className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed "
          onClick={onStepForward}
          disabled={!canStepForward}
          title="Next Step"
        >
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          className="p-2 bg-gradient-to-r from-slate-400 to-slate-400 text-white rounded-full hover:from-slate-600 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed  ml-2"
          onClick={onReset}
          disabled={isAtEnd}
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
