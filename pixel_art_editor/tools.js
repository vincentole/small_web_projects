/* eslint-disable no-restricted-syntax */
export function draw(pos, state, dispatch) {
    function drawPixel({ x, y }, state) {
        const drawn = { x, y, color: state.color };
        dispatch({ picture: state.picture.draw([drawn]) });
    }
    drawPixel(pos, state);
    return drawPixel;
}

const around = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
];

export function fill({ x, y }, state, dispatch) {
    const targetColor = state.picture.pixel(x, y);
    const drawn = [{ x, y, color: state.color }];

    for (let done = 0; done < drawn.length; done += 1) {
        for (const { dx, dy } of around) {
            const x = drawn[done].x + dx;
            const y = drawn[done].y + dy;
            if (
                x >= 0
                && x < state.picture.width
                && y >= 0
                && y < state.picture.height
                && state.picture.pixel(x, y) === targetColor
                && !drawn.some((p) => p.x === x && p.y === y)
            ) {
                drawn.push({ x, y, color: state.color });
            }
        }
    }

    dispatch({ picture: state.picture.draw(drawn) });
}

export function pick(pos, state, dispatch) {
    dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}
