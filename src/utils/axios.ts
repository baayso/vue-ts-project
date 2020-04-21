// 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
import axios, {AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse} from 'axios';
import config from '@/config'; // @代表src一级目录，是我们在vue.config.js文件里配置的

const {api: {devApiBaseUrl, proApiBaseUrl}} = config;
// process.env.NODE_ENV是vue服务内置的环境变量，有两个值，当本地开发时是development，当打包时是production
const apiBaseUrl = process.env.NODE_ENV === 'production' ? proApiBaseUrl : devApiBaseUrl;

export interface ResponseData {
  code: number;
  data?: any;
  msg: string;
}

// 定义一个接口请求类，用于创建一个axios请求实例
class HttpRequest {
  // 这个类接收一个字符串参数，是接口请求的基本路径
  constructor(public baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
  public request(options: AxiosRequestConfig): AxiosPromise {
    // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性，就像我们前面讲的计数器的例子
    const instance: AxiosInstance = axios.create();
    // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    options = this.mergeConfig(options);
    // 调用interceptors方法使拦截器生效
    this.interceptors(instance, options.url);
    return instance(options); // 最后返回AxiosPromise
  }

  // 定义这个函数用于添加全局请求和响应拦截逻辑
  private interceptors(instance: AxiosInstance, url?: string) {
    // 在这里添加请求和响应拦截
    instance.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
        // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
        // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
        return requestConfig;
      },
      (error) => {
        return Promise.reject(error);
      });
    instance.interceptors.response.use((res: AxiosResponse) => {
        // res的类型是AxiosResponse<any>，包含六个字段，其中data是服务端返回的数据
        const {data} = res;
        // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
        const {code, msg} = data;
        // 这里我们在服务端将正确返回的状态码标为0
        if (code !== 0) {
          // TODO // tslint:disable-next-line:no-console
          // tslint:disable-next-line:no-console
          console.error(msg); // 如果不是0，则打印错误信息，我们后面讲到UI组件的时候，这里可以使用消息窗提示
        }
        // 返回数据
        return res;
      },
      (error) => { // 这里是遇到报错的回调
        return Promise.reject(error);
      });
  }

  // 这个方法用于合并基础路径配置和接口单独配置
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({baseURL: this.baseUrl}, options);
  }
}

export default HttpRequest;
