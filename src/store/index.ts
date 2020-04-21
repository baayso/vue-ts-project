import Vue from 'vue';
import Vuex from 'vuex';
import {loginReq, getInfo} from '@/api/user';
import Cookies from 'js-cookie';
import Cookie from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    userId: '',
    username: '',
    email: '',
  },
  mutations: {
    setLoginInfoMutation(state, info) {
      const {token, userId} = info;
      state.token = token;
      state.userId = userId;
    },
    // 设置存储在store里的用户信息
    setUserInfoMutation(state, info) {
      const {username, email} = info;
      state.username = username;
      state.email = email;
    },
    clearUserInfoMutation(state, info) {
      state.token = '';
      state.userId = '';
      state.username = '';
      state.email = '';
      Cookie.set('token', '');
      Cookie.set('userId', '');
    },
  },
  actions: {
    loginAction({commit, dispatch}, {username, password}) {
      return new Promise((resolve, reject) => {
        // 首先调登录接口
        loginReq({username, password}).then((response) => {
          const {data: {code, msg, data}} = response;
          if (code === 0) {
            commit('setLoginInfoMutation', data);

            // 成功返回后，将token存到cookie中，然后携带token去请求获取信息接口
            // 一般这个值不会是写死的字符串，而是从服务端返回的随机且唯一的字符串
            Cookies.set('token', data.token);
            Cookies.set('userId', data.userId);

            dispatch('getInfoAction').then(() => {
              resolve();
            });
          } else {
            // TODO tslint:disable-next-line:no-console
            // tslint:disable-next-line:no-console
            console.error(msg);
          }
        });
      });
    },
    getInfoAction({commit, state}) {
      return new Promise((resolve, reject) => {
        // const userId = state.userId === '' ? Cookies.get('userId') : state.userId;
        getInfo({userId: state.userId}).then((res) => {
          const {data: {code, data}} = res;
          if (code === 0) {
            commit('setUserInfoMutation', data);
            // 全部操作做完后，调用resolve方法
            resolve();
          }
        });
      });
    },
  },
  modules: {},
});
