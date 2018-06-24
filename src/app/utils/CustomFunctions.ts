export function getNextIndexOrFirst(arr, nextIndex) {
  return nextIndex >= arr.length ? 0 : nextIndex;
}

export function getState(store: any) {
  let _state;
  store.take(1).subscribe(state => _state = state);
  return _state;
}
