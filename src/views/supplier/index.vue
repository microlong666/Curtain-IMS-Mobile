<template>
  <div class="block">
    <div class="header">
      <van-search
        class="search"
        style="padding-right: 0"
        v-model="params.name"
        placeholder="供应商名称"
        @search="onLoad"
      >
      </van-search>
      <van-search
        class="search"
        v-model="params.phone"
        placeholder="供应商电话"
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
          <van-swipe-cell class="cell" v-for="item in suppierList" :key="item">
            <van-cell-group inset>
              <van-cell
                center
                :title="item.name"
                :label="item.address"
                :value="item.phone"
                :to="'/supplier/detail/' + item.id"
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
                :to="'/supplier/form/' + item.id"
              />
              <van-button
                square
                type="danger"
                text="删除"
                style="height: 100%"
                @click="deleteSupplier(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSupplierList, deleteSupplier } from '@/api/supplier'
import qs from 'qs'

export default {
  name: 'Supplier',
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
      suppierList: []
    }
  },
  created() {
    this.$emit('setter', { rightText: '添加', route: '/supplier/form' })
  },
  methods: {
    // List 加载
    async onLoad() {
      if (this.refreshing) {
        this.refreshing = false
      }
      const res = await getSupplierList(this.params)
      if (res.data.code === 0) {
        this.suppierList = res.data.data
        this.loading = false
        this.finished = true
      }
    },
    // List 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.suppierList = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    deleteSupplier(id) {
      this.$dialog
        .confirm({
          message: '确认删除此供应商？'
        })
        .then(() => {
          deleteSupplier(qs.stringify({ id: id }))
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
