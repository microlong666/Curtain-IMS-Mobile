<template>
  <div class="block">
    <div class="header">
      <van-search
        class="search"
        style="padding-right: 0"
        v-model="params.name"
        placeholder="客户名称"
        @search="onLoad"
      >
      </van-search>
      <van-search
        class="search"
        v-model="params.phone"
        placeholder="客户电话"
        @search="onLoad"
      >
      </van-search>
    </div>

    <van-pull-refresh class="refresh" v-model="refreshing" @refresh="onRefresh">
      <div class="content">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-swipe-cell class="cell" v-for="item in customerList" :key="item">
            <van-cell-group inset>
              <van-cell
                center
                :title="item.name"
                :label="item.address"
                :value="item.phone"
                is-link
              >
              </van-cell>
            </van-cell-group>
            <template #right>
              <van-button
                square
                type="primary"
                text="修改"
                style="height: 100%"
              />
              <van-button
                square
                type="danger"
                text="删除"
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
import { getCustomerList } from '@/api/customer'

export default {
  name: 'Customer',
  inject: ['reload'],
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        name: null,
        phone: null
      },
      customerList: []
    }
  },
  created() {
    this.$emit('setter', { rightText: '添加', route: '/customer/add' })
  },
  methods: {
    // List 加载
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false
      }
      const res = await getCustomerList(this.params)
      if (res.data.code === 0) {
        const array = res.data.data
        array.forEach((item) => {
          item.address = item.address === '' ? '暂无地址记录' : item.address
        })
        this.customerList = array
        this.loading = false
        this.finished = true
      }
    },
    // List 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.customerList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
}

.search {
  flex: 1;
}

.content {
  padding: var(--van-padding-md) 0;
}

.cell {
  margin-bottom: var(--van-padding-md);
}
</style>
