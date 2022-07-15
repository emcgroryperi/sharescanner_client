import { createApp } from 'vue'
import App from './App.vue'

import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)

app.use(createVuestic({
    config: {
      colors: {
        // Default colors
        primary: '#4D5057',
        secondary: '#002c85',
        success: '#40e583',
        info: '#2c82e0',
        danger: '#e34b4a',
        warning: '#ffc200',
        gray: '#babfc2',
        dark: '#34495e',
        background: '#cfcfcf',
        // Custom colors
        yourCustomColor: '#d0f55d',
      },
    }
  }))

import ShareViewer from "./components/Viewer/ShareViewer";

const Home = { template: '<div>Home</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/viewer', component: ShareViewer },
]


import VueRouter from 'vue-router';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)

app.mount('#app')
