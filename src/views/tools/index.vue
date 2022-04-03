<template>
  <div>
    <van-button @click="handleClick">获取当前用户信息</van-button>
  </div>
</template>

<script>
import store from '@/store'
import { Dialog } from 'vant'

export default {
  name: 'Tools',
  setup() {
    const handleClick = () => {
      Dialog.alert({
        message: JSON.stringify(store.state.user.user)
      })
    }

    return {
      handleClick
    }
  }
}
</script>

<style>
</style>
