import Vue from 'vue'
import App from './App'
import Chat from './common/im/im.js'
Vue.config.productionTip = false

function toast(text){
	uni.showToast({
		icon:'none',
		title:text
	})
}
Vue.prototype.$chat = new Chat()
Vue.prototype.$toast = toast
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
