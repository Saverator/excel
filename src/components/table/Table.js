import {ExcelComponents} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mousemove', 'mouseup']
        })

        this.clickStatus = ''
        this.startCoord = {}
        this.endCoord = {}
        this.$target = ''
        this.$targetId = ''
        this.width = 0
        this.height = 0
        this.startTable = {}
        this.$horizontalLine = ''
        this.$verticalLine = ''
    }

    toHTML() {
        return createTable(20);
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            if (event.target.dataset.resize === 'row') {
                this.clickStatus = 'rowDown'
            } else if (event.target.dataset.resize === 'col') {
                this.clickStatus = 'colDown'
            }

            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const $excelTable = $('.excel__table')
            console.log($excelTable)

            this.startTable.x = $excelTable.getCoords().left
            this.startTable.y = $excelTable.getCoords().top
            this.$horizontalLine = $('[data-type="horizontal-line"]').$el
            this.$verticalLine = $('[data-type="vertical-line"]').$el

            this.$target = $parent.$el
            this.$targetId = this.$target.dataset.id

            this.startCoord.y = coords.bottom
            this.startCoord.x = coords.right
            this.height = coords.height
            this.width = coords.width

            document.onmouseup = () => {
                this.$horizontalLine.style.top = '-10px'
                this.$verticalLine.style.left = '-10px'
            }
        }
    }

    onMouseup() {
        this.clickStatus = 'up'
    }

    onMousemove(event) {
        if (this.clickStatus === 'rowDown') {
            this.endCoord.y = event.pageY + this.height
            const delta = this.endCoord.y - this.startCoord.y
            this.$target.style.height = delta + 'px'

            this.$horizontalLine.style.top =
                this.endCoord.y - this.startTable.y - this.height + 'px'
        }

        if (this.clickStatus === 'colDown') {
            const selectedCols = document
                .querySelectorAll(`[data-id="${this.$targetId}"]`)

            this.endCoord.x = event.clientX + this.width

            selectedCols.forEach((element) => {
                element.style.width = this.endCoord.x - this.startCoord.x + 'px'
            })

            this.$verticalLine.style.left =
                this.endCoord.x - this.width + 'px'
        }
    }
}