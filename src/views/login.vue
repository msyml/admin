<template>
  <n-spin :show="show">
    <div class="login_body">
      <n-card class="login_card" hoverable>
        <h1>系统登录</h1>
        <n-form class="">
          <n-form-item>
            <n-input
              v-model:value="userInfor.username"
              placeholder="用户名"
              clearable
            >
              <template #prefix>
                <i class="iconfont icon-aboutme"></i>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-input
              type="password"
              show-password-toggle
              placeholder="密码"
              @keypress.enter="login"
              v-model:value="userInfor.password"
            >
              <template #prefix>
                <i class="iconfont icon-permission"></i>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button  block type="info" @click="login">登录</n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </n-spin>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance} from "vue";
import * as api from "utils/api";
import { useRouter } from "vue-router";

export default {
  name: "",
  components: {},
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    onMounted(() => {
    });
    const state = reactive({
      userInfor: {
        password: "",
        username: "",
      },
      show: false
    });
    const login = () => {
      if (state.show) {
        return;
      }
      state.show = true;
      const para = {
        ...state.userInfor,
      };
      api
        .login(para)
        .then((res) => {
          sessionStorage.setItem("token", res.token);
          router.push("/home");
        })
        .catch((err) => {
          proxy.$message.error(err.message)})
        .finally(() => {
      state.show = false;

        });
    };
    return {
      ...toRefs(state),
      login,
    };
  },
};
</script>

<style scoped lang="scss">
.login_body {
  height: 100vh;
  .login_card {
    width: 30%;
    position: absolute;
    top: 20%;
    left: 35%;
    min-width: 300px;
  }
}
</style>
