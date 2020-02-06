import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import DetailHome from "../views/detailHome.vue";
import PathMap from "../views/pathMap.vue";
import Calendar from "../views/calendar.vue";
import ClockIn from "../views/clockIn.vue";
import Dynamic from "../views/dynamic.vue";
import WriteDynamic from "../views/writeDynamic.vue";
import News from "../views/news.vue";
import Mine from "../views/mine.vue";
import MineDynamic from "../views/mineDynamic.vue";
import UpdateInfo from "../views/updateInfo.vue";
import UpdateUserName from "../views/updateUserName.vue";
import Login from "../views/login.vue";
import store from "../store/index";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // scrollBehavior:(to, from, savedPosition) => {

  //   if (savedPosition) {
   
  //    // savedPosition is only available for popstate navigations.
   
  //    return savedPosition
   
  //   } else {
   
  //    const position = {}
   
  //    // new navigation.
   
  //    // scroll to anchor by returning the selector
   
  //    if (to.hash) {
   
  //     position.selector = to.hash
   
  //    }
   
  //    // check if any matched route config has meta that requires scrolling to top
   
  //    if (to.matched.some(m => m.meta.scrollToTop)) {
   
  //     // cords will be used if no selector is provided,
   
  //     // or if the selector didn't match any element.
   
  //     position.x = 0
   
  //     position.y = 0
   
  //    }
   
  //    // if the returned position is falsy or an empty object,
   
  //    // will retain current scroll position.
   
  //    return position
   
  //   }
  // },
  routes:[
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/home/detailHome",
    name: "detailHome",
    component: DetailHome,
    meta:{
      showFooter:false,
      // requiresAuth:true
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta:{
      showFooter:true,
      // requiresAuth:true
      scrollToTop: true
    }
  },
  {
    path: "/pathMap",
    name: "pathMap",
    component: PathMap,
    meta:{
      showFooter:false,
      // requiresAuth:true
    }
  },
  {
    // 动态
    path: "/dynamic",
    name: "Dynamic",
    component: Dynamic,
    meta:{
      showFooter:true,
      // requiresAuth:true
      keepAlive:true,
      scrollToTop: true
    }
  },
  {
    // 写动态
    path: "/writeDynamic",
    name: "WriteDynamic",
    component: WriteDynamic,
    meta:{
      showFooter:false,
      // requiresAuth:true
    }
  },
  {
    path: "/news",
    name: "news",
    component: News,
    meta:{
      showFooter:true,
      // requiresAuth:true
    }
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine,
    meta:{
      showFooter:true,
      // requiresAuth:true
    }
  },
  // 我的动态
  {
    path: "/mineDynamic",
    name: "mineDynamic",
    component: MineDynamic,
    meta:{
      // requiresAuth:true
    }
  },
  {
    path:'/mine/updateInfo',
    name:"updateInfo",
    component:UpdateInfo,
    meta:{
      showFooter:false,
      // requiresAuth:true
    }
  },
  {
    path:'/mine/updateInfo/updateusername',
    name:"updateusername",
    component:UpdateUserName,
    meta:{
      showFooter:false,
      // requiresAuth:true
    },
  },
  {
    // 子嵌套路由会自动补全斜线，所以不需要添加斜线
    path:'/updataUserAvatar',
    name:'updataUserAvatar',
    component:()=>import("../views/updataUserAvatar.vue")
  },
  {
    //聊天界面
    path:'/chart',
    name:'chart',
    component:()=>import("../views/chart.vue")
  }
  ]
})


/**
 * 上面我给首页路由加了 requiresAuth，所以使用路由钩子来拦截导航，
 * sessionStroage 里有 Token ，就调用获取 userInfo 的方法，
 * 并继续执行，如果没有 Token ，调用退出登录的方法，重定向到登录页。
 */
router.beforeEach((to, from, next) => {
  //路由中设置的needLogin字段就在to当中
  //在sessoinStorage中获取token
  let token = window.sessionStorage.getItem("token");
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      store.dispatch('getUser')
      next();
    } else {
      // 没有登录,重定向到登录页面
      store.dispatch("logOut");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath//登录后跳回到当前页面
        }
      });
    }
  } else {
    next();
  }
});

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// });


export default router;
