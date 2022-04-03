<template>
  <div style="padding-top: 80px">
    <van-empty description="这是个人页">
      <van-button type="primary" @click="logOut" round>登出</van-button>
    </van-empty>
  </div>
</template>

<script>
import { logOut } from '@/api/user'
export default {
  name: 'About',
  methods: {
    logOut() {
      // 退出登录
      this.$dialog
        .confirm({
          title: '即将登出',
          message: '确认退出系统？'
        })
        .then(() => {
          logOut()
            .then(() => {
              // 清除缓存的token
              this.$store.dispatch('user/removeToken').then(() => {
                // 这样跳转避免再次登录重复注册动态路由
                location.replace('/login')
              })
            })
            .catch((error) => {
              this.$toast.fail({
                message: error.message
              })
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.van-button {
  width: 120px;
  height: 40px;
}
</style>
