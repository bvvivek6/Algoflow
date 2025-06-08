// Generates steps for Insertion Sort visualization
export function getInsertionSortSteps(arr) {
  const steps = [];
  const a = arr.slice();
  const n = a.length;

  steps.push({ array: a.slice(), compared: [], swapped: [], sorted: [0] });

  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;

    steps.push({
      array: a.slice(),
      compared: [i],
      swapped: [],
      sorted: Array.from({ length: i }, (_, k) => k),
    });

    while (j >= 0) {
      steps.push({
        array: a.slice(),
        compared: [j, j + 1],
        swapped: [],
        sorted: Array.from({ length: i }, (_, k) => k),
      });
      if (a[j] > key) {
        a[j + 1] = a[j];
        steps.push({
          array: a.slice(),
          compared: [j, j + 1],
          swapped: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => k),
        });
        j--;
      } else {
        break;
      }
    }
    a[j + 1] = key;
    steps.push({
      array: a.slice(),
      compared: [],
      swapped: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
    });
  }

  steps.push({
    array: a.slice(),
    compared: [],
    swapped: [],
    sorted: Array.from({ length: n }, (_, k) => k),
  });
  return steps;
}
