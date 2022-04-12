<template>
  <div class="content">
    <van-cell-group class="cell" inset>
      <van-cell
        size="large"
        class="userInfo"
        :to="{ name: 'UserInfo' }"
        center
        is-link
      >
        <template #title>
          <div style="display: flex">
            <span class="title van-ellipsis">{{ userInfo.name }}</span>
            <van-tag plain type="primary" size="medium" class="tag">
              {{ userInfo.roleName }}
            </van-tag>
          </div>
        </template>
        <template #label>
          <span class="label">手机号: {{ userInfo.phone }}</span>
        </template>
        <template #icon class="avatar">
          <van-image
            round
            fit="cover"
            width="100"
            height="100"
            src="/api/system/previewAvatar"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="cell" inset>
      <van-grid square :column-num="4">
        <van-grid-item icon="photo-o" text="待确认" />
        <van-grid-item icon="photo-o" text="待受理" />
        <van-grid-item icon="photo-o" text="待支付" />
        <van-grid-item icon="photo-o" text="待安装" />
      </van-grid>
    </van-cell-group>
    <van-cell-group class="cell" inset>
      <van-cell title="登出" @click="logOut" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { logOut } from '@/api/user'
import store from '@/store'
export default {
  name: 'About',
  data() {
    return {
      userInfo: store.state.user.user
    }
  },
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
/* .van-button {
  width: 120px;
  height: 40px;
} */
.content {
  padding: var(--van-padding-md) 0;
}

.cell {
  margin-bottom: var(--van-padding-md);
}

.avatar {
  display: flex;
  justify-content: flex-end;
}

.tag {
  margin-left: var(--van-padding-xs);
}

.userInfo :deep(.van-cell__title) {
  margin-left: var(--van-padding-md);
}

.userInfo :deep(.van-cell__label) {
  margin-top: var(--van-padding-xs);
}

.title {
  font-size: 18px;
  font-weight: var(--van-font-weight-bold);
}
</style>
