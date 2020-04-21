<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <button v-on:click="onClick">{{message}}</button>
    <button @click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times.</p>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue';
  import {loginReq} from '@/api/user';

  @Component({
    name: 'Home',
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {
    // 初始数据可以直接声明为实例的属性
    private message: string = 'Hello!';
    private counter: number = 1;

    // 组件方法也可以直接声明为实例的方法
    public onClick(): void {
      this.message += this.counter;
    }

    public mounted() {
      this.message = '加油！';
    }
  }
</script>
