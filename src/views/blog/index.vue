<template>
  <div>
    <MsymlTable
      @handlePageChange="handlePageChange"
      :columns="columns"
      :data="list"
      :page="page"
      :loading="loading"
    >
      <template v-slot:search>
        <n-input
          @keyup.enter="getBlogList(1)"
          v-model:value="searchForm.keyWords"
          placeholder="输入关键词查询"
        ></n-input>
        <n-select
          v-model:value="searchForm.categoryId"
          :options="categoryList"
          placeholder="选择对应分类"
          clearable
          @update:value="getBlogList(1)"
        ></n-select>
        <n-button @click="toDetail()" type="info">新增</n-button>
      </template>
    </MsymlTable>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs, h, computed, getCurrentInstance } from "vue";
import MsymlTable from "comps/MsymlTable.vue";
import { NButton, NImage } from "naive-ui";
import moment from "moment";
import { store } from "store";

export default {
  name: "Blog",
  components: {
    MsymlTable,
  },
  setup() {
    const {proxy} = getCurrentInstance()
    onBeforeMount(() => {
      getBlogList();
      getCategoryList();
    });
    const categoryList = computed(() => {
      return store.state.categoryList;
    });
    const state = reactive({
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 1,
      },
      loading: false,
      columns: [
        {
          title: "封面",
          key: "cover",
          render(row) {
            return h(
              NImage,
              { src: row.cover + "?imageView2/1/w/80/h/80", width: "80" },
              {}
            );
          },
        },
        {
          title: "标题",
          key: "title",
        },
        {
          title: "创建时间",
          key: "createTime",
          render(row) {
            return h(
              "span",
              {},
              {
                default: () =>
                  moment(row.createTime).format("YYYY-MM-DD HH:mm"),
              }
            );
          },
        },
        {
          title: "分类",
          key: "categoryName",
        },
        {
          title: "操作",
          key: "action",
          render(row) {
            return h(
              NButton,
              {
                size: "small",
                onClick: () => toDetail(row),
              },
              {
                default: () => "详情",
              }
            );
          },
        },
      ],
      list: [],
      searchForm: {
        keyWords: null,
        categoryId: null,
      },
      categoryList: [],
    });
    const getBlogList = (index) => {
      if (state.loading) {
        return;
      }
      state.loading = true;
      if (index) {
        state.page.pageIndex = index;
      }
      const { pageIndex, pageSize } = state.page;
      const para = {
        pageNum: (pageIndex - 1) * pageSize + 1,
        pageSize,
        ...state.searchForm,
      };
      proxy.$http
        .getBlogListAPI(para)
        .then((res) => {
          state.list = res.list;
          state.page.totalCount = res.total;
        })
        .catch((error) => {
          message.error(error.message);
        })
        .finally(() => (state.loading = false));
    };
    const getCategoryList = () => {
      if (categoryList.length > 0) {
        return;
      }
      proxy.$http.getAllCategoryAPI().then((res) => {
        res.map((category) => {
          category.label = category.title;
          category.value = category.id;
        });
        store.commit("SET_CATEGORY_LIST", res);
      });
    };
    const toDetail = (row) => {
      if (row) {
        proxy.$router.push({
          path: "blogDetail",
          query: { id: row.id },
        });
      } else {
        proxy.$router.push("blogDetail");
      }
    };
    const handlePageChange = (page) => {
      state.page.pageIndex = page;
      getBlogList();
    };
    return {
      ...toRefs(state),
      getBlogList,
      toDetail,
      handlePageChange,
      getCategoryList,
      categoryList,
    };
  },
};
</script>

<style scoped lang="scss">
.cover {
  width: 100px;
  height: 100px;
}
</style>
