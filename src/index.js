import {Excel} from './components/excel/Excel'
import './scss/index.scss'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
// import {createStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {Store} from './core/Store'
import {storage} from './core/utils'

// const store = createStore(rootReducer, {
//     tableTitle: 'My Table excel'
// })
const store = new Store(rootReducer, storage('excel-state'))

store.subscribe((state) => {
    console.log('App state: ', state)
    storage('excel-state', state)
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()