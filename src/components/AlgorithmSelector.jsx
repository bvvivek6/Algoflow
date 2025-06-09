export default function AlgorithmSelector({ value, onChange, options }) {
  return (
    <div className="w-full">
      <h3 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          1
        </div>
        Choose Algorithm
      </h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Select sorting algorithm
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none border-2 border-slate-200 rounded-xl px-4 py-2 text-md bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 pr-12"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-base">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-5 w-5 text-purple-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
