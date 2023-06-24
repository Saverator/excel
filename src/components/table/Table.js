import {ExcelComponents} from '../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {shouldResize} from './table.functions'
import {shouldSelectCell} from './table.functions'
import {tableResize} from './table.resize'
import {createTable} from './table.template'
import {$} from '@core/dom'

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

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResize(this.$root, event)
        }

        if (shouldSelectCell(event)) {
            const $target = $(event.target)
            this.selection.select($target)
        }
    }
}