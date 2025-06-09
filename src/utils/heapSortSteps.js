export function getHeapSortSteps(arr) {
  const steps = [];
  const a = arr.slice();

  const heapify = (n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && a[left] > a[largest]) {
      largest = left;
    }

    if (right < n && a[right] > a[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        array: a.slice(),
        compared: [i, largest],
        swapped: [i, largest],
        selected: [],
      });
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(n, largest);
    }
  };

  const n = a.length;
  steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: a.slice(),
      compared: [0, i],
      swapped: [0, i],
      selected: [],
    });
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }

  steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });
  return steps;
}
