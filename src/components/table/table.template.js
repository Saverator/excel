const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getWidth(colState = {}, index) {
    return (colState[index] || DEFAULT_WIDTH) +'px'
}

function getHeight(rowState = {}, index) {
    return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state, col)
        return `
            <div
                class="cell"
                data-col="${col}"
                data-type="cell"
                data-id="${row}:${col}"
                style="width: ${width}"
                contenteditable
            >
            </div>
        `
    }
}

function toColumn({col, index, width}) {
    return `
        <div
            class="column"
            data-type="resizable"
            data-col="${index}"
            style="width: ${width}"
        >
                ${col}
            <div class="col-resize"
                data-resize="col"
                data-resizeid="${index}">
            </div>
        </div>
    `
}

function createRow(content, index = '', state = {}) {
    const resize = index
        ? `<div class="row-resize"
            data-resize="row">
            </div>`
        : ''

    return `
        <div
            class="row"
            data-type="resizable"
            data-row="${index}"
            style="height: ${getHeight(state, index)}"
        >
            <div class="row-info">
                ${index}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function createLines() {
    return `
        <div class="horizontal-line" data-type="horizontal-line"></div>
        <div class="vertical-line" data-type="vertical-line"></div>
    `
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state.colState, row))
            .join('')

        rows.push(createRow(cells, row + 1, state.rowState))
    }

    rows.push(createLines())

    return rows.join('')
}