
<template>
  <q-input
    :v-model="filter"
    :loading="loading"
    :placeholder="$t(`__common.__search`)"
    debounce="300"
    dense
  >
    <template #append>
      <q-icon name="eva-search-outline"></q-icon>
    </template>
  </q-input>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    filter: {
      type: String,
      required: true
    },
    loading: { type: Boolean, required: true }
  }
});
</script>
