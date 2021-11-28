/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import { elt } from './utilities.js';

const currScale = 10;

export default class Canvas {
    constructor(picture, pointerDown) {
        // input format: Picture(width, height, pixels), pixels: [color, ...] -> dim: width * height
        // input format: pointerDown: pos => tool = tools[this.state.tool],
        //                            onMove = tools(pos, this.state, dispatch),
        //                            if (onMove) return pos => onMove(pos, this.state);
        this.dom = elt('canvas', {
            onmousedown: (event) => this.mouseDown(event, pointerDown),
            ontouchstart: (event) => this.touchStart(event, pointerDown),
        });
        // this.picture; init by syncState;
        this.syncState(picture);
    }

    syncState(picture) {
        // input format: Picture(width, height, pixels), pixels: [color, ...] -> dim: width * height

        if (this.picture === picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, currScale);
    }

    mouseDown(event, pointerDown) {
        if (event.button !== 0) return;
        let pos = pointerPosition(event, this.dom);
        if (!pointerDown(pos)) return; // Not sure what this is for ...

        const move = (moveEvent) => {
            if (moveEvent.buttons === 0) {
                this.dom.removeEventListener('mousemove', move);
            } else {
                const newPos = pointerPosition(moveEvent, this.dom);
                if (newPos.x === pos.x && newPos.y === pos.y) return;
                pos = newPos;
                pointerDown(newPos);
            }
        };

        this.dom.addEventListener('mousemove', move);
    }

    touchStart(event, pointerDown) {
        let pos = pointerPosition(event.touches[0], this.dom);
        event.preventDefault();

        if (!pointerDown(pos)) return; // Not sure what this is for ...

        const move = (moveEvent) => {
            const newPos = pointerPosition(moveEvent.touches[0], this.dom);
            if (newPos.x === pos.x && newPos.y === pos.y) return;
            pos = newPos;
            pointerDown(newPos);
        };

        const end = () => {
            this.dom.removeEventListener('touchmove', move);
            this.dom.removeEventListener('touchedn', end);
        };

        this.dom.addEventListener('touchmove', move);
        this.dom.addEventListener('touchend', end);
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

function pointerPosition(event, domNode) {
    const rect = domNode.getBoundingClientRect(); // returns obj of element pos relative to viewport
    return {
        // MouseEvent.clientX/Y return pos of mouse relative to viewport
        x: Math.floor((event.clientX - rect.left) / currScale),
        y: Math.floor((event.clientY - rect.top) / currScale),
    };
}
