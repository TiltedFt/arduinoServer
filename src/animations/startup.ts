import { delay } from "../utils";
import { arrayOfPixels } from "../constant/constants";

const animationDelay = 100;

/**
 * Setzt die Farbe für jeden Pixel in einem bestimmten vertikalen Streifen,
 * beginnend von der Mitte des Streifens.
 *
 * @param index - Index des Streifens in arrayOfPixels
 * @param strip - Das Pixel-Strip-Objekt
 */
async function showEachStripeFromMiddleVertically(index: number, strip: any) {
  // Nimmt jeden Pixel aus der Liste und weißt ihm die Farbe Pink zu
  for (const i of arrayOfPixels[index]) {
    strip.pixel(i).color([20, 5, 5]);
  }
}

/**
 * Setzt die Farbe für jeden Pixel in einem bestimmten vertikalen Streifen auf Schwarz,
 * beginnend von der Mitte des Streifens.
 *
 * @param index - Index des Streifens in arrayOfPixels
 * @param strip - Das Pixel-Strip-Objekt
 */
async function turnOfEachStripeFromMiddle(index: number, strip: any) {
  for (const i of arrayOfPixels[index]) {
    strip.pixel(i).color([0, 0, 0]);
  }
}

/**
 * Führt die Startanimation für den Pixel-Strip aus. Zuerst werden die Streifen von der Mitte aus eingeschaltet,
 * dann von der Mitte aus ausgeschaltet.
 *
 * @param strip - Das Pixel-Strip-Objekt
 */
async function startUpAnimation(strip: any) {
  const arrLength = arrayOfPixels.length;
  const middle = arrLength / 2 - 1;

  let leftSide = middle;
  let rightSide = middle;

  // Schaltet die Streifen von der Mitte aus ein
  for (let i = 0; i <= middle; i++) {
    // Spezialfall für den mittleren Streifen
    if (leftSide === 7 && rightSide === 7) {
      await showEachStripeFromMiddleVertically(leftSide, strip);
    }

    leftSide -= 1;
    rightSide += 1;

    if (leftSide >= 0) {
      await showEachStripeFromMiddleVertically(leftSide, strip);
    }

    if (rightSide < arrLength) {
      await showEachStripeFromMiddleVertically(rightSide, strip);
    }

    strip.show();
    await delay(animationDelay);
  }

  leftSide = middle;
  rightSide = middle;

  // Schaltet die Streifen von der Mitte aus wieder ab
  for (let i = 0; i <= middle; i++) {
    // Spezialfall für den mittleren Streifen
    if (leftSide === 7 && rightSide === 7) {
      await turnOfEachStripeFromMiddle(leftSide, strip);
    }

    leftSide -= 1;
    rightSide += 1;

    if (leftSide >= 0) {
      await turnOfEachStripeFromMiddle(leftSide, strip);
    }

    if (rightSide < arrLength) {
      await turnOfEachStripeFromMiddle(rightSide, strip);
    }

    strip.show();
    await delay(animationDelay);
  }
}

export { startUpAnimation };
