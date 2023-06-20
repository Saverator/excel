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
        this.$excelTable = ''
        this.$horizontalLine = ''
        this.$verticalLine = ''
        this.$selectedCols = ''
    }

    toHTML() {
        return createTable(20);
    }

    onMousedown(event) {
        this.$horizontalLine = $('[data-type="horizontal-line"]').$el
        this.$verticalLine = $('[data-type="vertical-line"]').$el
        this.$excelTable = $('.excel__table')

        if (event.target.dataset.resize) {
            if (event.target.dataset.resize === 'row') {
                this.clickStatus = 'rowDown'
            } else if (event.target.dataset.resize === 'col') {
                this.clickStatus = 'colDown'
            }

            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            this.startTable.x = this.$excelTable.getCoords().left
            this.startTable.y = this.$excelTable.getCoords().top

            this.$target = $parent.$el
            this.$targetId = $parent.data.col

            this.startCoord.y = coords.bottom
            this.startCoord.x = coords.right
            this.height = coords.height
            this.width = coords.width

            this.$selectedCols = this.$root
                .findAll(`[data-col="${this.$targetId}"]`)
        }
    }

    onMouseup() {
        this.$horizontalLine.style.top = '-10px'
        this.$verticalLine.style.left = '-10px'

        if (this.clickStatus === 'rowDown') {
            const delta = this.endCoord.y - this.startCoord.y
            this.$target.style.height = delta + 'px'
        }

        if (this.clickStatus === 'colDown') {
            this.$selectedCols.forEach((element) => {
                element.style.width = this.endCoord.x - this.startCoord.x + 'px'
            })
        }

        this.clickStatus = 'up'
    }

    onMousemove(event) {
        if (this.clickStatus === 'rowDown') {
            this.endCoord.y = event.pageY + this.height
            this.$horizontalLine.style.top =
                this.$excelTable.$el.scrollTop +
                this.endCoord.y -
                this.startTable.y -
                this.height + 'px'
        }

        if (this.clickStatus === 'colDown') {
            this.endCoord.x = event.clientX + this.width
            this.$verticalLine.style.left =
                this.$excelTable.$el.scrollLeft +
                this.endCoord.x -
                this.width + 'px'
        }
    }
}