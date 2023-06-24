export function shouldResize(event) {
    return event.target.dataset.resize
}

export function shouldSelectCell(event) {
    return event.target.dataset.id
}