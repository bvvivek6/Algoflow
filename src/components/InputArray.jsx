import { useState } from "react";

export default function InputArray({ onSubmit, initialArray }) {
  const [input, setInput] = useState(initialArray.join(","));
  const [error, setError] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const arr = input
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    if (arr.length === 0) {
      setError("Please enter at least one valid number.");
      return;
    }
    if (arr.length > 8) {
      setError("Please enter a maximum of 8 numbers.");
      return;
    }
    setError("");
    onSubmit(arr);
  }

  return (
    <div className="w-full">
      <h3 className="font-bold text-lg text-slate-700 mb-3 flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          2
        </div>
        Input Array
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Enter numbers (comma-separated):
          </label>
          <input
            className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 text-md bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            value={input}
            onChange={handleChange}
            placeholder="e.g. 5, 3, 8, 1, 6, 2, 9"
          />
          {error && (
            <div className="text-red-500 text-sm mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
        </div>{" "}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-xl px-4 py-2"
        >
          Set Array
        </button>
      </form>
    </div>
  );
}
