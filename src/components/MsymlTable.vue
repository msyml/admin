<template>
  <div class="msyml-table">
    <div id="search" class="search">
      <slot name="search"></slot>
    </div>
    <n-spin :show="loading">
      <n-data-table
        :columns="columns"
        :data="data"
        class="table"
        :max-height="tableHeight"
      ></n-data-table>
    </n-spin>
    <n-pagination
      id="page"
      class="page"
      v-if="page"
      @change="handlePageChange"
      :page-size="page.pageSize"
      :item-count="page.totalCount"
    >
      <template #suffix="{}"> 共{{ page.totalCount }}条 </template>
    </n-pagination>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";

export default {
  name: "",
  components: {},
  props: {
    columns: {},
    data: {},
    page: {},
    loading: false,
  },
  setup(props, context) {
    onMounted(() => {
      calcTableHeight();
    });
    const state = reactive({
      tableHeight: 500,
    });
    const handlePageChange = (page) => {
      context.emit("handlePageChange", page);
    };
    const calcTableHeight = () => {
      const search = document.getElementById("search");
      const page = document.getElementById("page");
      state.tableHeight =
        document.documentElement.clientHeight -
        search?.clientHeight -
        page?.clientHeight -
        60;
    };
    return {
      ...toRefs(state),
      handlePageChange,
    };
  },
};
</script>

<style scoped lang="scss">
.msyml-table {
  padding: 4px 8px;
  height: calc(100vh - 58px);
  .search {
    display: flex;
    margin: 8px 0;
  }
  .page {
    position: absolute;
    right: 8px;
    bottom: 4px;
  }
}
</style>
