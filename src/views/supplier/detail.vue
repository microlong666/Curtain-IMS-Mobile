<template>
  <div class="load" v-if="loading">
    <van-loading color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-form class="form">
      <van-cell-group inset>
        <van-cell title="供应商名称" :value="items.name" />
        <van-cell title="供应商电话" :value="items.phone" />
        <van-cell title="供应商地址" :value="items.address" />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { getSupplierDetail } from '@/api/supplier'

export default {
  name: 'SupplierDetail',
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      items: {}
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    this.getSupplierDetail()
  },
  methods: {
    async getSupplierDetail() {
      const res = await getSupplierDetail({ id: this.id })
      if (res.data.success) {
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
