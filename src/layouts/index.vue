<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右侧内容 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <navbar class="header"></navbar>
      <!-- 内容区域 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { onMounted, h, reactive, toRefs, computed } from "vue";
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { store } from "store";

export default {
  name:"index",
  components: {
    AppMain, Navbar, Sidebar
  },
  setup(){
    const classObj = computed(() => {
      return {
        hideSidebar: store.state.sidebar,
        openSidebar: !store.state.sidebar,
      }
    })
    return {
      classObj,
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/mixin.scss';
@import 'styles/variables.scss';


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index:9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
</style>
