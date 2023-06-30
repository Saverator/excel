import {ExcelComponents} from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponents {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="button">
                <span class="material-symbols-outlined">
                    format_align_left
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    format_align_center
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    format_align_right
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    format_bold
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    format_italic
                </span>
            </div>

            <div class="button">
                <span class="material-symbols-outlined">
                    format_underlined
                </span>
            </div>
        `
    }

    onClick(event) {
        console.log(event.target)
    }
}