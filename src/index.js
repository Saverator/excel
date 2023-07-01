import {Excel} from './components/excel/Excel'
import './scss/index.scss'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
// import {createStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {Store} from './core/Store'

// const store = createStore(rootReducer)
const store = new Store(rootReducer)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()