import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faSortDown, faSortUp, faSearch, faFlagCheckered, faCheck, faPlusSquare, faHome, faPenSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mitt from 'mitt';

library.add(faCheckCircle, faSortDown, faSortUp, faSearch, faFlagCheckered, faCheck, faPlusSquare, faHome, faPenSquare, faMinusSquare)

const app = createApp(App);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
