import {ExcelComponents} from '../../core/ExcelComponent';
import {tableResize} from './table.resize';
import {createTable} from './table.template';
// import {$} from '@core/dom'

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
        if (event.target.dataset.resize) {
            tableResize(this.$root, event)
        }
    }
}