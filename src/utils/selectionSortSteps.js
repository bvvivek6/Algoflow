export function getSelectionSortSteps(arr) {
  const steps = [];
  const a = arr.slice();
  const n = a.length;

  steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ array: a.slice(), compared: [], swapped: [], selected: [i] });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: a.slice(),
        compared: [minIdx, j],
        swapped: [],
        selected: [i],
      });
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        array: a.slice(),
        compared: [],
        swapped: [i, minIdx],
        selected: [i],
      });
    }
  }

  steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });
  return steps;
}
