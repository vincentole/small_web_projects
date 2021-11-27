/* eslint-disable import/extensions */
import Picture from './Picture.js';
import PixelEditor from './PixelEditor.js';
import ToolSelect from './ToolSelect.js';
import ColorSelect from './ColorSelect.js';
// eslint-disable-next-line object-curly-newline
import { draw, fill, rectangle, pick } from './tools.js';
import { updateState } from './utilities.js';

let state = {
    tool: 'draw',
    color: '#000000',
    picture: Picture.empty(60, 30, '#f0f0f0'),
};

const app = new PixelEditor(state, {
    tools: {
        draw,
        fill,
        rectangle,
        pick,
    },
    controls: [ToolSelect, ColorSelect],
    dispatch(action) {
        state = updateState(state, action);
        app.syncState(state);
    },
});

document.querySelector('#app').appendChild(app.dom);
