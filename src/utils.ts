// Überprüft, ob der gegebene RGB-Wert außerhalb des gültigen Bereichs von 0 bis 255 liegt
function isRGBValueNotValid(value: number) {
  return value < 0 || value > 255;
}

// Erzeugt eine Verzögerung (Pause) für die angegebene Anzahl von Millisekunden
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { isRGBValueNotValid, delay };
