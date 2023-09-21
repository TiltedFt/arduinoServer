import { delay } from "../utils";
import { arrayOfPixels } from "../constant/constants";

const animationDelay = 100;

// Zeigt jeden Streifen senkrecht von der Mitte aus
async function showEachStripeFromMiddleVertically(index: number, strip: any) {
  // Geht durch alle Pixel im gegebenen Streifen und setzt deren Farbe
  for (const i of arrayOfPixels[index]) {
    strip.pixel(i).color([20, 2, 0]);
  }
}

// Schaltet jeden Streifen senkrecht von der Mitte aus ab
async function turnOfEachStripeFromMiddle(index: number, strip: any) {
  // Geht durch alle Pixel im gegebenen Streifen und setzt deren Farbe auf Schwarz
  for (const i of arrayOfPixels[index]) {
    strip.pixel(i).color([0, 0, 0]);
  }
}

// Startet die Startanimationsroutine
async function startUpAnimation(strip: any) {
  const arrLength = arrayOfPixels.length;
  const middle = arrLength / 2 - 1;

  // Schaltet die Streifen von der Mitte aus ein
  for (let i = 0; i <= middle; i++) {
    const leftSide = middle - i;
    const rightSide = middle + i;

    if (leftSide >= 0) {
      await showEachStripeFromMiddleVertically(leftSide, strip);
    }

    if (rightSide < arrLength) {
      await showEachStripeFromMiddleVertically(rightSide, strip);
    }

    await strip.show();
    await delay(animationDelay);
  }

  // Schaltet die Streifen von der Mitte aus wieder ab
  for (let i = 0; i <= middle; i++) {
    const leftSide = middle - i;
    const rightSide = middle + i;

    if (leftSide >= 0) {
      await turnOfEachStripeFromMiddle(leftSide, strip);
    }

    if (rightSide < arrLength) {
      await turnOfEachStripeFromMiddle(rightSide, strip);
    }

    await strip.show();
    await delay(animationDelay);
  }
}

export { startUpAnimation };
