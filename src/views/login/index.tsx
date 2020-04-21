import {Component, Vue, Emit, Prop, Watch} from 'vue-property-decorator';
import {State, Action} from 'vuex-class';

@Component
export default class LoginPage extends Vue {

  // 这里通过@Action('loginAction')装饰器指定loginAction是store里的loginAction方法
  @Action('loginAction') public loginAction: any;

  private username: string = '';
  private password: string = '';

  public login() {
    const data = {username: this.username, password: this.password};
    // 然后这里就可以直接调用loginAction方法
    // 效果和this.$store.dispatch('loginActions', { 参数 })是一样的
    this.loginAction(data).then(() => {
      // 在store中的loginActions定义中，执行resolve方法的时机就是这里then中传入的这个函数执行的时机
      this.$router.push('/home'); // 在这跳转到home页
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
