<template>
  <q-btn :label="$t(`__common.__close`)" color="primary" flat v-close-popup></q-btn>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CloseBtn"
});
</script>
