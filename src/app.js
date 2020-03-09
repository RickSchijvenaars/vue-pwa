import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

if ('serviceWorker' in navigator) { //navigator object contains info about browser
    navigator.serviceWorker.register('sw.js')
        .then(swRegistration => {
            console.log(swRegistration)
        })
        .catch(error => {
            console.log('Error', error)
        })
}