import {
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLE,
    CHANGE_TABLE_NAME,
    UPDATE_DATE
} from './types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

// value, ids
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTableName(data) {
    return {
        type: CHANGE_TABLE_NAME,
        data
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}