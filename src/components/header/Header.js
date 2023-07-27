import {ExcelComponents} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createHeader} from './header.tamplate'
import {changeTableName} from '@/redux/actions'
import {defaultTableName} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponents {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const tableName = this.store.getState().tableName || defaultTableName
        return createHeader(tableName)
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTableName($target.text()))
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.type === 'delete-button') {
            const decision = confirm('Удалить таблицу?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param)
                ActiveRoute.navigate('')
            }
        } else if ($target.data.type === 'exit-button') {
            ActiveRoute.navigate('')
        }
    }
}