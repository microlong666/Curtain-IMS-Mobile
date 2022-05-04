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
              <van-cell center :to="'/need/detail/' + item.id" is-link>
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
            <template #right>
              <van-button
                v-if="userInfo.roleName === '客户' && item.status === '待确认'"
                type="success"
                text="修改"
                style="height: 100%"
                :to="'/need/form/' + item.id"
                square
              />
              <van-button
                square
                type="primary"
                text="变更"
                style="height: 100%"
                @click="
                  () => {
                    show = true
                    needId = item.id
                  }
                "
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-action-sheet
      v-model:show="show"
      :actions="setActions()"
      cancel-text="取消"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { getCustomerDetail } from '@/api/customer'
import { getNeedList, editNeed } from '@/api/need'
import store from '@/store'
import dayjs from 'dayjs'
import qs from 'qs'

export default {
  name: 'Need',
  inject: ['reload'],
  data() {
    return {
      show: false,
      needId: null,
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
  created() {
    if (this.userInfo.roleName === '客户') {
      this.$emit('setter', { rightText: '添加', route: '/need/form' })
    }
  },
  methods: {
    setActions() {
      if (this.userInfo.roleName === '客户') {
        return [{ name: '确认' }, { name: '关闭' }]
      } else {
        return [{ name: '确认' }, { name: '受理' }, { name: '关闭' }]
      }
    },
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
    },
    onSelect(item) {
      let status = null
      switch (item.name) {
        case '确认':
          status = 1
          break
        case '受理':
          status = 2
          break
        case '关闭':
          status = 3
      }
      editNeed(qs.stringify({ id: this.needId, status: status }))
        .then((res) => {
          if (res.data.success) {
            this.$toast.success({
              message: '变更成功'
            })
            this.needId = null
            this.show = false
            this.onRefresh()
          }
        })
        .catch((error) => {
          this.$toast.fail({
            message: '变更失败，' + error.message
          })
        })
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
