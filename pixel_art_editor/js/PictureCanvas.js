/* eslint-disable no-use-before-define */
import { elt } from './utility.js';

const scale = 10;

export default class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt('canvas', {
            onmousedown: (event) => this.mouse(event, pointerDown),
            ontouchstart: (event) => this.touch(event, pointerDown),
        });
        this.syncState(picture);
    }

    syncState(picture) {
        if (this.picture === picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }

    mouse(downEvent, onDown) {
        if (downEvent.button !== 0) return;

        let pos = pointerPosition(downEvent, this.dom);
        const onMove = onDown(pos);

        if (!onMove) return;

        const move = (moveEvent) => {
            if (moveEvent.buttons === 0) {
                this.dom.removeEventListener('mousemove', move);
            } else {
                const newPos = pointerPosition(moveEvent, this.dom);
                if (newPos.x === pos.x && newPos.y === pos.y) return;
                pos = newPos;
                onMove(newPos);
            }
        };

        this.dom.addEventListener('mousemove', move);
    }

    touch(startEvent, onDown) {
        let pos = pointerPosition(startEvent.touches[0], this.dom);
        const onMove = onDown(pos);
        startEvent.preventDefault();
        if (!onMove) return;

        const move = (moveEvent) => {
            const newPos = pointerPosition(moveEvent.touches[0], this.dom);
            if (newPos.x === pos.x && newPos.y === pos.y) return;
            pos = newPos;
            onMove(newPos);
        };
        const end = () => {
            this.dom.removeEventListener('touchmove', move);
            this.dom.removeEventListener('touchend', end);
        };
        this.dom.addEventListener('touchmove', move);
        this.dom.addEventListener('touchend', end);
    }
}

function drawPicture(picture, canvas, scaleParam) {
    const currCanvas = canvas;
    currCanvas.width = picture.width * scaleParam;
    currCanvas.height = picture.height * scaleParam;

    const cx = currCanvas.getContext('2d');

    for (let y = 0; y < picture.height; y += 1) {
        for (let x = 0; x < picture.width; x += 1) {
            cx.fillStyle = picture.pixel(x, y);
            cx.fillRect(x * scaleParam, y * scaleParam, scaleParam, scaleParam);
        }
    }
}

function pointerPosition(pos, domNode) {
    const rect = domNode.getBoundingClientRect();

    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale),
    };
}
