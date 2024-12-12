import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import naive from 'naive-ui'// 引入naive-ui（全局安装）
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import { router } from './common/router' // 引入路由
import { createPinia } from 'pinia';// 引入pinia
import axios from 'axios'; // 引入axios
import * as echarts from "echarts";
// Vue.use(ElementUI);

//axios.defaults.baseURL = "http://localhost:8080" // 配置全局路径 以后写/views/xxx就能前面自动补全http://localhost:8080, 8080为服务端server的地址

const app = createApp(App)
// app.use(naive) // 引入naive-ui（全局安装）
app.use(ElementPlus)
app.use(createPinia()) // 引入pinia
app.use(router) // 使用路由
router.beforeEach((to, from, next) => {
    to.meta.title && (document.title = to.meta.title);
    next();
});

app.provide("axios", axios)
app.config.globalProperties.$echarts=echarts;
app.provide("echarts",echarts)
app.mount('#app')
