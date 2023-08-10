<template>
  <header id="header" class="py-8">
    <div class="container mx-auto px-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div
            v-if="meta.leading"
            class="w-10 h-10 overflow-hidden rounded-full"
          >
            <img
              src="../assets/Image/1.png"
              class="w-full h-auto object-cover"
              size="sm"
              alt=""
            />
          </div>
          <h1 class="text-xl font-bold text-dark nl-2">
            Hey {{ user.displayName }}
          </h1>
        </div>
        <div class="flex">
          <ul>
            <li v-if="meta.icon">
              <i class="t2ico text-2xl" :class="meta.icon"></i>
            </li>
            <li v-else>
              <Button>{{ meta.bt }}</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useUser } from "@/composable/useUser";

export default {
  setup() {
    const router = useRoute();
    const { getUser } = useUser();
    const { user } = getUser();

    return {
      meta: computed(() => router.meta),
      user,
    };
  },
};
</script>
