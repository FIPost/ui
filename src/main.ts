import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faSortDown,faSortUp, faSearch, faFlagCheckered, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle, faSortDown, faSortUp, faSearch, faFlagCheckered, faCheck)

createApp(App).
use(router).
component('font-awesome-icon', FontAwesomeIcon).
mount('#app')
