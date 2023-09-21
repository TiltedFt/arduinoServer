import { Board } from "johnny-five";
const pixel = require("node-pixel");
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { isRGBValueNotValid } from "./utils";
import { startUpAnimation } from "./animations/startup";
import path from "path";

let strip: any = null;

// ls /dev/tty* - mac Ports

// Initialisierung des Boards
const board = new Board({ port: "/dev/tty.usbmodem101" });

// Event, das aufgerufen wird, wenn das Board bereit ist
board.on("ready", function () {
  // LED-Streifen Initialisierung
  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    strips: [{ pin: 8, length: 256 }],
    gamma: 2.0,
  });

  // Event, das aufgerufen wird, wenn der LED-Streifen bereit ist
  strip.on("ready", async function () {
    console.log("Strip ready, let's go");
    strip.off(); // Schaltet den LED-Streifen aus

    // Startet die Startanimation
    startUpAnimation(strip);
  });
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint zum Ändern der LED-Farbe an einer bestimmten Position
app.post("/led", (req: Request, res: Response) => {
  const { position, r, g, b } = req.body;

  // Überprüft, ob die Werte Zahlen sind
  if (isNaN(position) || isNaN(r) || isNaN(g) || isNaN(b)) {
    return res.status(400).send("All values must be numbers");
  }

  // Überprüft, ob die RGB-Werte im gültigen Bereich liegen
  if (isRGBValueNotValid(r) || isRGBValueNotValid(g) || isRGBValueNotValid(b)) {
    return res.status(400).send("RGB can only be between 0 and 255");
  }

  // Setzt die Farbe für das Pixel an der gegebenen Position
  strip.pixel(position).color([r, g, b]);
  strip.show();

  return res.status(201).send("OK");
});

// Endpoint zum Ausschalten aller LEDs
app.delete("/clean", (req: Request, res: Response) => {
  strip.off(); // Schaltet den LED-Streifen aus
  return res.send("OK");
});

app.use(express.static(path.join(__dirname, "public")));

// Startet den Express-Server
app.listen(port, () => {
  console.log(`Express hört den Port: ${port} zu`);
});
