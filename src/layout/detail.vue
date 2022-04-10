<template>
  <div class="app-wrapper">
    <div class="app-wrapper__header">
      <van-nav-bar
        :title="$route.meta.title"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="app-wrapper__content">
      <router-view v-if="isRouterAlive" v-slot="{ Component }">
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from '@/store'

export default {
  name: 'DetailLayout',
  provide() {
    return {
      reload: this.reload
    }
  },
  setup() {
    const keepAliveRoutes = computed(() => store.getters.cachedViews)
    return {
      keepAliveRoutes
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
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
  background-color: #f7f8fa;
}
</style>
