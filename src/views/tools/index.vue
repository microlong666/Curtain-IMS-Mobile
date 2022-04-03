<template>
  <div>
    <van-button @click="handleClick">获取当前用户信息</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant'

export default {
  name: 'Tools',
  setup() {
    const handleClick = () => {
      Dialog.alert({ message: '123' })
    }

    return {
      handleClick
    }
  }
}
</script>

<style>
</style>
