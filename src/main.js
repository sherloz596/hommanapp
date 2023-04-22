import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faDoorClosed, faGear, faBasketShopping,faStar} from '@fortawesome/free-solid-svg-icons'
// import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
// import { faStar } from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faGear,faBasketShopping,faDoorClosed,faStar)
// library.add(faBasketShopping)
// library.add(faDoorClosed)


loadFonts()

//axios.defaults.baseURL = 'http://hommanapi.test/api/'
//axios.defaults.baseURL = 'http://192.168.1.208:8000/api/'
axios.defaults.baseURL = 'http://192.168.1.46:8000/api/'



var token = localStorage.getItem('token')

if(token){
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

createApp(App)
  .use(router)
  .use(vuetify,{iconfont: 'faSvg'})
  .use(VueAxios,axios)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')