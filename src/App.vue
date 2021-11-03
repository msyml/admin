<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
  >
  <n-message-provider>
    <n-theme-editor>
      <router-view></router-view>
    </n-theme-editor>
  </n-message-provider>
  </n-config-provider>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import json from "./static/overrideTheme.json";
import { zhCN, dateZhCN } from "naive-ui";

export default {
  name: "Setting",
  components: {},
  setup() {
    onMounted(() => {
      state.themeOverrides = json;
    });
    const state = reactive({
      themeOverrides: {},
    });
    return {
      ...toRefs(state),
      zhCN,
      dateZhCN,
      locale: ref(zhCN),
      dateLocale: ref(dateZhCN),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
