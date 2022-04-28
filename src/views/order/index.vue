<template>
  <div class="block">
    <div class="header">
      <van-search
        class="search"
        v-model="params.id"
        placeholder="请输入订单编号"
        @search="onLoad"
      >
      </van-search>
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item
          v-model="params.status"
          :options="statusOptions"
          @change="onLoad"
        />
      </van-dropdown-menu>
    </div>

    <van-pull-refresh class="refresh" v-model="refreshing" @refresh="onRefresh">
      <div class="content">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-swipe-cell class="cell" v-for="item in orderList" :key="item">
            <van-cell-group inset>
              <van-cell center is-link :to="'/order/detail/' + item.id">
                <template #title>
                  <span class="title">{{ item.customerName }}</span>
                  <span class="title">{{ '订单编号: ' + item.id }}</span>
                </template>
                <template #label>
                  <span>{{ item.createTime }}</span>
                </template>
                <template #value>
                  <van-tag :type="tagConvert(item.status)" class="tag">
                    {{ item.status }}
                  </van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <template #left v-if="userInfo.roleName !== '客户'">
              <van-button
                square
                type="primary"
                text="版本"
                style="height: 100%"
                :to="'/order/version/' + item.id"
              />
            </template>
            <template #right v-if="userInfo.roleName !== '客户'">
              <van-button
                square
                type="primary"
                text="变更"
                style="height: 100%"
                @click="
                  () => {
                    show = true
                    orderId = item.id
                  }
                "
              />
              <van-button
                square
                type="danger"
                text="删除"
                style="height: 100%"
                @click="deleteOrder(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { getCustomerDetail } from '@/api/customer'
import { getOrderList, editOrder, deleteOrder } from '@/api/order'
import store from '@/store'
import dayjs from 'dayjs'
import qs from 'qs'

export default {
  name: 'Order',
  inject: ['reload'],
  data() {
    return {
      show: false,
      orderId: null,
      actions: [
        { name: '待确认' },
        { name: '待加工' },
        { name: '待支付' },
        { name: '待安装' },
        { name: '完成' }
      ],
      loading: false,
      finished: false,
      refreshing: false,
      statusType: 'primary',
      params: {
        id: null,
        status: this.$route.params.status
          ? Number(this.$route.params.status)
          : ''
      },
      statusOptions: [
        { text: '全部', value: '' },
        { text: '待确认', value: 0 },
        { text: '待加工', value: 1 },
        { text: '待支付', value: 2 },
        { text: '待安装', value: 3 },
        { text: '完成', value: 4 }
      ],
      orderList: [],
      userInfo: store.state.user.user
    }
  },
  methods: {
    // List 加载
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false
      }
      const res = await getOrderList(this.params)
      if (res.data.code === 0) {
        const array = res.data.data
        for (const item of array) {
          item.status = this.statusConvert(item.status)
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:MM')
          // 获取客户名
          const res = await getCustomerDetail({ id: item.customerId })
          item.customerName = res.data?.data.name
        }
        this.orderList = array
        this.loading = false
        this.finished = true
      }
    },
    statusConvert(status) {
      switch (status) {
        case 0:
          return '待确认'
        case 1:
          return '待加工'
        case 2:
          return '待支付'
        case 3:
          return '待安装'
        case 4:
          return '完成'
        default:
          return null
      }
    },
    tagConvert(status) {
      switch (status) {
        case '待确认':
          return 'danger'
        case '待加工':
          return 'primary'
        case '待支付':
          return 'danger'
        case '待安装':
          return 'primary'
        case '完成':
          return 'success'
        default:
          return 'primary'
      }
    },
    // List 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.orderList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onSelect(item) {
      let status = null
      switch (item.name) {
        case '待确认':
          status = 0
          break
        case '待加工':
          status = 1
          break
        case '待支付':
          status = 2
          break
        case '待安装':
          status = 3
          break
        case '完成':
          status = 4
      }
      editOrder(qs.stringify({ id: this.orderId, status: status }))
        .then((res) => {
          if (res.data.success) {
            this.$toast.success({
              message: '变更成功'
            })
            this.orderId = null
            this.show = false
            this.onRefresh()
          }
        })
        .catch((error) => {
          this.$toast.fail({
            message: '变更失败，' + error.message
          })
        })
    },
    deleteOrder(id) {
      this.$dialog
        .confirm({
          message: '确认删除此订单？'
        })
        .then(() => {
          deleteOrder(qs.stringify({ id: id }))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: '删除成功'
                })
                this.onRefresh()
              }
            })
            .catch((error) => {
              this.$toast.fail({
                message: '删除失败，' + error.message
              })
            })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.block,
.refresh {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.header {
  display: flex;
}

.search {
  flex: 1;
}

:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
  height: 100%;
  width: 80px;
}

:deep(.van-dropdown-menu__item) {
  justify-content: flex-start;
}

.content {
  padding: var(--van-padding-md) 0;
}

.cell {
  margin-bottom: var(--van-padding-md);
}

.title {
  width: 100%;
  display: inline-block;
}

.tag {
  margin-left: var(--van-padding-xs);
}
</style>
