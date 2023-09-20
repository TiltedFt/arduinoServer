import { Board } from "johnny-five";
const pixel = require("node-pixel");
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { returnRandomRGBValue } from "./randomizer";
import { checkIfNumber, isRGBValueNotValid } from "./utils";
import { arrayOfPixels, pixels } from "./constant/heart";
const board = new Board({ port: "/dev/tty.usbmodem101" });
let strip: any = null;

board.on("ready", function () {
  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    // pin = data pin
    strips: [{ pin: 8, length: 256 }],
    gamma: 1.0, // standart gamm von WS2812
  });

  strip.on("ready", async function () {
    console.log("Strip ready, let's go");
    // clean everything
    for (const i of pixels) {
      strip.pixel(i).color([0, 0, 0]);
    }
    strip.show();
    await delay(1000);
    for (const arrPixel of arrayOfPixels) {
      for (const pixel of arrPixel) {
        strip.pixel(pixel).color([30, 30, 0]);
        strip.show();
        await delay(20);
      }
      for (const pixel of arrPixel) {
        strip.pixel(pixel).color([0, 0, 0]);
        strip.show();
        await delay(20);

      }
    }
  });
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/led", (req: Request, res: Response) => {
  const { position, r, g, b } = req.body;

  if (isNaN(position) || isNaN(r) || isNaN(g) || isNaN(b)) {
    return res.status(400).send("All values must be numbers");
  }
  if (isRGBValueNotValid(r) || isRGBValueNotValid(g) || isRGBValueNotValid(b)) {
    return res.status(400).send("RGB can only be between 0 and 255");
  }


  strip.pixel(position).color([r, g, b]);
  strip.show();

  return res.status(201).send("OK");
});

app.delete("/clean", (req: Request, res: Response) => {
  for (const index of pixels) {
    strip.pixel(index).color([0, 0, 0]);
  }
  strip.show();
  return res.send("OK");
});

app.post("/random", (req: Request, res: Response) => {
  randomEverything(strip);
  return res.send("OK");
});

function randomEverything(strip: any) {
  for (let i = 0; i < 216; i++) {
    strip.pixel(i).color([returnRandomRGBValue(), returnRandomRGBValue(), returnRandomRGBValue()]);
  }
  strip.show();
}

app.post('/whole',async (req: Request, res: Response) => {
  for(const i of pixels) {
    strip.pixel(i).color([0, 100, 100])
    strip.show()
    await delay(100);
    strip.pixel(i).color([0, 0, 0])
  }
  return res.send('OK')
})
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}




app.listen(port, () => {
  console.log(`Express hört den Port: ${port} zu`);
});
