<template>
  <div class="app-wrapper">
    <div class="app-wrapper__header">
      <van-sticky>
        <van-nav-bar
          :title="$route.meta.title"
          left-text="返回"
          left-arrow
          :right-text="rightText"
          @click-left="$router.go(-1)"
          @click-right="onClickRight"
        />
      </van-sticky>
    </div>
    <div class="app-wrapper__content">
      <router-view v-if="isRouterAlive" v-slot="{ Component }">
        <transition mode="out-in" name="van-fade">
          <keep-alive :include="keepAliveRoutes">
            <component
              :is="Component"
              @setter="headSetter"
              style="width: 100%"
            />
          </keep-alive>
        </transition>
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
      rightText: null,
      route: null,
      isRouterAlive: true
    }
  },
  created() {
    this.rightText = null
    this.route = null
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    onClickRight() {
      this.$router.push(this.route)
      this.rightText = null
      this.route = null
    },
    headSetter(param) {
      this.rightText = param.rightText
      this.route = param.route
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';

.app-wrapper {
  .clearfix();
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
  background-color: #f7f8fa;
}

.app-wrapper__header {
  flex: 0;
}

.app-wrapper__content {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
