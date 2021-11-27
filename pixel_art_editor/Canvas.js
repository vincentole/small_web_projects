/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import { elt } from './utilities.js';

const currScale = 10;

export default class Canvas {
    constructor(picture, pointerDown) {
        // input format: Picture(width, height, pixels), pixels: [color, ...] -> dim: width * height

        this.dom = elt('canvas', {});
        // this.picture; init by syncState;
        this.syncState(picture);
    }

    syncState(picture) {
        // input format: Picture(width, height, pixels), pixels: [color, ...] -> dim: width * height

        if (this.picture === picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, currScale);
    }
}

function drawPicture(picture, canvas, scale) {
    const currCanvas = canvas;
    const cx = currCanvas.getContext('2d');

    currCanvas.width = picture.width * scale;
    currCanvas.height = picture.height * scale;

    for (let y = 0; y < picture.height; y += 1) {
        for (let x = 0; x < picture.width; x += 1) {
            cx.fillStyle = picture.pixel(x, y);
            cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}
