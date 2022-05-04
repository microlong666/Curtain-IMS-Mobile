<template>
  <div class="load" v-if="loading">
    <van-loading color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-form class="form">
      <van-cell-group inset>
        <van-cell title="客户名称" :value="items.name" />
        <van-cell title="客户电话" :value="items.phone" />
        <van-cell title="客户地址" :value="items.address" />
        <van-cell title="测量日期" :value="items.measureAt" />
        <van-cell title="重测日期" :value="items.remeasureAt" />
        <van-cell title="订货日期" :value="items.orderAt" />
        <van-cell title="交货日期" :value="items.deliverAt" />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { getCustomerDetail } from '@/api/customer'
import dayjs from 'dayjs'

export default {
  name: 'CustomerDetail',
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      items: {}
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    this.getCustomerDetail()
  },
  methods: {
    async getCustomerDetail() {
      const res = await getCustomerDetail({ id: this.id })
      if (res.data.success) {
        res.data.data.measureAt = res.data.data.measureAt
          ? dayjs(res.data.data.measureAt).format('YYYY-MM-DD HH:mm')
          : ''
        res.data.data.remeasureAt = res.data.data.remeasureAt
          ? dayjs(res.data.data.remeasureAt).format('YYYY-MM-DD HH:mm')
          : ''
        res.data.data.orderAt = res.data.data.orderAt
          ? dayjs(res.data.data.orderAt).format('YYYY-MM-DD HH:mm')
          : ''
        res.data.data.deliverAt = res.data.data.deliverAt
          ? dayjs(res.data.data.deliverAt).format('YYYY-MM-DD HH:mm')
          : ''
        this.items = res.data.data
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.load {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}

.content {
  padding: var(--van-padding-md) 0;
}
</style>
