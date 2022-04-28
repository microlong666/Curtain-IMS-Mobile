<template>
  <div class="content">
    <van-cell-group inset>
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
    <van-cell-group title="我的需求" inset>
      <van-grid square :column-num="4" :clickable="true">
        <van-grid-item
          icon="sign"
          text="待确认"
          :badge="need.toConfirm"
          to="/need/0"
        />
        <van-grid-item
          icon="todo-list-o"
          text="待受理"
          :badge="need.toDo"
          to="/need/1"
        />
        <van-grid-item
          icon="smile-o"
          text="已受理"
          :badge="need.done"
          to="/need/2"
        />
        <van-grid-item
          icon="close"
          text="已关闭"
          :badge="need.closed"
          to="/need/3"
        />
      </van-grid>
    </van-cell-group>
    <van-cell-group title="我的订单" inset>
      <van-grid square :column-num="4" :clickable="true">
        <van-grid-item
          icon="sign"
          text="待确认"
          :badge="order.toConfirm"
          to="/order/0"
        />
        <van-grid-item
          icon="paid"
          text="待支付"
          :badge="order.toPay"
          to="/order/2"
        />
        <van-grid-item
          icon="guide-o"
          text="待安装"
          :badge="order.toLaunch"
          to="/order/3"
        />
        <van-grid-item
          icon="smile-o"
          text="已完成"
          :badge="order.done"
          to="/order/4"
        />
      </van-grid>
    </van-cell-group>
    <van-cell-group class="logOut" inset>
      <van-cell title="登出" @click="logOut" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getNeedCount } from '@/api/need'
import { getOrderCount } from '@/api/order'
import { logOut } from '@/api/user'
import store from '@/store'
export default {
  name: 'About',
  data() {
    return {
      need: {
        toConfirm: null,
        toDo: null,
        done: null,
        closed: null
      },
      order: {
        toConfirm: null,
        toPay: null,
        toLaunch: null,
        done: null
      },
      userInfo: store.state.user.user
    }
  },
  created() {
    this.getNeedCount()
    this.getOrderCount()
  },
  methods: {
    async getNeedCount() {
      let res = await getNeedCount()
      if (res.data.success) {
        const data = res.data.data
        this.need.toConfirm = data.toConfirm !== 0 ? data.toConfirm : null
        this.need.toDo = data.toDo !== 0 ? data.toDo : null
        this.need.done = data.done !== 0 ? data.done : null
        this.need.closed = data.closed !== 0 ? data.closed : null
      }
    },
    async getOrderCount() {
      let res = await getOrderCount()
      if (res.data.success) {
        const data = res.data.data
        this.order.toConfirm = data.toConfirm !== 0 ? data.toConfirm : null
        this.order.toPay = data.toPay !== 0 ? data.toPay : null
        this.order.toLaunch = data.toLaunch !== 0 ? data.toLaunch : null
        this.order.done = data.done !== 0 ? data.done : null
      }
    },
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
.content {
  padding: var(--van-padding-md) 0;
}

.logOut {
  margin-top: var(--van-padding-md);
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
