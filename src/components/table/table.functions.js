import {range} from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    const ids = cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`))
        return acc
    }, [])
    return ids
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0
    const MAX_COL = 25
    const MAX_ROW = 19

    switch (key) {
        case 'Enter':
        case 'NumpadEnter':
        case 'ArrowDown':
            row = (row !== MAX_ROW) ? row + 1 : row
            break
        case 'ArrowUp':
            row = (row !== MIN_VALUE) ? row - 1 : row
            break
        case 'ArrowLeft':
            col = (col !== MIN_VALUE) ? col - 1 : col
            break
        case 'ArrowRight':
        case 'Tab':
            col = (col !== MAX_COL) ? col + 1 : col
            break
    }

    return `[data-id="${row}:${col}"]`
}