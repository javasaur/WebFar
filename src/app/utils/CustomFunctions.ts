export function getNextIndexOrFirst(arr, nextIndex) {
  return nextIndex >= arr.length ? 0 : nextIndex;
}
