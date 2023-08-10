<template>
  <div class="row">
    <div class="font-bold text-xl text-primary text-center">$4,5667677</div>
    <h5 class="text-gray-800 text-center">Total Balance</h5>
  </div>

  <div class="row flex justify-around mt-6">
    <div
      class="flex items-center p-4 space-x-4 bg-blue-500 text-white rounded-lg"
    >
      <div>
        <p class="text-lg font-semibold">Dòng text 1</p>
        <p class="text-sm">Dòng text 2</p>
      </div>
      <div>
        <i class="t2ico t2ico-trending-up"></i>
      </div>
    </div>

    <div
      class="flex items-center p-4 space-x-4 bg-pink-500 text-white rounded-lg"
    >
      <div>
        <p class="text-lg font-semibold">Dòng text 1</p>
        <p class="text-sm">Dòng text 2</p>
      </div>
      <div>
        <i class="t2ico t2ico-trending-down"></i>
      </div>
    </div>

    <div class="row text-left mt-7">
      <div class="font-bold text-2xl text-primary ml-5">
        Recent Transactions
      </div>
    </div>
    <!-- Danh sách giao dịch -->
    <div class="row px-5">
      <!-- Sử dụng v-for để hiển thị từng giao dịch -->
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex justify-between mt-6 bg-white rounded-lg border-1 shadow-lg"
      >
        <!-- Hộp chữ nhật màu cam nhạt -->
        <div class="flex items-center">
          <div
            class="flex items-center p-6 ml-3 rounded-lg"
            :style="{ backgroundColor: getRandomColor() }"
          ></div>
          <div class="ml-3">
            <p class="text-lg font-bold">{{ transaction.name }}</p>
            <p class="text-sm text-opacity-50">{{ transaction.note }}</p>
          </div>
        </div>

        <!-- Dòng text bên phải -->
        <div class="flex flex-col justify-center space-y-2 space-x-4 mr-3">
          <!-- Dòng text ở trên màu đỏ và to hơn -->
          <p
            :class="
              transaction.isIncome
                ? 'text-lg text-green font-bold'
                : 'text-lg text-red font-bold'
            "
          >
            {{ transaction.total }}
          </p>
          <!-- Dòng text ở dưới màu nhạt -->
          <p class="text-sm text-opacity-50">{{ transaction.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUser } from "@/composable/useUser";
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import getTransactions from "@/composable/getTransactions";

export default defineComponent({
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    console.log(user.value);

    // Sử dụng ref để lưu danh sách các giao dịch
    const transactions = ref([]);

    // Hàm tạo màu ngẫu nhiên
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Gọi hàm getTransactions để lấy danh sách giao dịch từ Firestore khi component được mounted
    onMounted(async () => {
      transactions.value = await getTransactions("transactions");
    });

    return { user, transactions, getRandomColor };
  },
});
</script>
