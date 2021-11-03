import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './routers'
// 状态管理
import { store } from './store'
// 全局样式
import "styles/index.scss"
import "./static/iconfont.css"
// v-md-editor
import vmdeditor from 'plugins/mdeditor.js'
// naive-ui
import naive from 'plugins/naive.js'
import * as api from "utils/api";
import { useMessage } from 'naive-ui'
import moment from "moment";


const message = useMessage();
const app =  createApp(App)
app.use(router)
app.use(store)
app.use(vmdeditor)
app.use(naive)
app.config.globalProperties.$http = api;
app.config.globalProperties.$message = message;
app.config.globalProperties.$router = router;
app.config.globalProperties.$moment = moment;

app.mount('#app')
