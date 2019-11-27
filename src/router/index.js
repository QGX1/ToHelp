import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import DetailHome from "../views/detailHome.vue";
import PathMap from "../views/pathMap.vue";
import Calendar from "../views/calendar.vue";
import News from "../views/news.vue";
import Mine from "../views/mine.vue";
import Login from "../views/login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home/detailHome",
    name: "detailHome",
    component: DetailHome,
    meta:{
      showFooter:false
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta:{
      showFooter:true
    }
  },
  {
    path: "/pathMap",
    name: "pathMap",
    component: PathMap,
    meta:{
      showFooter:false
    }
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    meta:{
      showFooter:true
    }
  },
  {
    path: "/news",
    name: "news",
    component: News,
    meta:{
      showFooter:true
    }
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
    meta:{
      showFooter:true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
