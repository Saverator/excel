import {$} from '@core/dom'

export function tableResize($root, event) {
    const $horizontalLine = $('[data-type="horizontal-line"]')
    const $verticalLine = $('[data-type="vertical-line"]')
    const $excelTable = $('.excel__table')

    const $resizer = $(event.target)
    const $target = $resizer.closest('[data-type="resizable"]')
    const $targetId = $target.data.col
    const coords = $target.getCoords()

    const startTable = {
        x: $excelTable.getCoords().left,
        y: $excelTable.getCoords().top
    }
    const endCoord = {}

    const $selectedCols = $root.findAll(`[data-col="${$targetId}"]`)

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

        if (clickStatus === 'rowDown') {
            const delta = endCoord.y - coords.bottom
            $target.css({height: delta + 'px'})
        }

        if (clickStatus === 'colDown') {
            $selectedCols.forEach((element) => {
                const delta = endCoord.x - coords.right
                $(element).css({width: delta + 'px'})
            })
        }

        clickStatus = 'up'
    }
}