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
        if (event.target.dataset.type === 'delete-button') {
            const key = ActiveRoute.path.split('/').join(':')
            localStorage.removeItem(key);
            window.location.replace('/')
        } else if (event.target.dataset.type === 'exit-button') {
            window.location.replace('/')
        }
    }
}