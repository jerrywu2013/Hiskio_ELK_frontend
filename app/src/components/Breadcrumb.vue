<template>
  <div class="row">
    <div class="col">
      <div class="text-h6">
        {{ $t(title) }}
        <slot name="badge"></slot>
      </div>
      <q-breadcrumbs>
        <q-breadcrumbs-el
          :label="$t(`__common.__home`)"
          :to="{ name: 'Index' }"
          icon="eva-home-outline"
        ></q-breadcrumbs-el>

        <q-breadcrumbs-el
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb"
          :label="$t(breadcrumb)"
        ></q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div class="col text-right q-pt-sm q-gutter-sm q-pr-sm">
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Breadcrumb",
  props: {
    title: String,
    breadcrumbs: Array
  }
});
</script>
