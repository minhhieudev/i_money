<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { useRoute } from "vue-router";
import { computed } from "vue";

import { PUBLIC_LAYOUT } from "@/constants";
export default defineComponent({
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
    };
  },
});
</script>
