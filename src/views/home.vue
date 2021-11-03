<template>
    <div>
      home
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from"vue";
import {useRouter, useRoute} from 'vue-router'

export default {
    name: "",
    components:{

    },
    setup() {
      const router = useRouter();
      const route = useRouter();
      onMounted(() => {
        checkLogin()
      })
      const checkLogin = () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          router.push("/login")
        }
      }
      const state = reactive({

      });
      return {
        ...toRefs(state),
      };
    },
};
</script>

<style scoped lang="scss">

</style>
