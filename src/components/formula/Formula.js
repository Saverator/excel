import {ExcelComponents} from '../../core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponents {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div
                class="input"
                contenteditable
                spellcheck="false"
                data-type="input-formula"
            >
            </div>
        `
    }

    init() {
        super.init()

        this.$input = this.$root.find('[data-type="input-formula"]')

        this.$on('table:input', (text) => {
            this.$input.text(text)
        })
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }
}