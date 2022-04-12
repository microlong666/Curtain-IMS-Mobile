<template>
  <div class="content">
    <van-nav-bar title="俪松居" />
    <van-notice-bar left-icon="volume-o" scrollable mode="closeable">
      欢迎登入！请点击下方探索更多功能！
    </van-notice-bar>
    <van-cell-group class="cell" inset>
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images">
          <van-image width="100%" height="100%" :src="image" fit="cover" />
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
    <van-cell-group class="grid" inset>
      <van-grid square :column-num="3">
        <van-grid-item
          icon="photo-o"
          text="客户管理"
          v-if="userInfo.roleName !== '客户'"
        />
        <van-grid-item
          icon="photo-o"
          text="供应商管理"
          v-if="userInfo.roleName !== '客户'"
        />
        <van-grid-item
          icon="photo-o"
          text="物料管理"
          v-if="userInfo.roleName !== '客户'"
        />
        <van-grid-item icon="photo-o" text="需求管理" />
        <van-grid-item icon="photo-o" text="订单管理" />
        <van-grid-item icon="photo-o" text="个人资料" to="/about/info" />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Home',
  data() {
    return {
      userInfo: store.state.user.user,
      images: [
        require('@/assets/images/1.jpg'),
        require('@/assets/images/2.jpg'),
        require('@/assets/images/3.jpg'),
        require('@/assets/images/4.jpg'),
        require('@/assets/images/5.jpg'),
        require('@/assets/images/6.jpg')
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  margin-top: var(--van-padding-md);
}

.grid {
  margin-top: var(--van-padding-md);
  margin-bottom: var(--van-padding-md);
}
</style>
