<template>
  <div class="load" v-if="loading">
    <van-loading color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-steps :active="orderInfo.status + 1" active-color="#38f">
      <van-step>下单</van-step>
      <van-step v-if="orderInfo.status === 0">待确认</van-step>
      <van-step v-if="orderInfo.status > 0 && orderInfo.status < 5">
        已确认
      </van-step>
      <van-step v-if="orderInfo.status === 0 || orderInfo.status === 1">
        待加工
      </van-step>
      <van-step v-if="orderInfo.status > 1 && orderInfo.status < 5">
        已加工
      </van-step>
      <van-step v-if="orderInfo.status >= 0 && orderInfo.status < 3">
        待支付
      </van-step>
      <van-step v-if="orderInfo.status > 2 && orderInfo.status < 5">
        已支付
      </van-step>
      <van-step v-if="orderInfo.status >= 0 && orderInfo.status < 4">
        待安装
      </van-step>
      <van-step>完成</van-step>
    </van-steps>
    <van-cell-group inset title="基本信息">
      <van-cell title="客户姓名" :value="orderInfo.customerName" />
      <van-cell title="客户手机号" :value="orderInfo.customerPhone" />
      <van-cell title="客户地址" :value="orderInfo.customerAddress" />
      <van-cell
        title="订单创建时间"
        :value="orderInfo.createTime.substring(0, 16)"
      />
      <van-cell
        title="加工费数量"
        :value="
          orderInfo.processingFee + (orderInfo.processingFee === '' ? '' : '元')
        "
      />
      <van-cell
        title="加工费折扣"
        :value="
          orderInfo.processingDiscount === 0
            ? '赠送'
            : orderInfo.processingDiscount === 10
            ? '无'
            : orderInfo.processingDiscount +
              (orderInfo.processingDiscount === '' ? '' : '折')
        "
      />
      <van-cell
        title="安装费数量"
        :value="
          orderInfo.installNumber +
          (orderInfo.installNumber === '' ? '' : orderInfo.installUnit)
        "
      />
      <van-cell
        title="安装费单价"
        :value="
          orderInfo.installFee + (orderInfo.installFee === '' ? '' : '元')
        "
      />
      <van-cell
        title="安装费折扣"
        :value="
          orderInfo.installDiscount === 0
            ? '赠送'
            : orderInfo.installDiscount === 10
            ? '无'
            : orderInfo.installDiscount +
              (orderInfo.installDiscount === '' ? '' : '折')
        "
      />
      <van-cell
        title="总价"
        :value="
          orderInfo.totalPrice === 0
            ? ''
            : orderInfo.totalPrice + (orderInfo.totalPrice === '' ? '' : '元')
        "
      />
      <van-cell
        title="折后总价"
        :value="
          orderInfo.totalPrice === 0
            ? ''
            : orderInfo.discountedPrice +
              (orderInfo.discountedPrice === '' ? '' : '元') +
              '（' +
              (orderInfo.discount === 10
                ? '无折扣'
                : orderInfo.discount +
                  (orderInfo.discount === '' ? '' : '折')) +
              '）'
        "
      />
      <van-cell title="备注" :value="orderInfo.remark" />
    </van-cell-group>
    <van-cell-group inset title="位置信息">
      <van-collapse
        v-model="activeNames"
        v-for="(item, i) in orderInfo.detailList"
      >
        <van-collapse-item :title="item.location" :name="i">
          <van-cell
            title="测量高度"
            :value="
              item.measureHeight + (item.measureHeight === '' ? '' : '米')
            "
          />
          <van-cell
            title="测量宽度"
            :value="item.measureWidth + (item.measureWidth === '' ? '' : '米')"
          />
          <van-cell
            title="减除离地高度"
            :value="
              item.minusGroundHeight +
              (item.minusGroundHeight === '' ? '' : '米')
            "
          />
          <van-cell title="窗帘类型" :value="item.curtainType" />
          <van-cell title="皱褶倍数" :value="item.foldMultiple" />
          <van-cell
            title="开合方向"
            :value="
              item.openDirection === 1
                ? '双开'
                : item.openDirection === 2
                ? '左单开'
                : '右单开'
            "
          />
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script>
import { updatePrice, getDetail, getOrderDetail } from '@/api/order'
import { getCustomerDetail } from '@/api/customer'
export default {
  name: 'OrderDetail',
  data() {
    return {
      loading: true,
      activeNames: [],
      orderId: this.$route.params.id,
      orderInfo: {}
    }
  },
  created() {
    this.loadOrder()
  },
  methods: {
    async loadOrder() {
      // 查订单
      if (this.orderId === null) {
        return
      }

      // 更新价格
      const updatePriceRes = await updatePrice({ id: this.orderId })
      if (updatePriceRes.data?.code !== 200) {
        this.$toast.fail({
          message: '总价更新失败！' + updatePriceRes.message
        })
        return
      }

      const res = await getDetail({ id: this.orderId })
      if (res.data?.code !== 200) {
        this.loading = false
        this.$toast.fail({
          message: '查询订单出错'
        })
        return
      }
      this.orderInfo = {
        ...res.data.data
      }
      // 查客户
      let ifSuccess = await this.loadCustomer()
      if (!ifSuccess) {
        this.loading = false
        this.$toast.fail({
          message: '查询客户出错'
        })
        return
      }
      // 查位置表
      ifSuccess = await this.loadOrderDetail()
      if (!ifSuccess) {
        this.loading = false
        this.$toast.fail({
          message: '查询位置出错'
        })
        return
      }
      this.loading = false
    },
    async loadOrderDetail() {
      const detailList = await getOrderDetail({ orderId: this.orderId })
      if (detailList.data?.code !== 0) {
        return false
      }
      this.orderInfo.detailList = detailList.data.data
      return true
    },
    async loadCustomer() {
      const customer = await getCustomerDetail({
        id: this.orderInfo.customerId
      })
      if (customer.data?.code !== 200) {
        return false
      }
      this.orderInfo.customerName = customer.data.data.name
      this.orderInfo.customerAddress = customer.data.data.address
      this.orderInfo.customerPhone = customer.data.data.phone
      return true
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
</style>
