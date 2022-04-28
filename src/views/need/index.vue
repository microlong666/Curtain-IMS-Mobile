<template>
  <div class="block">
    <div class="header">
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
          <van-swipe-cell class="cell" v-for="item in needList" :key="item">
            <van-cell-group inset>
              <van-cell center is-link>
                <template #title>
                  <span>{{ item.customerName }}</span>
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
            <template #right v-if="userInfo.roleName === '客户'">
              <van-button
                square
                type="primary"
                text="变更"
                style="height: 100%"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getCustomerDetail } from '@/api/customer'
import { getNeedList } from '@/api/need'
import store from '@/store'
import dayjs from 'dayjs'

export default {
  name: 'Need',
  inject: ['reload'],
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      statusType: 'primary',
      params: {
        status: this.$route.params.status
          ? Number(this.$route.params.status)
          : ''
      },
      statusOptions: [
        { text: '全部', value: '' },
        { text: '待确认', value: 0 },
        { text: '待受理', value: 1 },
        { text: '已受理', value: 2 },
        { text: '已关闭', value: 3 }
      ],
      needList: [],
      userInfo: store.state.user.user
    }
  },
  methods: {
    // List 加载
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false
      }
      const res = await getNeedList(this.params)
      if (res.data.code === 0) {
        const array = res.data.data
        for (const item of array) {
          item.status = this.statusConvert(item.status)
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:MM')
          // 获取客户名
          const res = await getCustomerDetail({ id: item.customerId })
          item.customerName = res.data?.data.name
        }
        this.needList = array
        this.loading = false
        this.finished = true
      }
    },
    statusConvert(status) {
      switch (status) {
        case 0:
          return '待确认'
        case 1:
          return '待受理'
        case 2:
          return '已受理'
        case 3:
          return '已关闭'
        default:
          return null
      }
    },
    tagConvert(status) {
      switch (status) {
        case '待确认':
          return 'danger'
        case '待受理':
          return 'primary'
        case '已受理':
          return 'success'
        case '已关闭':
          return 'danger'
        default:
          return 'primary'
      }
    },
    // List 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.needList = []
      this.finished = false
      this.loading = true
      this.onLoad()
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

.van-dropdown-menu {
  width: 100%;
}

:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}

.content {
  padding: var(--van-padding-md) 0;
}

.cell {
  margin-bottom: var(--van-padding-md);
}

.tag {
  margin-left: var(--van-padding-xs);
}
</style>
