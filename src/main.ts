import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faSortDown, faSortUp, faSearch, faFlagCheckered, faCheck, faPlusSquare, faHome, faPenSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import mitt from 'mitt';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { LocalLocationRepository } from "./location/repositories/LocalLocationRepository"
import { LocalPackageRepository } from "./package/repositories/LocalPackageRepository"
import { LocalEmployeeRepository } from "./employee/repositories/LocalEmployeeRepository"
import { RemoteLocationRepository } from './location/repositories/RemoteLocationRepository'
import { RemotePackageRepository } from './package/repositories/RemotePackageRepository'
import { RemoteEmployeeRepository } from './employee/repositories/RemoteEmployeeRepository'

library.add(faCheckCircle, faSortDown, faSortUp, faSearch, faFlagCheckered, faCheck, faPlusSquare, faHome, faPenSquare, faMinusSquare)

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

//Create a global access points for repo
// app.config.globalProperties.$locationRepo = new LocalLocationRepository();
// app.config.globalProperties.$packageRepo = new LocalPackageRepository();
// app.config.globalProperties.$employeeRepo = new LocalEmployeeRepository();


app.config.globalProperties.$locationRepo = new RemoteLocationRepository();
app.config.globalProperties.$packageRepo = new RemotePackageRepository();
app.config.globalProperties.$employeeRepo = new RemoteEmployeeRepository();

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
