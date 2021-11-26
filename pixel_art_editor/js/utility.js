/* eslint-disable no-restricted-syntax */
export function elt(type, props, ...children) {
    let element = document.createElement(type);
    if (props) Object.assign(element, props);
    for (const child of children) {
        if (typeof child !== 'string') element.appendChild(child);
        else element.appendChild(document.createTextNode(child));
    }
    return element;
}

export function updateState(state, action) {
    return Object.assign({}, state, action);
}
