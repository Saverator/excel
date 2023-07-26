import {defaultStyles, defaultTableName} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defaultTableName,
    currentStyles: defaultStyles,
    dateOpen: new Date().toJSON()
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}