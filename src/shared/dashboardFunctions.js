import {storage} from '@core/utils'

function toHTML(key) {
    const model = storage(key)
    const link = '#' + key.split(':').join('/')
    const date = new Date(model.dateOpen).toLocaleDateString()
        + ' '
        + new Date(model.dateOpen).toLocaleTimeString()

    return `
        <li class="db__record">
            <a href="${link}">${model.tableName}</a>
            <strong>${date}</strong>
        </li>
    `
}

// excel:123123
function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }

    return keys
}

 export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>Не создано ни одной таблицы</p>`
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
 }