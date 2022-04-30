<template>
  <div class="block">
    <div class="header">
      <van-search
        class="search"
        style="padding-right: 0"
        v-model="params.name"
        placeholder="配件名称"
        @search="onLoad"
      >
      </van-search>
      <van-search
        class="search"
        v-model="params.model"
        placeholder="配件型号"
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
          <van-swipe-cell
            class="cell"
            v-for="item in accessoryList"
            :key="item"
          >
            <van-cell-group inset>
              <van-cell
                center
                :title="item.name"
                :label="item.model"
                :value="item.supplierName"
                is-link
              >
              </van-cell>
            </van-cell-group>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAccessoryList } from '@/api/items'
import { getSupplierDetail } from '@/api/supplier'

export default {
  name: 'Accessory',
  inject: ['reload'],
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        name: null,
        model: null
      },
      accessoryList: []
    }
  },
  methods: {
    // List 加载
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false
      }
      const res = await getAccessoryList(this.params)
      if (res.data.code === 0) {
        const array = res.data.data
        for (const item of array) {
          // 获取供应商
          const res = await getSupplierDetail({ id: item.supplierId })
          item.supplierName = res.data?.data.name
        }
        this.accessoryList = array
        this.loading = false
        this.finished = true
      }
    },
    // List 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.accessoryList = []
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
