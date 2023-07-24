function toHTML(key) {
    const storage = JSON.parse(localStorage[key])
    const title = storage.tableName
    const link = '#' + key.split(':').join('/')
    const date = new Date(+key.split(':')[1])
    const currentDate = date.getUTCDate()
            + '/'
            + (date.getUTCMonth() + 1)
            + '/'
            + date.getUTCFullYear()

    return `
        <li class="db__record">
            <a href="${link}">${title}</a>
            <strong>${currentDate}</strong>
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
    console.log(keys)

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