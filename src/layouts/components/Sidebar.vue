<template>
  <div>
    <logo :collapse="isShrink" />
    <n-menu
      :options="menuOptions"
      :collapsed="isShrink"
      :value="activeMenu"
      :render-label="renderMenuLabel"
      @update:value="handleCheck"
      @update:expanded-keys="handleUpdateExpandedKeys"
      wrap-class="scrollbar-wrapper"
    >
    </n-menu>
  </div>
</template>
<script>
import logo from "./Logo.vue";
import { onMounted, h, reactive, toRefs, computed, watch } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";
import { store } from "store";

export default {
  name: "Sidebar",
  components: {
    logo,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      let arr = router.options.routes;
      let options = [];
      arr.map((item) => {
        if (!item.hidden) {
          let option = {};
          let showItem = item.children.filter((item) => !item.hidden);
          if (showItem.length === 1) {
            option = {
              label: showItem[0].meta.title,
              key:
                (item.path == "/" ? item.path : item.path + "/") +
                showItem[0].path,
              icon: renderIcon(showItem[0].meta.icon),
              isTop: true,
            };
          } else {
            let childrens = [];
            showItem.map((sItem) => {
              childrens.push({
                label: sItem.meta.title,
                key: item.path + "/" + sItem.path,
                icon: renderIcon(sItem.meta.icon),
              });
            });
            option = {
              label: item.meta.title,
              key: item.path,
              isTop: true,
              icon: renderIcon(item.meta.icon),
              children: childrens,
            };
          }
          options.push(option);
        }
      });
      state.menuOptions = options;
    });
    // watch(route, () => {
    //   activeMenu()
    // });
    const renderIcon = (icon) => {
      return () =>
        h("i", { class: "iconfont " + icon }, { default: () => h(icon) });
    };
    const isShrink = computed(() => {
      return store.state.sidebar;
    });
    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    const state = reactive({
      menuOptions: [],
    });
    const handleUpdateExpandedKeys = (keys) => {
    };
    const handleCheck = (key, item) => {
      if (isShrink.value) {
        if (!item.isTop) {
          router.push(key);
        }
      }
    };
    return {
      ...toRefs(state),
      renderIcon,
      handleUpdateExpandedKeys,
      isShrink,
      activeMenu,
      handleCheck,
      renderMenuLabel(option) {
        if (option.children && option.children.length > 1) {
          return h("span", {}, { default: () => option.label });
        }
        return h(
          RouterLink,
          { to: option.key },
          { default: () => option.label }
        );
      },
    };
  },
};
</script>
