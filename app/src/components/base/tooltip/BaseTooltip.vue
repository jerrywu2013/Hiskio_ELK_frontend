<template>
  <q-tooltip
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :delay="delay"
    :hide-delay="hideDelay"
    :content-class="contentClass"
    :offset="offset"
    :anchor="anchor"
    :self="self"
    :max-width="maxWidth"
  >
    <slot></slot>
  </q-tooltip>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTooltip",
  props: {
    text: {
      type: String,
      require: true
    },
    delay: Number,
    hideDelay: {
      type: Number,
      default: 0
    },
    contentClass: String,
    offset: {
      type: Array,
      default: () => [8, 8]
    },
    transitionShow: {
      type: String,
      default: "flip-right"
    },
    transitionHide: {
      type: String,
      default: "flip-left"
    },
    anchor: String,
    self: String,
    maxWidth: String
  }
});
</script>
