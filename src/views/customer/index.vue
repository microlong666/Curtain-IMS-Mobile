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
                :label="item.address"
                :to="'/customer/detail/' + item.id"
                is-link
              >
                <template #title>
                  <span class="title">{{ item.name }}</span>
                  <span class="title">{{ item.phone }}</span>
                </template>
                <template #value>
                  <van-tag
                    :type="item.userId ? 'primary' : 'danger'"
                    class="tag"
                  >
                    {{ item.userId ? '已关联' : '未关联' }}
                  </van-tag>
                </template>
              </van-cell>
            </van-cell-group>
            <template #left v-if="!item.userId">
              <van-button
                square
                type="primary"
                text="生成账号"
                style="height: 100%"
                @click="createAccount(item.id)"
              />
            </template>
            <template #right>
              <van-button
                square
                type="primary"
                text="修改"
                style="height: 100%"
                :to="'/customer/form/' + item.id"
              />
              <van-button
                square
                type="danger"
                text="删除"
                style="height: 100%"
                @click="deleteCustomer(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getCustomerList, createAccount, deleteCustomer } from '@/api/customer'
import qs from 'qs'

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
    this.$emit('setter', { rightText: '添加', route: '/customer/form' })
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
    },
    createAccount(id) {
      this.$dialog
        .confirm({
          title: '确定为该客户生成账号？'
        })
        .then(() => {
          createAccount(qs.stringify({ id: id, isCreateAccount: true }))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: '生成账号成功'
                })
                this.reload()
              } else {
                this.$toast.success({
                  message: '生成账号失败'
                })
              }
            })
            .catch((error) => {
              this.$toast.fail({
                message: error.message
              })
            })
        })
        .catch(() => {})
    },
    deleteCustomer(id) {
      this.$dialog
        .confirm({
          message: '确认删除此客户？'
        })
        .then(() => {
          deleteCustomer(qs.stringify({ id: id }))
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

.title {
  display: block;
}
</style>
