<template>
  <div style="padding-top: 80px">
    <van-empty image="error" description="抱歉, 你访问的页面不存在.">
      <van-button type="primary" @click="$router.go(-1)" round>
        返回
      </van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: 'Exception404'
}
</script>

<style scoped>
.van-button {
  width: 120px;
  height: 40px;
}
</style>
