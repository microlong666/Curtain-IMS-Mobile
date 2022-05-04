<template>
  <div class="content">
    <van-form ref="supplierForm" @submit="onSubmit" class="form">
      <van-cell-group inset>
        <van-field
          v-model="form.name"
          :rules="rules.name"
          label="供应商名称"
          placeholder="请输入供应商名称"
          input-align="right"
        />
        <van-field
          v-model="form.phone"
          :rules="rules.phone"
          label="供应商电话"
          placeholder="请输入供应商电话"
          input-align="right"
        />
        <van-field
          v-model="form.address"
          :rules="rules.address"
          label="供应商地址"
          placeholder="请输入供应商地址"
          input-align="right"
          rows="1"
          autosize
          type="textarea"
        />
      </van-cell-group>
      <div class="button">
        <van-button native-type="submit" type="primary" round block>
          保 存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSupplierDetail, addSupplier, editSupplier } from '@/api/supplier'
import qs from 'qs'

export default {
  name: 'SupplierForm',
  data() {
    return {
      supplierId: this.$route.params.id,
      form: {
        id: null,
        name: null,
        phone: null,
        address: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入供应商名称',
            trigger: 'onBlur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入供应商电话',
            trigger: 'onBlur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入供应商地址',
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  created() {
    this.$emit('setter', { rightText: null, route: null })
    if (this.supplierId) {
      this.getSupplierDetail()
    }
  },
  methods: {
    async getSupplierDetail() {
      const res = await getSupplierDetail({ id: this.supplierId })
      if (res.data.success) {
        const item = res.data.data
        this.form = item
        this.loading = false
      }
    },
    onSubmit() {
      this.$refs.supplierForm.validate().then(() => {
        if (this.supplierId) {
          this.form.id = this.supplierId
          editSupplier(qs.stringify(this.form))
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
          addSupplier(qs.stringify(this.form))
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
