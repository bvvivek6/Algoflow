export function getQuickSortSteps(arr) {
  const steps = [];
  const a = arr.slice();

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: a.slice(),
        compared: [j, high],
        swapped: [],
        selected: [high],
      });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          array: a.slice(),
          compared: [],
          swapped: [i, j],
          selected: [high],
        });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      array: a.slice(),
      compared: [],
      swapped: [i + 1, high],
      selected: [high],
    });
    return i + 1;
  }

  quickSort(0, a.length - 1);
  steps.push({ array: a.slice(), compared: [], swapped: [], selected: [] });
  return steps;
}
