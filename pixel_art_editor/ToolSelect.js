/* eslint-disable import/extensions */
import { elt } from './utilities.js';

export default class ToolSelect {
    constructor(state, { tools, dispatch }) {
        this.select = elt(
            'select',
            { onchange: () => dispatch({ tool: this.select.value }) },
            ...Object.keys(tools).map((tool) => elt('option', { selected: state.tool === tool }, tool)),
        );
        this.dom = elt('label', null, '🖌 Tool: ', this.select);
    }

    syncState(state) {
        // select value property changes selected option
        this.select.value = state.tool;
    }
}
