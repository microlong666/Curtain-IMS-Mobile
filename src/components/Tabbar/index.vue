<template>
  <van-tabbar v-model="active" fixed :placeholder="true" :route="true">
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'Tabbar',
  setup(props) {
    const active = ref(0)
    const tabbarData = reactive([
      {
        icon: 'wap-home-o',
        title: '主页',
        to: {
          name: 'Home'
        }
      },
      {
        icon: 'user-o',
        title: '我的',
        to: {
          name: 'About'
        }
      }
    ])
    return {
      active,
      tabbarData
    }
  }
}
</script>

<style>
</style>
