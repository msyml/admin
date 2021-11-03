<template>
    <div>
menu
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from"vue";

export default {
    name: "Menu",
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
