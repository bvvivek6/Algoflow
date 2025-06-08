// src/components/Visualizer.jsx
export default function Visualizer({ step, maxVal }) {
  return (
    <div className="w-full">
      <h3 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          3
        </div>
        Visualization
      </h3>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        <div className="flex items-end justify-center gap-1 h-20 w-full">
          {step.array.map((val, idx) => {
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
        <div className="mt-4 flex justify-center overflow-x-auto gap-4 text-xs">
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
    </div>
  );
}
