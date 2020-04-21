import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AntVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

if (process.env.NODE_ENV === 'development') {
  // TODO tslint:disable-next-line:no-var-requires
  // tslint:disable-next-line:no-var-requires
  require('../mock');
}

Vue.use(AntVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
