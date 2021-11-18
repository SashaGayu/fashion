/*
  Manage indexes in slider-like loop
*/

export function goNext (ind, l) {
  return (ind + 1) % l
}

export function goPrev (ind, l) {
  return (ind - 1 + l) % l
}
