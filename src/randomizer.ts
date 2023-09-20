function returnRandomRGBValue() {
  return Math.floor(Math.random() * 256);
}

function returnRandomPostionFromRange(range: number) {
  return Math.floor(Math.random() * range);
}

export { returnRandomRGBValue, returnRandomPostionFromRange };
