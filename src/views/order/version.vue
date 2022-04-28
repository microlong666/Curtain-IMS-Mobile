<template>
  <div class="load" v-if="loading">
    <van-loading color="#0094ff" vertical>加载中...</van-loading>
  </div>
  <div class="content" v-else>
    <van-cell-group inset title="基本信息">
      <van-cell title="订单编号" :value="order.id" />
      <van-cell title="客户姓名" :value="order.customerName" />
      <van-cell title="创建时间" :value="order.createTime.substring(0, 16)" />
    </van-cell-group>
    <van-cell-group inset title="时间线">
      <van-steps
        direction="vertical"
        active-icon="clock-o"
        active-color="#38f"
        active="0"
      >
        <van-step v-for="(version, index) in versionList" :key="index">
          <div>
            <p style="font-size: 16px; font-weight: 600; margin: 4px 0">
              {{ version.title }}
            </p>
            <p>操作人：{{ version.updateUser }}</p>
            <p>时间：{{ version.updateTime }}</p>
          </div>
          <div v-for="detail in version.detail">
            <span>
              {{ detail.editBeforeKey }}：{{ detail.editBeforeValue }}
            </span>
            <span style="margin: 0 30px 0 35px"> || </span>
            <span>{{ detail.editAfterKey }}：{{ detail.editAfterValue }}</span>
          </div>
        </van-step>
      </van-steps>
    </van-cell-group>
  </div>
</template>

<script>
import { getTrackInfo } from '@/api/items'
import { getDetail, getOrderVersion } from '@/api/order'
import { getCustomerDetail } from '@/api/customer'
import { getUserName } from '@/api/user'

