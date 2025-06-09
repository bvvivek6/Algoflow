export function getMergeSortSteps(arr) {
  const steps = [];
  const a = arr.slice();

  function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = a.slice(start, mid + 1);
    const right = a.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      steps.push({ array: a.slice(), compared: [k], swapped: [], selected: [] });
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
    }

    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];

    steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });
  }

  mergeSort(0, a.length - 1);
  return steps;
}