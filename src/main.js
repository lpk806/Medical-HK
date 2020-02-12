import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "jquery"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRoute,faBookMedical, faStethoscope, faNotesMedical, faWalking, faBed} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'
import * as Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

library.add(faRoute)
library.add(faBookMedical)
library.add(faStethoscope)
library.add(faNotesMedical)
library.add(faWalking)
library.add(faBed)
Vue.use(Vue2Leaflet)
Vue.use(L);

Vue.use(VueAnalytics, {
  id: 'G-HXLSHFGF6Q',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})

/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  Vue2Leaflet,
  L,
  render: h => h(App)
}).$mount('#app')
