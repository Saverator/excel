import {ExcelComponents} from '../../core/ExcelComponent';

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

        const $input = this.$root.find('[data-type="input-formula"]')

        this.$on('table:input', (text) => {
            $input.text(text)
        })
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        const key = 'Enter'

        if (key === event.key && !event.shiftKey) {
            console.log(key)
            event.preventDefault()

            this.$emit('formula:enter')
        }
    }
}