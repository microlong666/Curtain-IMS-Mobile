<template>
  <div class="content">
    <van-cell-group inset title="基本信息">
      <van-cell title="姓名" :value="customerInfo.name" />
      <van-cell title="手机号" :value="customerInfo.phone" />
      <van-cell title="地址" :value="customerInfo.address" />
    </van-cell-group>
    <van-form ref="needForm" @submit="onSubmit">
      <van-cell-group inset title="日期信息">
        <van-field
          v-model="form.measureDate"
          label="测量日期"
          placeholder="请选择期望测量日期"
          input-align="right"
          readonly
          autocomplete="off"
          @click="measureDateShow = true"
          is-link
        />
        <van-field
          v-model="form.deliverDate"
          label="交货日期"
          placeholder="请选择期望交货日期"
          input-align="right"
          readonly
          autocomplete="off"
          @click="deliverDateShow = true"
          is-link
        />
      </van-cell-group>
      <div v-for="(item, i) in needList">
        <van-cell-group class="cell" inset :title="'位置' + (i + 1)">
          <van-field
            v-model="item.location"
            label="位置"
            placeholder="请输入窗帘位置"
            input-align="right"
          />
          <van-field
            v-model="item.type"
            label="窗帘类型"
            placeholder="可选罗马圈/韩式折/蛇形轨/其它"
            input-align="right"
          />
          <van-field
            v-model="item.num"
            label="窗帘数量"
            type="digit"
            placeholder="请输入窗帘数量"
            input-align="right"
          />
          <van-field
            v-model="item.remark"
            label="备注"
            placeholder="请输入备注"
            input-align="right"
            rows="1"
            autosize
            type="textarea"
          />
          <van-button icon="delete" type="danger" @click="removeRow(i)" block>
            删除
          </van-button>
        </van-cell-group>
      </div>
    </van-form>
    <div style="padding: 16px">
      <van-button icon="plus" type="primary" @click="addRow" plain block>
        添加
      </van-button>
    </div>
    <van-sticky position="bottom">
      <div class="button">
        <van-button
          type="primary"
          @click="submit(1)"
          round
          block
          style="margin-right: 8px"
        >
          提 交
        </van-button>
        <van-button
          type="success"
          @click="submit(0)"
          round
          block
          style="margin: 0 8px"
        >
          保 存
        </van-button>
      </div>
    </van-sticky>
    <van-calendar
      v-model:show="measureDateShow"
      title="期望测量日期"
      color="#1989fa"
      @confirm="measureDateConfirm"
    />
    <van-calendar
      v-model:show="deliverDateShow"
      title="期望交货日期"
      color="#1989fa"
      @confirm="deliverDateConfirm"
    />
  </div>
</template>

<script>
import { getNeedDetail, addNeed, editNeed } from '@/api/need'
import { getCustomerDetail } from '@/api/customer'
import store from '@/store'
import dayjs from 'dayjs'
import qs from 'qs'

export default {
  name: 'NeedForm',
  data() {
    return {
      measureDateShow: false,
      deliverDateShow: false,
      needId: this.$route.params.id,
      userInfo: store.state.user.user,
      customerInfo: {},
      needList: [],
      form: {
        status: 0,
        id: null,
        customerId: null,
        measureDate: null,
        deliverDate: null,
        detail: null
      }
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    this.getCustomerDetail()
    if (this.needId) {
      this.getNeedDetail()
    }
  },
  methods: {
    async getCustomerDetail() {
      const customer = await getCustomerDetail({ userId: this.userInfo.userId })
      if (customer.data.success) {
        this.customerInfo = customer.data.data
        this.form.customerId = customer.data.data.id
      }
    },
    async getNeedDetail() {
      const res = await getNeedDetail({ id: this.needId })
      if (res.data.success) {
        const item = res.data.data
        this.needList = JSON.parse(item.detail)
        item.measureDate =
          item.measureDate === ''
            ? null
            : dayjs(item.measureDate).format('YYYY/MM/DD')
        item.deliverDate =
          item.deliverDate === ''
            ? null
            : dayjs(item.deliverDate).format('YYYY/MM/DD')
        this.form = item
      }
    },
    /** 增行按钮 */
    addRow() {
      this.needList.push({
        location: null,
        type: null,
        num: null,
        remark: null
      })
    },
    /** 删除按钮 */
    removeRow(index) {
      this.$dialog
        .confirm({
          title: '确认删除？'
        })
        .then(() => {
          this.needList.splice(index, 1)
        })
        .catch(() => {})
    },
    measureDateConfirm(date) {
      this.form.measureDate = dayjs(date).format('YYYY-MM-DD')
      this.measureDateShow = false
    },
    deliverDateConfirm(date) {
      this.form.deliverDate = dayjs(date).format('YYYY-MM-DD')
      this.deliverDateShow = false
    },
    submit(status) {
      if (status === 1) {
        this.$dialog
          .confirm({
            title: '提交后无法修改，确认提交？'
          })
          .then(() => {
            this.onSubmit(status)
          })
          .catch(() => {})
      } else {
        this.onSubmit(status)
      }
    },
    onSubmit(status) {
      this.$refs.needForm.validate().then(() => {
        this.form.status = status
        this.form.detail = JSON.stringify(this.needList)
        if (this.needId) {
          editNeed(qs.stringify(this.form))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: status === 0 ? '保存成功' : '提交成功'
                })
                this.$router.go(-1)
              }
            })
            .catch((error) => {
              this.$toast.fail({
                message: error.message
              })
            })
        } else {
          addNeed(qs.stringify(this.form))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: status === 0 ? '保存成功' : '提交成功'
                })
                this.$router.go(-1)
              }
            })
            .catch((error) => {
              this.$toast.fail({
                message: error.message
              })
            })
        }
      })
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

.cell {
  margin-top: var(--van-padding-md);
}

.button {
  padding: var(--van-padding-md);
  display: flex;
}

:deep(.van-field__error-message) {
  text-align: right;
}
</style>
