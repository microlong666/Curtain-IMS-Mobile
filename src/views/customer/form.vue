<template>
  <div class="content">
    <van-form ref="customerForm" @submit="onSubmit" class="form">
      <van-cell-group inset>
        <van-field
          v-model="form.name"
          :rules="rules.name"
          label="客户姓名"
          placeholder="请输入客户姓名"
          input-align="right"
        />
        <van-field
          v-model="form.phone"
          :rules="rules.phone"
          label="客户电话"
          placeholder="请输入客户电话"
          input-align="right"
        />
        <van-field
          v-model="form.address"
          label="客户地址"
          placeholder="请输入客户地址"
          input-align="right"
          rows="1"
          autosize
          type="textarea"
        />
        <van-field
          v-model="form.measureAt"
          is-link
          readonly
          label="测量日期"
          placeholder="请选择测量日期"
          input-align="right"
          @click="showMeasureAt = true"
        />
        <van-field
          v-model="form.remeasureAt"
          is-link
          readonly
          label="重测日期"
          placeholder="请选择重测日期"
          input-align="right"
          @click="showRemeasureAt = true"
        />
        <van-field
          v-model="form.orderAt"
          is-link
          readonly
          label="订货日期"
          placeholder="请选择订货日期"
          input-align="right"
          @click="showOrderAt = true"
        />
        <van-field
          v-model="form.deliverAt"
          is-link
          readonly
          label="交货日期"
          placeholder="请选择交货日期"
          input-align="right"
          @click="showDeliverAt = true"
        />
        <van-field v-if="!customerId" label="生成账号" input-align="right">
          <template #input>
            <van-radio-group
              v-model="form.isCreateAccount"
              direction="horizontal"
            >
              <van-radio name="1">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div class="button">
        <van-button native-type="submit" type="primary" round block>
          保 存
        </van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showMeasureAt" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="测量日期"
        :min-date="minDate"
        @confirm="measureAtConfirm"
        @cancel="showMeasureAt = false"
      />
    </van-popup>
    <van-popup v-model:show="showRemeasureAt" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="重测日期"
        :min-date="minDate"
        @confirm="remeasureAtConfirm"
        @cancel="showRemeasureAt = false"
      />
    </van-popup>
    <van-popup v-model:show="showOrderAt" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="订货日期"
        :min-date="minDate"
        @confirm="orderAtConfirm"
        @cancel="showOrderAt = false"
      />
    </van-popup>
    <van-popup v-model:show="showDeliverAt" position="bottom">
      <van-datetime-picker
        type="datetime"
        title="交货日期"
        :min-date="minDate"
        @confirm="deliverAtConfirm"
        @cancel="showDeliverAt = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getCustomerDetail, addCustomer, editCustomer } from '@/api/customer'
import dayjs from 'dayjs'
import qs from 'qs'

export default {
  name: 'CustomerForm',
  data() {
    return {
      showMeasureAt: false,
      showRemeasureAt: false,
      showOrderAt: false,
      showDeliverAt: false,
      customerId: this.$route.params.id,
      minDate: new Date(dayjs(new Date()).format('YYYY')),
      form: {
        id: null,
        name: null,
        phone: null,
        address: null,
        measureAt: null,
        remeasureAt: null,
        orderAt: null,
        deliverAt: null,
        isCreateAccount: '1'
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入客户姓名',
            trigger: 'onBlur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入客户姓名',
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    if (this.customerId) {
      this.getCustomerDetail()
    }
  },
  methods: {
    async getCustomerDetail() {
      const res = await getCustomerDetail({ id: this.customerId })
      if (res.data.success) {
        const item = res.data.data
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
        this.form = item
        this.loading = false
      }
    },
    measureAtConfirm(date) {
      this.form.measureAt = dayjs(date).format('YYYY-MM-DD HH:mm')
      this.showMeasureAt = false
    },
    remeasureAtConfirm(date) {
      this.form.remeasureAt = dayjs(date).format('YYYY-MM-DD HH:mm')
      this.showRemeasureAt = false
    },
    orderAtConfirm(date) {
      this.form.orderAt = dayjs(date).format('YYYY-MM-DD HH:mm')
      this.showOrderAt = false
    },
    deliverAtConfirm(date) {
      this.form.deliverAt = dayjs(date).format('YYYY-MM-DD HH:mm')
      this.showDeliverAt = false
    },
    onSubmit() {
      this.$refs.customerForm.validate().then(() => {
        if (this.customerId) {
          this.form.id = this.customerId
          editCustomer(qs.stringify(this.form))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: '保存成功'
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
          addCustomer(qs.stringify(this.form))
            .then((res) => {
              if (res.data.success) {
                this.$toast.success({
                  message: '保存成功'
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

.form {
  margin-top: var(--van-padding-md);
}

.content {
  padding-bottom: var(--van-padding-md);
}

.button {
  padding: 32px 16px 0 16px;
}

:deep(.van-field__error-message) {
  text-align: right;
}
</style>
