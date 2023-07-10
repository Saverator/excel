import {ExcelComponents} from '../../core/ExcelComponent'
import {TableSelection} from './TableSelection'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {resizeHandler} from './table.resize'
import {createTable} from './table.template'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'

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
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', (text) => {
            this.selection.current.text(text)
            this.updateTextInStore(text)
        })

        this.$on('formula:enter', () => {
            this.selection.current.focus()

            const range = document.createRange();
            range.selectNodeContents(this.selection.current.$el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell.text())
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error ', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($nextCell)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}