export default {
  name: 'OrderVersion',
  data() {
    return {
      orderId: this.$route.params.id,
      orderAttr: {
        customerId: '顾客',
        discount: '订单总折扣',
        installDiscount: '安装费折扣',
        installFee: '安装费单价',
        installNumber: '安装费数量',
        installUnit: '安装费单位',
        processingDiscount: '加工费折扣',
        processingFee: '加工费单价',
        processingNumber: '加工费数量',
        processingUnit: '加工费单位',
        remark: '备注'
      },
      locationAttr: {
        location: '位置',
        measureHeight: '测量高度',
        measureWidth: '测量宽度',
        minusGroundHeight: '减除离地高度',
        curtainType: '窗帘类型',
        foldMultiple: '皱褶倍数',
        openDirection: '开合方向',
        trackInstallType: '安装方式',
        trackLength: '导轨米数',
        minusTrackHeight: '减除导轨高度',
        trackUnitPrice: '导轨单价',
        trackDiscount: '导轨折扣',
        trackRemark: '导轨备注'
      },
      itemAttr: {
        type: '物料类型',
        fabricTech: '布料工艺',
        unit: '物料单位',
        number: '物料数量',
        unitPrice: '物料单价',
        discount: '折扣',
        productHeight: '成品高',
        productWidth: '成品宽',
        itemInfo: '物料型号'
      },
      userNameMap: {},
      customerNameMap: {},
      versionList: [],
      order: {},
      loading: true
    }
  },
  created() {
    this.getOrderDetail()
    this.getVersion()
  },
  methods: {
    getOrderDetail() {
      getDetail({ id: this.orderId }).then(async (res) => {
        if (res.data.success) {
          // 获取客户名
          const result = await getCustomerDetail({
            id: res.data.data.customerId
          })
          res.data.data.customerName = result.data?.data.name
          this.order = res.data.data
        }
      })
    },
    async getVersion() {
      let res = await getOrderVersion({ orderId: this.orderId })
      for (const version of res.data?.data) {
        const versionData = {}
        versionData.updateUser = await this.getUserName(version.updateUser)
        versionData.updateTime = version.updateTime.substring(0, 16)
        const info = await this.getInfo(version)
        versionData.title = info.title
        versionData.detail = info.detail
        this.versionList.push(versionData)
      }
      this.loading = false
    },
    async getUserName(id) {
      if (id in this.userNameMap) {
        return this.userNameMap[id.toString()]
      } else {
        const user = await getUserName({ userId: id })
        this.userNameMap[id.toString()] = user.data.data.name
        return user.data.data.name
      }
    },
    async getInfo(version) {
      const data = {}
      data.detail = []
      const content = JSON.parse(version.content)
      if ('orderEdit' in content) {
        data.title = '订单修改'
        data.detail = await this.getOrderEditList(content.orderEdit)
      } else if ('addLocation' in content) {
        data.title = '添加位置：' + content.addLocation
      } else if ('deleteLocation' in content) {
        data.title = '删除位置：' + content.deleteLocation
      } else if ('editLocation' in content) {
        data.title = '修改位置：' + content.editLocation
        data.detail = await this.getLocationEdit(content.data)
      }
      return data
    },
    async getOrderEditList(orderEdit) {
      const data = []
      for (const key in orderEdit) {
        if (key === 'customerId') {
          // 客户修改
          let editBeforeCustomer = ''
          let editAfterCustomer = ''
          if (orderEdit.customerId.editBefore in this.customerNameMap) {
            editBeforeCustomer =
              this.customerNameMap[orderEdit.customerId.editBefore.toString()]
          } else {
            const customer = await getCustomerDetail({
              id: orderEdit.customerId.editBefore
            })
            editBeforeCustomer = customer.data.data.name
            this.customerNameMap[orderEdit.customerId.editBefore.toString()] =
              customer.data.data.name
          }
          if (orderEdit.customerId.editAfter in this.customerNameMap) {
            editAfterCustomer =
              this.customerNameMap[orderEdit.customerId.editAfter.toString()]
          } else {
            const customer = await getCustomerDetail({
              id: orderEdit.customerId.editAfter
            })
            editAfterCustomer = customer.data.data.name
            this.customerNameMap[orderEdit.customerId.editAfter.toString()] =
              customer.data.data.name
          }
          const detail = {
            editBeforeKey: '客户修改前',
            editAfterKey: '客户修改后',
            editBeforeValue: editBeforeCustomer,
            editAfterValue: editAfterCustomer
          }
          data.push(detail)
        } else {
          const detail = {
            editBeforeKey: this.orderAttr[key] + '修改前',
            editAfterKey: this.orderAttr[key] + '修改后',
            editBeforeValue: orderEdit[key].editBefore,
            editAfterValue: orderEdit[key].editAfter
          }
          data.push(detail)
        }
      }
      return data
    },
    async getLocationEdit(editLocation) {
      const data = []
      if ('addItem' in editLocation) {
        data.push({
          editBeforeKey: '添加物料类型',
          editAfterKey: '添加物料型号',
          editBeforeValue: editLocation.addItem.type,
          editAfterValue: editLocation.addItem.data
        })
      } else if ('delItem' in editLocation) {
        data.push({
          editBeforeKey: '删除物料类型',
          editAfterKey: '删除物料型号',
          editBeforeValue: editLocation.delItem.type,
          editAfterValue: editLocation.delItem.data
        })
      } else if ('editItem' in editLocation) {
        for (const key in editLocation.editItem.data) {
          data.push({
            editBeforeKey: `${this.itemAttr[key]}修改前`,
            editAfterKey: `${this.itemAttr[key]}修改后`,
            editBeforeValue: editLocation.editItem.data[key].editBefore,
            editAfterValue: editLocation.editItem.data[key].editAfter
          })
        }
      } else {
        for (const key in editLocation) {
          if (key !== 'trackId') {
            data.push({
              editBeforeKey: this.locationAttr[key] + '修改前',
              editAfterKey: this.locationAttr[key] + '修改后',
              editBeforeValue: editLocation[key].editBefore,
              editAfterValue: editLocation[key].editAfter
            })
          } else if (key === 'trackId') {
            // 导轨
            const track1 = await getTrackInfo({
              id: content.data.trackId.editBefore
            })
            const track2 = await getTrackInfo({
              id: content.data.trackId.editAfter
            })
            data.push({
              editBeforeKey: '导轨修改前',
              editAfterKey: '导轨修改后',
              editBeforeValue: track1.data.model,
              editAfterValue: track2.data.model
            })
          }
        }
      }
      return data
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
