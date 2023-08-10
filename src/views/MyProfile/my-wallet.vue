<template>
  <div class="bg-gray-100">
    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-4">
      <router-link to="/profile" class="text-no-underline">
        <font-awesome-icon
          :icon="arrowLeft"
          class="text-2xl cursor-pointer"
          @click="goBack"
        />
      </router-link>
      <div class="text-2xl font-bold ml-2">My Wallets</div>
      <div class="ml-auto">
        <font-awesome-icon :icon="search" class="text-2xl cursor-pointer" />
      </div>
    </div>

    <!-- Include In Total -->
    <div class="text-sm font-bold mt-6 ml-3">Include In Total</div>

    <!-- Wallet Item -->
    <router-link to="/profile/my-wallet/edit-wallet" class="text-no-underline">
      <div class="flex items-center mt-4 bg-white cursor-pointer">
        <div class="inline-block w-6 h-6 ml-2 mt-2">
          <img
            src="../../assets/Image/vi.jpg"
            alt="Circle"
            class="w-6 h-6 bg-green-500 rounded-full mx-auto my-1"
          />
        </div>
        <div class="flex flex-col ml-2">
          <div class="text-lg font-bold">Cash</div>
          <div class="text-sm">{{ currentBalanceNumber }} đ</div>
        </div>
        <font-awesome-icon
          :icon="ellipsisV"
          class="text-3xl ml-auto mr-2 cursor-pointer"
        />
      </div>
    </router-link>

    <!-- Add Wallet Button -->
    <div class="absolute bottom-4 right-4">
      <div
        class="w-12 h-12 bg-green-500 rounded-full flex justify-center items-center cursor-pointer"
        @click="showAddWalletPopup = true"
      >
        <span class="text-white text-lg font-bold">+</span>
      </div>
    </div>

    <!-- Add Wallet Popup -->
    <div
      v-if="showAddWalletPopup"
      class="fixed inset-0 flex justify-center items-end bg-black bg-opacity-50"
    >
      <div class="w-full max-w-md bg-white rounded-t-lg rounded-b-none p-4">
        <div class="text-xl font-bold mb-2">Add Wallet</div>
        <div class="grid grid-cols-2 gap-4 w-100">
          <div v-for="index in 4" :key="index">
            <div
              class="flex items-center border rounded p-2 text-white font-bold text-center cursor-pointer hover:bg-gray-700"
              :class="`bg-${walletColor[index - 1]}`"
            >
              <p>{{ walletNames[index - 1] }}</p>
              <font-awesome-icon
                :icon="questionCircle"
                class="text-xl ml-auto cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Clickable overlay to close popup -->
      <div class="fixed inset-0" @click="closeAddWalletPopup"></div>
    </div>
  </div>
</template>

<script>
import {
  faArrowLeft,
  faSearch,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MyWallets",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      arrowLeft: faArrowLeft,
      search: faSearch,
      ellipsisV: faEllipsisV,
      questionCircle: faQuestionCircle,
      showAddWalletPopup: false,
      walletNames: [
        "Basic Wallet",
        "Linked Wallet",
        "Credit Wallet",
        "Goal Wallet",
      ],
      walletColor: ["blue-500", "yellow-500", "purple-600", "pink-500"],
    };
  },
  methods: {
    // ... other methods ...

    openAddWalletPopup() {
      this.showAddWalletPopup = true;
    },
    closeAddWalletPopup() {
      this.showAddWalletPopup = false;
    },
    selectWallet(index) {
      console.log(index);
    },
    addWallet() {
      // Handle adding wallet logic
    },
  },
};
</script>

<style scoped>
/* Your custom styles can go here */
</style>
