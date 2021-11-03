<template>
  <div class="navbar">
    <div class="hamburger-container" @click="changeSideBar">
      <i :class="{ 'is-active': isOpen }" class="hamburger iconfont icon-shousuo"></i>
    </div>
    <!-- 面包屑 -->
    <n-breadcrumb class="breadcrumb-container">
      <n-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <span class="text" v-if="item.redirect === 'noRedirect' || index == breadList.length - 1">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="right-menu">
      <!-- <i class="iconfont icon-sousuo right-menu-item hover-effect"></i>
      <i
        class="iconfont right-menu-item hover-effect"
        :class="isScreenFull ? 'icon-suoxiao' : 'icon-fangda'"
        @click="changeScreenFull"
      ></i> -->
      <!-- 右侧下拉 -->
      <n-dropdown @select="handleSelect" class="avatar-container right-menu-item hover-effect" :options="options" placement="bottom-start" trigger="hover">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://qiniu.msyml.cn/head.jpg?imageView2/1/w/40/h/40" />
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, reactive, toRefs, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from 'store'
import screenfull from 'screenfull'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      getBreadcrumb()
      init()
    })
    onBeforeUnmount(() => {
      destroy()
    })
    const state = reactive({
      options: [
        {
          label: '个人首页',
          key: 'center',
          path: "https://www.msyml.cn",
          action: "open"
        },
        {
          label: '首页',
          key: "home",
          path:"/home",
          action: "push"
        },
        {
          label: '仓库地址',
          key: 'gitee',
          path: "https://gitee.com/a-little-cool",
          action: "open"
        },
        {
          type: 'divider',
          key: 'd1'
        },
        {
          label: '退出登录',
          key: 'exit',
          path:"/login",
          action: "push"
        }
      ],
      breadList: [],
      isScreenFull: false
    })
    watch(route, () => {
      getBreadcrumb()
    })
    const isOpen = computed(() => {
      return store.state.sidebar
    })
    const handleSelect = (key, item) => {
      if (item.action === "push") {
        router.push(item.path);
      }else if (item.action === "open"){
        window.open(item.path,"_blank")
      }
    }
    const changeSideBar = () => {
      store.commit('TOGGLE_SIDEBAR')
    }
    const getBreadcrumb = () => {
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      const first = matched[0]
      if (!isHome(first)) {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }
      state.breadList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const isHome = () => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    }
    const handleLink = (item) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      router.push(path)
    }
    const changeScreenFull = () => {
      screenfull.toggle()
    }
    const change = () => {
      state.isFullscreen = screenfull.isFullscreen
    }
    const init = () => {
      screenfull.on('change', change)
    }
    const destroy = () => {
      screenfull.off('change', change)
    }
    return {
      ...toRefs(state),
      handleSelect,
      changeSideBar,
      isOpen,
      handleLink,
      changeScreenFull
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    width: 46px;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 50px;
      font-size: 20px;
      font-weight: bold;
      height: 50px;
    }

    .hamburger.is-active {
      transform: rotate(180deg);
    }
  }

  .breadcrumb-container {
    float: left;
    height: 50px;
    line-height: 50px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-wrapper {
      margin-top: 5px;
      margin-right: 20px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
  }
}
</style>
