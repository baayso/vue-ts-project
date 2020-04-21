import Vue from 'vue';
import VueRouter, {Route, RouteConfig} from 'vue-router';
import Cookies from 'js-cookie';
import Home from '../views/Home.vue';
import Login from '@/views/login/index';
import store from '@/store';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('@/components/TMain/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

const turn = (to: Route, from: Route, next: any) => {
  if (to.path === '/login') {
    // 如果登录了然后访问login页，不做跳转，从哪来回哪去
    next(from);
  } else {
    // 否则顺利跳转
    next();
  }
};

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');

  // 如果token不为空字符串或者undefined，说明登录了
  if (token) {
    // 判断store.state.username是否为空，为空则需要获取
    if (!store.state.username) {
      store.dispatch('getInfoAction').then(() => {
        // 获取之后再跳转页面
        turn(to, from, next);
      });
    } else {
      // 如果store.state.username不为空，直接跳转
      turn(to, from, next);
    }
  } else { // 否则是没登录
    if (to.path === '/login') {
      // 如果没登录而且乖乖的到登录页去，轻松放行
      next();
    } else {
      // 如果没登录还想去登录后的页面，打回登录页
      next('/login');
    }
  }
});

export default router;
