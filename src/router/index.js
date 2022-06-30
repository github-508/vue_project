import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index'
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import DataSrc from "../components/DataSrc.vue";
import Upload from "../components/Upload.vue";
import Notthing from "../components/Notthing.vue";
import WorkSheet from "../components/WorkSheet.vue"
import ProcessPlatform from "../components/ProcessPlatform.vue"
import Visual from "../components/Visual.vue"
import StatisticsRoom from "../components/StatisticsRoom.vue"
import ModelLibrary from "../components/ModelLibrary.vue"
import Report from "../components/Report.vue"
import ForgetPassword from "../components/ForgetPassword.vue"
import Register from "../components/Register.vue"


const routes = [
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Index",
    name: "Index",
    component: Index,
    children: [
      {
        path: "/Index",
        name: "Index",
        components:{
          Index,
        },
      },
      {
        path: "/DataSrc",
        name: "DataSrc",
        components: {
          content: DataSrc,
        },
      },
      {
        path: "/WorkSheet",
        name: "WorkSheet",
        components: {
          content: WorkSheet,
        },
      },
      {
        path: "/ProcessPlatform",
        name: "ProcessPlatform",
        components: {
          content: ProcessPlatform,
        },
      },
      {
        path: "/Visual",
        name: "Visual",
        components: {
          content: Visual,
        },
      },
      {
        path: "/StatisticsRoom",
        name: "StatisticsRoom",
        components: {
          content: StatisticsRoom,
        },
      },
      {
        path: "/ModelLibrary",
        name: "ModelLibrary",
        components: {
          content: ModelLibrary,
        },
      },
      {
        path: "/Report",
        name: "Report",
        components: {
          content:Report,
        },
      },
      {
        path: "/DataSrc/Upload",
        name: "Upload",
        components: {
          content: Upload,
        },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Notthing",
        components: {
          content: Notthing,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == '/Login' || to.path == '/Register') {
    next();
  } else {
    // 是否在登录状态下
    //next();
    store.state.loginFlag == 1 ? next() : next('/Login');
  }
});

export default router;
