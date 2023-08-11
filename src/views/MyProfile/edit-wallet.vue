<template>
  <div class="bg-gray-100 w-full h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-4">
      <div class="flex items-center">
        <router-link to="/profile/my-wallet" class="text-no-underline">
          <font-awesome-icon
            :icon="arrowLeft"
            class="text-2xl cursor-pointer"
            @click="goBack"
          />
        </router-link>
        <div class="text-xl font-bold ml-3">Edit Wallet</div>
      </div>
      <div class="text-base text-opacity-50 ml-2 cursor-pointer">SAVE</div>
    </div>

    <!-- Wallet Item -->
    <div class="bg-white">
      <div class="flex items-center mt-4">
        <div class="flex items-center w-12 h-12 ml-2 cursor-pointer">
          <img
            src="../../assets/Image/vi.jpg"
            alt="Circle"
            class="w-full h-full bg-green-500 rounded-full"
          />
        </div>
        <div class="text-lg font-bold ml-4">Cash</div>
      </div>

      <div class="flex mt-4 ml-2">
        <font-awesome-icon
          :icon="dollarSign"
          class="text-xl w-12 cursor-pointer"
        />
        <div class="text-sm font-bold ml-4">Việt Nam đồng</div>
      </div>

      <!-- Enter Current Balance -->
      <div class="bg-white p-4 flex ml-2">
        <div class="w-12"></div>
        <!-- Empty space for icon -->
        <div class="flex flex-col">
          <div class="text-xs font-bold mb-1 opacity-50">
            Enter Current Balance of This Wallet
          </div>
          <div class="flex mt-1">
            <input
              ref="balanceInput"
              type="text"
              v-model="currentBalanceFormatted"
              @input="handleInput"
              @keydown="handleKeyDown"
              placeholder="0Đ"
              class="border-0 border-b-2 border-gray-300 text-2xl focus:outline-none font-semibold text-green-500"
              :style="{ width: `${inputWidth}px` }"
            />
            <div
              v-if="currentBalanceFormatted"
              class="text-xl font-bold ml-2 text-green-500"
            >
              Đ
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="flex items-center mt-4 p-4">
        <div class="flex-grow">
          <div class="text-md font-bold mb-2">Enable Notification</div>
          <div class="text-xs">
            Get notified when there are changes to this wallet's transactions.
          </div>
        </div>
        <label class="flex items-center pl-4">
          <input type="checkbox" class="hidden" v-model="notificationEnabled" />
          <div
            class="w-8 h-4 rounded-full relative"
            :class="{
              ' bg-green-200': notificationEnabled,
              ' bg-gray-200': !notificationEnabled,
            }"
          >
            <div
              class="absolute left-0 top-0 w-4 h-4 rounded-full bg-white transition-transform transform"
              :class="{
                'translate-x-4 bg-green-500': notificationEnabled,
                'translate-x-0 bg-gray-500': !notificationEnabled,
              }"
            ></div>
          </div>
        </label>
      </div>

      <div class="flex items-center mt-2 p-4">
        <div class="flex-grow">
          <div class="text-md font-bold mb-2">Excluded from Total</div>
          <div class="text-xs">
            Ignore this wallet and its balance in the "Total" mode.
          </div>
        </div>
        <label class="flex items-center pl-4">
          <input
            type="checkbox"
            class="hidden"
            v-model="notificationEnabled1"
          />
          <div
            class="w-8 h-4 rounded-full relative"
            :class="{
              ' bg-green-200': notificationEnabled1,
              ' bg-gray-200': !notificationEnabled1,
            }"
          >
            <div
              class="absolute left-0 top-0 w-4 h-4 rounded-full bg-white transition-transform transform"
              :class="{
                'translate-x-4 bg-green-500': notificationEnabled1,
                'translate-x-0 bg-gray-500': !notificationEnabled1,
              }"
            ></div>
          </div>
        </label>
      </div>
    </div>

    <div class="flex items-center mt-4 bg-white p-4">
      <div class="flex-grow">
        <div class="text-md font-bold mb-2">Archive</div>
        <div class="text-xs">
          Freeze this wallet and stop generatings bills & recuring transactions.
        </div>
      </div>
      <label class="flex items-center pl-4">
        <input type="checkbox" class="hidden" v-model="notificationEnabled2" />
        <div
          class="w-8 h-4 rounded-full relative"
          :class="{
            ' bg-green-200': notificationEnabled2,
            ' bg-gray-200': !notificationEnabled2,
          }"
        >
          <div
            class="absolute left-0 top-0 w-4 h-4 rounded-full bg-white transition-transform transform"
            :class="{
              'translate-x-4 bg-green-500': notificationEnabled2,
              'translate-x-0 bg-gray-500': !notificationEnabled2,
            }"
          ></div>
        </div>
      </label>
    </div>

    <!-- Delete Wallet -->
    <div class="flex items-center justify-center">
      <div class="flex mt-4 p-4">
        <font-awesome-icon
          :icon="trashAlt"
          class="text-2xl cursor-pointer text-red-500 mr-2"
        />
        <div class="text-red font-bold">Delete this wallet</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  faArrowLeft,
  faTimes,
  faDollarSign,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapState } from "vuex"; // Import mapState from Vuex

export default {
  name: "EditWallet",
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapState(["currentBalance"]), // Map currentBalance from Vuex store
    currentBalanceFormatted: {
      get() {
        // Format the currentBalance as needed
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        })
          .format(this.currentBalance)
          .replace("₫", "");
      },
      set(value) {
        // Convert and update currentBalance when input changes
        this.$store.commit(
          "updateCurrentBalance",
          parseFloat(value.replace(/[^\d]/g, "")) || 0
        );
      },
    },
  },
  data() {
    return {
      arrowLeft: faArrowLeft,
      times: faTimes,
      dollarSign: faDollarSign,
      toggleOn: faToggleOn,
      trashAlt: faTrashAlt,
      notificationEnabled: false,
      notificationEnabled1: false,
      notificationEnabled2: false,
      inputWidth: "3rem",
    };
  },
  methods: {
    goBack() {
      console.log(this.currentBalanceFormatted);
    },
    closeEditWallet() {
      // Your logic to close edit wallet page
    },

    handleInput() {
      // Xử lý giá trị nhập vào ô input
      this.currentBalanceFormatted = this.formatCurrency(
        this.currentBalanceFormatted
      );
      const formattedValueLength = this.currentBalanceFormatted.length + 1; // +1 để tính thêm chữ 'Đ'
      this.inputWidth = Math.min(formattedValueLength * 10, 120);
      this.$nextTick(() => {
        // Đặt lại vị trí con trỏ sau khi định dạng số
        this.setCaretPosition(
          this.$refs.balanceInput,
          this.currentBalanceFormatted.length - 1
        );
      });
    },
    handleKeyDown(event) {
      // Kiểm tra phím Enter và ngăn sự kiện mặc định
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
    formatCurrency(value) {
      // Hàm định dạng số tiền và loại bỏ ký tự 'đ'
      const number = parseFloat(value.replace(/[^\d]/g, ""));
      if (!isNaN(number)) {
        const formattedValue = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        })
          .format(number)
          .replace("₫", ""); // Loại bỏ ký tự 'đ'

        return formattedValue;
      }
      return "";
    },
    setCaretPosition(element, position) {
      // Đặt vị trí con trỏ trong ô input
      if (element.setSelectionRange) {
        element.focus();
        element.setSelectionRange(position, position);
      }
    },
  },
};
</script>

<style scoped>
/* Your custom styles can go here */
</style>
