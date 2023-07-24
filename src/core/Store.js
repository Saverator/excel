export class Store {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: '__INIT__'})
        this.listeners = []
        this.rootReducer = rootReducer
    }

    subscribe(fn) {
        this.listeners.push(fn)

        const unsubscribe = () => {
            this.listeners = this.listeners.filter((l) => l !== fn)
        }

        return {
            unsubscribe
        }
    }

    dispatch(action) {
        this.state = this.rootReducer(this.state, action)
        this.listeners.forEach((listener) => listener(this.state))
    }

    getState() {
        return JSON.parse(JSON.stringify(this.state))
    }
}