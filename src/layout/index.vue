<template>
  <div class="app-wrapper">
    <div class="app-wrapper__content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="app-wrapper__footer">
      <tabbar />
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import { computed } from 'vue'
import store from '@/store'
import { getUserInfo } from '@/api/user'

export default {
  name: 'Layout',
  components: {
    Tabbar
  },
  setup() {
    const keepAliveRoutes = computed(() => store.getters.cachedViews)

    return {
      keepAliveRoutes
    }
  },
  created() {
    this.getCurrentUserinfo()
  },
  methods: {
    // 获取当前用户信息
    getCurrentUserinfo() {
      getUserInfo()
        .then((res) => {
          const result = res.data
          if (res.data.success) {
            const user = result.data
            this.$store.dispatch('user/setUser', user)
            this.$store.dispatch(
              'user/setRoles',
              user ? { roleId: user.roleId, roleName: user.roleName } : null
            )
          } else if (result.message) {
            this.$toast.fail({
              message: result.message
            })
          }
        })
        .catch((error) => {
          this.$toast.fail({
            message: error.message
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
