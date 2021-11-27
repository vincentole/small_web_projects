/* eslint-disable no-restricted-syntax */
export function updateState(state, action) {
    return { ...state, ...action };
}

export function elt(type, props, ...children) {
    // input format: "div", {onclick: func(), ...}, elt()

    const dom = document.createElement(type);
    if (props) Object.assign(dom, props);
    for (const child of children) {
        if (typeof child !== 'string') dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
}
