function isRGBValueNotValid(value: number) {
  return value < 0 || value > 255;
}

function checkIfNumber(value: any) {
  const num = Number(value);
  
  return !isNaN(num);
}
export { isRGBValueNotValid, checkIfNumber };
