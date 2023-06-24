export class TableSelection {
    constructor() {
        this.group = []
        this.selectClassName = 'selected'
    }

    select($el) {
        this.group.push($el)
        if (this.group.length > 1) {
            this.group[this.group.length - 2].removeClass(this.selectClassName)
        }
        $el.addClass(this.selectClassName)
    }

    selectGroup() {

    }
}