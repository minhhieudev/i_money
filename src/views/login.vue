<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
      <form
        class="flex flex-col justify-start space-y-6"
        @submit.prevent="onSubmit"
      >
        <div class="row">
          <label class="flex flex-col" for="email">
            <span class="font-semibold">Email Adress</span>
            <input
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              type="email"
              name=""
              id="email"
              placeholder="example@gmail.com"
              v-model="email"
            />
          </label>
        </div>
        <div class="row">
          <label class="flex flex-col" for="pasword">
            <span class="font-semibold">Password</span>
            <input
              class="px-4 py-3 rounded-lg border border-gray-100 mt-1"
              autocomplete="current-password"
              type="password"
              name=""
              id="password"
              placeholder="Example"
              v-model="password"
            />
          </label>
        </div>
        <div class="row">
          <button
            type="submit"
            class="py-3 text-center w-full bg-primary text-white font-bold rounded-lg"
          >
            Sign In
          </button>
        </div>
      </form>

      <div class="w-full text-center mt-6">
        <span class="font-semibold">I'm a new user</span>
        <span class="ml-1">
          <router-link
            :to="{ name: 'Register', params: {} }"
            class="text-primary font-bold"
            >Sign In</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useSignIn } from "@/composable/useSignIn";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, isPending, signin } = useSignIn();
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    async function onSubmit() {
      await signin(email.value, password.value);
      if (!error.value) router.push({ name: "Profile", params: {} });
    }
    return { email, password, onSubmit, error, isPending };
  },
};
</script>
