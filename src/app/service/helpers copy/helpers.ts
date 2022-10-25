export function refactorDropdownArray(array, label, value) {
  let newArray = [];
  array.forEach(element => {
    newArray.push({ label: element[label], value: element[value] });
  });
  return newArray;
}
