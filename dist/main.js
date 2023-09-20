"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const pixel = require("node-pixel");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const randomizer_1 = require("./randomizer");
const utils_1 = require("./utils");
const board = new johnny_five_1.Board({ port: "/dev/tty.usbmodem101" });
let strip = null;
board.on("ready", function () {
    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        // Leider schafft der Arduino nur 216 Pixel
        // pin = data pin
        strips: [{ pin: 8, length: 216 }],
        gamma: 2.8, // standart gamm von WS2812
    });
    strip.on("ready", function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Strip ready, let's go");
            for (let i = 0; i < 216; i++) {
                strip.pixel(i).color([0, 0, 0]);
            }
            strip.show();
        });
    });
});
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.post("/led", (req, res) => {
    const { position, r, g, b } = req.body;
    if (!(0, utils_1.checkIfNumber)(position) || !(0, utils_1.checkIfNumber)(r) || !(0, utils_1.checkIfNumber)(g) || !(0, utils_1.checkIfNumber)(b)) {
        res.status(400).send("All values must be numbers");
    }
    if (!(0, utils_1.isRGBValueValid)(r) || !(0, utils_1.isRGBValueValid)(g) || !(0, utils_1.isRGBValueValid)(b)) {
        res.status(400).send("RGB can only be between 28 and 255");
    }
    strip.pixel(position).color([r, g, b]);
    strip.show();
    res.send("OK");
});
app.delete("/clean", (req, res) => {
    for (let i = 0; i < 216; i++) {
        strip.pixel(i).color([0, 0, 0]);
    }
    strip.show();
    res.send("OK");
});
app.post("/random", (req, res) => {
    randomEverything(strip);
    res.send("OK");
});
function randomEverything(strip) {
    for (let i = 0; i < 216; i++) {
        strip.pixel(i).color([(0, randomizer_1.returnRandomRGBValue)(), (0, randomizer_1.returnRandomRGBValue)(), (0, randomizer_1.returnRandomRGBValue)()]);
    }
    strip.show();
}
app.listen(port, () => {
    console.log(`Express hört den Port: ${port} zu`);
});
//# sourceMappingURL=main.js.map