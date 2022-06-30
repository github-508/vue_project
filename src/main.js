import {createApp } from "vue";
import * as echarts from 'echarts'
import App from "./App.vue";
import router from "./router";
import store from "./store";
require('../mock/mock.js')
//import qs from 'qs'
//import Antd from "ant-design-vue";
//import "ant-design-vue/dist/antd.css";
import {Button,Menu,Dropdown,Input,Layout,Modal,Pagination,Popover,Checkbox,Select,Steps,Table,Upload,Statistic,Grid,Popconfirm,Card,Spin,Tabs,Tooltip} from "ant-design-vue";

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.config.productionTip = false;
//app.config.globalProperties.$http = axios;
//app.prototype.$axios = axios
//app.prototype.qs = qs 

app.use(Button);
app.use(Menu);
app.use(Dropdown);
app.use(Input);
app.use(Layout);
app.use(Modal);
app.use(Pagination);
app.use(Popover);
app.use(Checkbox);
app.use(Select);
app.use(Steps);
app.use(Table);
app.use(Upload);
app.use(Statistic);
app.use(Grid);
app.use(Popconfirm)
app.use(Card);
app.use(Tabs);
app.use(Spin);
app.use(Tooltip)
app.use(store).use(router).mount("#app");