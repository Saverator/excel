import {ExcelComponents} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createHeader} from './header.tamplate'
import {changeTableName} from '@/redux/actions'
import {defaultTableName} from '@/constants'
import {debounce} from '@core/utils'

export class Header extends ExcelComponents {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
}