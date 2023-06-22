import {ExcelComponents} from '../../core/ExcelComponent'
import {shouldResize} from './table.functions'
import {tableResize} from './table.resize'
import {createTable} from './table.template'

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(20);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResize(this.$root, event)
        }
    }
}