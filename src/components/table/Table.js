import {ExcelComponents} from '../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {tableResize} from './table.resize'
import {createTable} from './table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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

        this.$on('formula:input', (text) => {
            this.selection.current.text(text)
        })

        this.$on('formula:enter', () => {
            this.selection.select(this.selection.current)

            const range = document.createRange();
            range.selectNodeContents(this.selection.current.$el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            tableResize(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)

                const text = $target.text()
                this.$emit('table:input', text)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'NumpadEnter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ]
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = nextSelector(key, this.selection.current.id(true))
            const $nextCell = this.$root.find(id)
            this.selection.select($nextCell)

            const text = $nextCell.text()
            this.$emit('table:input', text)
        }
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit('table:input', text)
    }
}