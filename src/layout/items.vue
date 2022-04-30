<template>
  <div class="app-wrapper">
    <div class="app-wrapper__header">
      <van-sticky>
        <van-nav-bar
          :title="$route.meta.title"
          left-text="返回"
          left-arrow
          @click-left="$router.push('home')"
        />
        <van-tabs v-model:active="active" color="#1989fa" animated>
          <van-tab v-for="item in tabList" :title="item.title" :to="item.to" />
        </van-tabs>
      </van-sticky>
    </div>
    <div class="app-wrapper__content">
      <router-view v-if="isRouterAlive" v-slot="{ Component }">
        <transition mode="out-in" name="van-fade">
          <keep-alive :include="keepAliveRoutes">
            <component :is="Component" style="width: 100%" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import store from '@/store'

export default {
  name: 'TabLayout',
  provide() {
    return {
      reload: this.reload
    }
  },
  setup() {
    const keepAliveRoutes = computed(() => store.getters.cachedViews)
    const active = ref(0)
    const tabList = reactive([
      {
        title: '成品帘',
        to: 'curtain'
      },
      {
        title: '主布',
        to: 'mainFabric'
      },
      {
        title: '里布',
        to: 'insideFabric'
      },
      {
        title: '窗纱',
        to: 'sheerCurtain'
      },
      {
        title: '导轨',
        to: 'track'
      },
      {
        title: '配件',
        to: 'accessory'
      },
      {
        title: '辅料',
        to: 'adjuvant'
      }
    ])
    return {
      keepAliveRoutes,
      active,
      tabList
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
