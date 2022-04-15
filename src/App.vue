<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="van-fade">
      <component :is="Component" style="width: 100%" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
