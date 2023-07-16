export function createHeader(tableName) {
    return `
        <input
            class="input"
            type="text"
            value="${tableName}"
            data-type="table-name"
        />

        <div>

            <div class="button">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    exit_to_app
                </span>
            </div>

        </div>
    `
}