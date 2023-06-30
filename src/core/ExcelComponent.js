import {DomListener} from './DomListener';


export class ExcelComponents extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушатели о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // Инициализируем компонент
    // Добавляем DOM слушатели
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach((unsub) => unsub())
    }
}