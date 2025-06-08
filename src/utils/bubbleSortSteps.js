// src/utils/bubbleSortSteps.js
// Generates steps for Bubble Sort visualization
export function getBubbleSortSteps(arr) {
  const steps = [];
  const a = arr.slice();
  const n = a.length;
  let swapped;
  steps.push({ array: a.slice(), compared: [], swapped: [] });
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: a.slice(), compared: [j, j + 1], swapped: [] });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        steps.push({
          array: a.slice(),
          compared: [j, j + 1],
          swapped: [j, j + 1],
        });
      }
    }
    if (!swapped) break;
  }
  steps.push({ array: a.slice(), compared: [], swapped: [] });
  return steps;
}
