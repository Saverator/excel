import {$} from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        const $horizontalLine = $('[data-type="horizontal-line"]')
        const $verticalLine = $('[data-type="vertical-line"]')
        const $excelTable = $('.excel__table')

        const $resizer = $(event.target)
        const $target = $resizer.closest('[data-type="resizable"]')
        const targetId = $target.data.col
        const rowId = $target.data.row
        const coords = $target.getCoords()
        let type

        const startTable = {
            x: $excelTable.getCoords().left,
            y: $excelTable.getCoords().top
        }
        const endCoord = {}

        const $selectedCols = $root.findAll(`[data-col="${targetId}"]`)

        let clickStatus = 'up'

        if (event.target.dataset.resize === 'row') {
            clickStatus = 'rowDown'
        } else if (event.target.dataset.resize === 'col') {
            clickStatus = 'colDown'
        }

        document.onmousemove = (event) => {
            if (clickStatus === 'rowDown') {
                endCoord.y = event.pageY + coords.height
                $horizontalLine.css({
                    top: $excelTable.$el.scrollTop +
                        endCoord.y -
                        startTable.y -
                        coords.height + 'px'
                })
            } else if (clickStatus === 'colDown') {
                endCoord.x = event.clientX + coords.width
                $verticalLine.css({
                    left: $excelTable.$el.scrollLeft +
                        endCoord.x -
                        coords.width + 'px'
                })
            }
        }

        document.onmouseup = () => {
            $horizontalLine.css({top: '-10px'})
            $verticalLine.css({left: '-10px'})
            let delta

            if (clickStatus === 'rowDown') {
                delta = endCoord.y - coords.bottom
                $target.css({height: delta + 'px'})
                type = 'row'
            }

            if (clickStatus === 'colDown') {
                $selectedCols.forEach((element) => {
                    delta = endCoord.x - coords.right
                    $(element).css({width: delta + 'px'})
                    type = 'col'
                })
            }

            resolve({
                value: delta,
                type,
                id: clickStatus === 'colDown' ? targetId : rowId
            })

            clickStatus = 'up'
        }
    })
}