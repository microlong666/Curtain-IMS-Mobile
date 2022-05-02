<template>
  <div class="load" v-if="loading">
    <van-loading color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-form class="form">
      <van-cell-group inset>
        <van-cell title="里布名称" :value="items.name" />
        <van-cell title="里布型号" :value="items.model" />
        <van-cell title="供应商" :value="items.supplierName" />
        <van-cell
          title="定高/定宽"
          :value="items.heightOrWidth ? '定高' : '定宽'"
        />
        <van-cell
          v-if="items.heightOrWidth"
          title="定高(米)"
          :value="items.height"
        />
        <van-cell v-else title="定宽(米)" :value="items.width" />
        <van-cell title="单价(元)" :value="items.unitPrice" />
        <van-cell title="备注" :value="items.remark" />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { getInsideFabricDetail } from '@/api/items'
import { getSupplierDetail } from '@/api/supplier'

export default {
  name: 'InsideFabricDetail',
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      items: {}
    }
  },
  created() {
    this.getInsideFabricDetail()
  },
  methods: {
    async getInsideFabricDetail() {
      const res = await getInsideFabricDetail({ id: this.id })
      if (res.data.success) {
        const supplier = await getSupplierDetail({
          id: res.data.data.supplierId
        })
        res.data.data.supplierName = supplier.data?.data.name
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
