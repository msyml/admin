<template>
  <div class="detail">
    <n-spin :show="loading">

    <n-form label-placement="top">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="标题" path="inputValue">
          <n-input placeholder="在此输入标题" v-model:value="form.title" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="排序" path="inputValue">
          <n-input placeholder="在此输入排序" v-model:value="form.sort" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="分类" path="inputValue">
          <n-select
            placeholder="在此选择分类"
            :options="categoryList"
            v-model:value="form.categoryId"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="封面" path="inputValue">
          <input
            ref="inputElRef"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            @change="sendImage"
            v-show="false"
          />
          <n-button v-if="!form.cover" @click="uploadImage">上传文件</n-button>
          <n-image :src="form.cover + '?imageView2/1/w/80/h/80'" v-else />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="内容" path="inputValue">
          <v-md-editor height="500px" v-model="form.content"></v-md-editor>
        </n-form-item-gi>
        <n-form-item-gi :span="24">
          <n-button @click="saveBlog" type="info">提交</n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    </n-spin>
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  toRefs,
  computed,
  getCurrentInstance,
} from "vue";
import { store } from "store";

export default {
  name: "BlogDetail",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    onMounted(() => {});
    const categoryList = computed(() => {
      return store.state.categoryList;
    });
    const state = reactive({
      form: {
        title: "",
        sort: "",
        categoryId: "",
        cover: "https://qiniu.msyml.cn/326806a2fe1947bdb097e0e33a8e9465.gif",
        content: "",
      },
      loading: false,
    });
    const saveBlog = () => {
      if (state.loading) {
        return;
      }
      state.loading = true;
      const para = {
        ...state.form
      }
      proxy.$http.saveBlogAPI(para).then(() =>{
        proxy.$router.back();
      })
    };
    const uploadImage = () => {
      proxy.$refs.inputElRef.click();
    };
    const sendImage = (e) => {
      let data = new FormData();
      data.append("file", e.target.files[0]);
      proxy.$http.uploadFileAPI(data).then((res) => {
        state.form.cover ="https://" +  res ;
      });
    };
    return {
      ...toRefs(state),
      categoryList,
      saveBlog,
      uploadImage,
      sendImage,
    };
  },
};
</script>

<style scoped lang="scss">
.detail {
  padding: 8px;
  .upload {
    height: 100px;
    width: 100px;
    padding: 8px;
    border: 1px solid #eee;
  }
}
</style>
