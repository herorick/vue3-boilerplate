import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerLayouts } from './layouts/register'

import registerGlobalComponents from './plugins/global-components'
import setAuthorizationToken from './plugins/set-authorization-token'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

setAuthorizationToken()
registerGlobalComponents(app)
registerLayouts(app)

app.mount('#app')
