<template>
    <div>
      setting
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from"vue";

export default {
    name: "Setting",
    components:{

    },
    setup() {
      onMounted(() => {

      })
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
