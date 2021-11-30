<template>
  <q-btn outline text-color="red-5" icon="eva-trash-2-outline" size="sm">
    <slot>
      <base-tooltip>{{ $t(`__common.__delete`) }}</base-tooltip>
    </slot>
  </q-btn>
</template>
<script>
import { defineComponent } from "vue";
import BaseTooltip from "../tooltip/BaseTooltip.vue";

export default defineComponent({
  name: "DeleteBtn",
  components: { BaseTooltip }
});
</script>
