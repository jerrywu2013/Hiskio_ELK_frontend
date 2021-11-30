<template>
  <q-btn :icon="icon" class="edit" outline size="sm">
    <slot>
      <base-tooltip>{{ $t(`__common.__edit`) }}</base-tooltip>
    </slot>
  </q-btn>
</template>
<script>
import { defineComponent } from "vue";
import BaseTooltip from "../tooltip/BaseTooltip.vue";

export default defineComponent({
  name: "EditBtn",
  props: {
    icon: {
      type: String,
      default: "eva-edit-2-outline"
    }
  },
  components: { BaseTooltip }
});
</script>
