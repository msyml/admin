<template>
  <div class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const router = new useRouter();
    const key = () => {
      return router.path;
    }
    return {
      key
    }
  }
}
</script>

<style></style>
