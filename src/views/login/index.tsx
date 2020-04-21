import {Component, Vue} from 'vue-property-decorator';
import {loginReq} from '@/api/user';
import Cookies from 'js-cookie';

@Component
export default class LoginPage extends Vue {

  private username: string = '';
  private password: string = '';

  public login() {
    const data = {username: this.username, password: this.password};
    loginReq(data).then((res) => {
      const {data: {code, msg}} = res;
      if (code === 0) {
        // 这里实际开发中不会在这个地方写，而是抽离到路由守卫或store中
        // 而且一般这个值不会是写死的字符串，而是从服务端返回的随机且唯一的字符串
        Cookies.set('token', 'value');

        this.$router.push('/home');
      } else {
        // TODO tslint:disable-next-line:no-console
        // tslint:disable-next-line:no-console
        console.error(msg);
      }
    });
  }

  protected render() {
    return (
      <div class='login-page'>
        <input v-model={this.username}/>
        <input v-model={this.password} type='password' sytle='margin-left: 10px;'/>
        <button style='margin-left: 10px;' on-click={this.login}>登录</button>
      </div>
    );
  }
}
