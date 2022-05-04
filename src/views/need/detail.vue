<template>
  <div class="load" v-if="loading">
    <van-loading color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-steps :active="needInfo.status" active-color="#38f">
      <van-step v-if="needInfo.status === 0">待确认</van-step>
      <van-step v-if="needInfo.status === 0">待受理</van-step>
      <van-step
        v-if="
          needInfo.status === 1 ||
          needInfo.status === 2 ||
          needInfo.status === 3
        "
      >
        已确认
      </van-step>
      <van-step v-if="needInfo.status === 1">待受理</van-step>
      <van-step v-if="needInfo.status === 2">已受理</van-step>
      <van-step v-if="needInfo.status === 3">已关闭</van-step>
    </van-steps>
    <van-cell-group inset title="基本信息">
      <van-cell title="姓名" :value="needInfo.name" />
      <van-cell title="手机号" :value="needInfo.phone" />
      <van-cell title="地址" :value="needInfo.address" />
      <van-cell title="期望测量日期" :value="needInfo.measureDate" />
      <van-cell title="期望交货日期" :value="needInfo.deliverDate" />
    </van-cell-group>
    <van-cell-group v-for="item in needList" inset :title="item.location">
      <van-cell title="窗帘类型" :value="item.type" />
      <van-cell title="窗帘数量" :value="item.num" />
      <van-cell title="备注" :value="item.remark" />
    </van-cell-group>
  </div>
</template>

<script>
import { getNeedDetail } from '@/api/need'
import { getCustomerDetail } from '@/api/customer'
import dayjs from 'dayjs'
export default {
  name: 'NeedDetail',
  data() {
    return {
      loading: true,
      needId: this.$route.params.id,
      needInfo: {},
      needList: []
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    this.getNeedDetail()
  },
  methods: {
    async getNeedDetail() {
      const res = await getNeedDetail({ id: this.needId })
      if (res.data.success) {
        const item = res.data.data
        // 获取客户信息
        const customer = await getCustomerDetail({ id: item.customerId })
        if (customer.data.success) {
          this.needInfo = customer.data.data
        }

        this.needInfo.status = item.status
        this.needInfo.measureDate =
          item.measureDate === ''
            ? null
            : dayjs(item.measureDate).format('YYYY-MM-DD')
        this.needInfo.deliverDate =
          item.deliverDate === ''
            ? null
            : dayjs(item.deliverDate).format('YYYY-MM-DD')
        this.needList = JSON.parse(item.detail)
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
  padding-bottom: var(--van-padding-md);
}

.van-steps--horizontal {
  padding: 2.67vw 16.67vw 0;
}
</style>
