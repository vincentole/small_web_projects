/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import Canvas from './Canvas.js';
import { elt } from './utilities.js';

export default class PixelEditor {
    constructor(state, config) {
        // input format:
        // state:  { tool: "draw", color: "#000", picture: Picture(width, height, pixels))}
        // config: { tools: {draw, fill, ...},
        //           controls: [ToolSelect, ColorSelect],
        //           dispatch(action) { state = updateState(state, action); app.syncState(state); }

        const { tools, controls, dispatch } = config;
        this.state = state;
        this.canvas = new Canvas(state.picture);
        this.controls = controls.map((Control) => new Control(state, config));
        this.dom = elt(
            'div',
            {},
            this.canvas.dom,
            elt('br'),
            ...this.controls.reduce((cum, element) => cum.concat(' ', element.dom), []),
        );
    }

    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (const ctrl of this.controls) ctrl.syncState(state);
    }
}
