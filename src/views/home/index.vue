<template>
  <div class="content">
    <van-nav-bar title="窗帘销售管理系统" />
    <van-notice-bar left-icon="volume-o" scrollable mode="closeable">
      欢迎登入！请点击下方探索更多功能！
    </van-notice-bar>
    <van-cell-group class="cell" inset>
      <van-swipe :autoplay="3000" lazy-render @change="onChange">
        <van-swipe-item v-for="image in images" :key="image">
          <van-image
            width="100%"
            height="100%"
            :src="image"
            fit="cover"
            @click="previewImages"
          />
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
    <van-cell-group class="grid" inset>
      <van-grid square :column-num="3" :clickable="true">
        <van-grid-item
          v-if="userInfo.roleName !== '客户'"
          icon="friends-o"
          text="客户管理"
          to="customer"
        />
        <van-grid-item
          v-if="userInfo.roleName !== '客户'"
          icon="logistics"
          text="供应商管理"
          to="supplier"
        />
        <van-grid-item
          v-if="userInfo.roleName !== '客户'"
          icon="apps-o"
          text="物料管理"
          to="items"
        />
        <van-grid-item icon="records" text="需求管理" to="need" />
        <van-grid-item icon="shopping-cart-o" text="订单管理" to="order" />
        <van-grid-item icon="setting-o" text="个人资料" to="/about/info" />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import store from '@/store'
import { ImagePreview } from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      currentIndex: 1,
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
  },
  methods: {
    onChange(index) {
      this.currentIndex = index
    },
    previewImages() {
      ImagePreview({
        images: this.images,
        closeable: true,
        startPosition: this.currentIndex
      })
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
