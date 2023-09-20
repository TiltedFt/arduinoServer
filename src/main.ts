// This example shows how to use node-pixel using Johnny Five as the
// hook for the board.
import { Board } from "johnny-five";
const pixel = require("node-pixel");

const board = new Board({ port: "/dev/tty.usbmodem101" });
let strip: any = null;

const fps = 1; // how many frames per second do you want to try?

board.on("ready", function () {
  console.log("Board ready, lets add light");

  strip = new pixel.Strip({
    data: 8,
    length: 216,
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: "FIRMATA",
  });

  strip.on("ready", async function () {
    console.log("Strip ready, let's go");
    for (let i = 0; i < 216; i++) {
      strip.pixel(i).color([11, 11, 11]);
    }
    strip.show();
  });
});
