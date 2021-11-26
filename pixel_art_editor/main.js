/* eslint-disable no-restricted-syntax */
class Picture {
    constructor(width, height, pixelsCanvas) {
        this.width = width;
        this.height = height;
        this.pixelsCanvas = pixelsCanvas;
    }

    static empty(width, height, color) {
        const pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }

    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }

    draw(pixels) {
        const copy = this.pixels.slice();
        for (const { x, y, color } of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}
