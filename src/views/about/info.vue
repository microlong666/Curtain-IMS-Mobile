<template>
  <van-pull-refresh
    class="refresh"
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="getUserInfo()"
  >
    <div class="content">
      <van-cell-group inset>
        <van-cell
          :title="'账号: ' + userInfo.account"
          :value="'注册时间: ' + createTime"
        />
        <van-cell center is-link>
          <template #title>
            <span @click="previewAvatar">头像</span>
          </template>
          <template #value>
            <van-uploader :after-read="uploadAvatar">
              <van-image
                round
                fit="cover"
                width="80"
                height="80"
                src="/api/system/previewAvatar"
              />
            </van-uploader>
          </template>
        </van-cell>
      </van-cell-group>
      <van-form ref="userForm" @submit="onSubmit" class="form">
        <van-cell-group inset>
          <van-field
            label="姓名"
            placeholder="姓名"
            input-align="right"
            v-model="form.name"
            :rules="rules.name"
            @update:model-value="showButton()"
            is-link
          />
          <van-field
            label="手机号"
            placeholder="手机号"
            input-align="right"
            v-model="form.phone"
            :rules="rules.phone"
            @update:model-value="showButton()"
            is-link
          />
          <van-field
            label="地址"
            placeholder="地址"
            input-align="right"
            v-model="form.address"
            :rules="rules.address"
            v-if="userInfo.roleName === '客户'"
            rows="1"
            autosize
            type="textarea"
            @update:model-value="showButton()"
            is-link
          />
        </van-cell-group>

        <van-cell-group inset style="margin-top: 16px">
          <van-cell title="修改密码" to="pwd" is-link />
        </van-cell-group>
        <div class="button" v-if="buttonShow">
          <van-button native-type="submit" type="primary" round block>
            保 存
          </van-button>
        </div>
      </van-form>
    </div>
  </van-pull-refresh>
</template>

<script>
import {
  uploadAvatar,
  updateAvatar,
  getUserDetail,
  editUserInfo
} from '@/api/user'
import { editCustomer } from '@/api/customer'
import { ImagePreview } from 'vant'
import dayjs from 'dayjs'
import qs from 'qs'
import store from '@/store'

export default {
  name: 'UserInfo',
  inject: ['reload'],
  data() {
    return {
      isLoading: false,
      buttonShow: false,
      userInfo: store.state.user.user,
      createTime: dayjs(store.state.user.user.createTime).format('YYYY-MM-DD'),
      form: {
        customerId: '',
        name: '',
        phone: '',
        address: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'onBlur'
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入11位手机号',
            trigger: 'onBlur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'onBlur'
          }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.isLoading = true
      getUserDetail().then((res) => {
        if (res.data.success) {
          this.form = res.data.data
          this.isLoading = false
        }
      })
    },
    async uploadAvatar(file) {
      const data = new FormData()
      data.append('file', file.file)
      const result = await uploadAvatar(data)
      console.log(result)
      if (result.data.success) {
        updateAvatar(qs.stringify({ fileId: result.data.data?.fileId }))
          .then(() => {
            this.$toast.success({ message: '上传成功' })
            this.reload()
          })
          .catch((error) => {
            this.$toast.fail({ message: error.message })
          })
      }
    },
    previewAvatar() {
      ImagePreview({ images: ['/api/system/previewAvatar'], closeable: true })
    },
    showButton() {
      this.buttonShow = true
    },
    onSubmit() {
      this.$dialog
        .confirm({
          title: '确认保存？'
        })
        .then(() => {
          this.$refs.userForm.validate().then(() => {
            editUserInfo(qs.stringify(this.form))
              .then((res) => {
                if (res.data.success) {
                  this.$store.dispatch('user/setUser', this.form)
                  if (this.userInfo.roleName === '客户') {
                    this.form.id = this.form.customerId
                    editCustomer(qs.stringify(this.form))
                      .then((res) => {
                        if (res.data.success) {
                          this.$toast.success({
                            message: '保存成功'
                          })
                        }
                      })
                      .catch((error) => {
                        this.$toast.fail({
                          message: error.message
                        })
                      })
                  } else {
                    this.$toast.success({
                      message: '保存成功'
                    })
                  }
                }
              })
              .catch((error) => {
                this.$toast.fail({
                  message: error.message
                })
              })
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.refresh {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content,
.form {
  padding: var(--van-padding-md) 0;
}

.button {
  padding: 32px 16px 0 16px;
}

:deep(.van-field__error-message) {
  text-align: right;
}
</style>
