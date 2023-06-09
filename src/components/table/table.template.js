const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(_, col) {
        return `
            <div
                class="cell"
                data-col="${col}"
                data-type="cell"
                data-id="${row}:${col}"
                contenteditable>
            </div>
        `
    }
}

function toColumn(col, index) {
    return `
        <div
            class="column"
            data-type="resizable"
            data-col="${index}">
                ${col}
            <div class="col-resize"
                data-resize="col"
                data-resizeid="${index}">
            </div>
        </div>
    `
}

function createRow(content, index = '') {
    const resize = index
        ? `<div class="row-resize"
            data-resize="row">
            </div>`
        : ''

    return `
        <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')


    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')

        rows.push(createRow(cells, row + 1))
    }

    rows.push(createLines())

    return rows.join('')
}