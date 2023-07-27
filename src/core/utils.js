export function capitalize(string) {
    if (typeof string != 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function nextSelector(event, key, {row, col}) {
    const MIN_VALUE = 0

    switch (key) {
        case 'Enter':
        case 'NumpadEnter':
        case 'ArrowDown':
            row = (row !== 19) ? row + 1 : row
            break
        case 'ArrowUp':
            row = (row !== MIN_VALUE) ? row - 1 : row
            break
        case 'ArrowLeft':
            col = (col !== MIN_VALUE) ? col - 1 : col
            break
        case 'ArrowRight':
        case 'Tab':
            if (event.shiftKey) {
                col = (col !== MIN_VALUE) ? col - 1 : col
                break
            }
            col = (col !== 25) ? col + 1 : col
            break
    }

    return `[data-id="${row}:${col}"]`
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
            .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
            .join(';')
}

export function debounce(fn, wait) {
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function preventDefault(event) {
    event.preventDefault()
}