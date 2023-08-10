<template>
  <!-- Start Info -->
  <div class="row" v-if="user">
    <div class="container mx-auto p-8">
      <div class="text-center">
        <div class="w-24 h-auto rounded-full overflow-hidden mx-auto">
          <img
            size="xs"
            src="../assets/Image/2.png"
            alt="User profile avatar"
            class="w-full h-auto object-cover"
          />
        </div>
        <div class="text-bold text-2xl text-primary mt-3">
          {{ user.displayName }}
        </div>
        <div class="font-semibold text-gray-400 mt-1">{{ user.email }}</div>
      </div>
    </div>
  </div>
  <!-- Start Menu -->
  <div class="row">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <h3 class="font-bold text-xl text-primary mb-2">General</h3>
        </div>
        <div class="col-span-1">
          <ul>
            <li
              v-for="(profileOption, index) in proFileOptions"
              :key="profileOption.name"
            >
              <router-link
                :to="profileOption.route"
                class="flex justify-between items-center py-3"
              >
                <div
                  class="flex items-center text-left"
                  :class="{ 'text-red': index === proFileOptions.length - 1 }"
                >
                  <i class="t2ico text-2xl" :class="profileOption.icon"></i>
                  <h5 class="font-semibold ml-3">{{ profileOption.name }}</h5>
                </div>
                <div class="text-right">
                  <i class="t2ico t2ico-arrow-right"></i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { PROFILE_OPTIONS } from "@/constants";
import { useUser } from "@/composable/useUser";
export default {
  setup() {
    const proFileOptions = reactive(PROFILE_OPTIONS);

    const { getUser } = useUser();
    const { user } = getUser();
    return { proFileOptions, user };
  },
};
</script>
