<template>
  <div class="container mx-auto p-8">
    <!-- Phần biểu đồ -->
    <div class="mb-8">
      <canvas id="barChart" width="400" height="200"></canvas>
    </div>

    <!-- Phần chi tiết giao dịch -->
    <div>
      <h3 class="font-bold text-xl text-primary mb-2">Detail Transactions</h3>
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
          <p :class="getTransactionAmountClass(transaction).class">
            {{ getTransactionAmountClass(transaction).amount }}
          </p>
          <!-- Dòng text ở dưới màu nhạt -->
          <p class="text-sm text-opacity-50">
            {{ formatDate(transaction.time) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import getTransactions from "@/composable/getTransactions";
import { Bar } from "chart.js";

export default defineComponent({
  setup() {
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

    // Hàm chuyển đổi Timestamp thành dạng "July 27"
    const formatDate = (timestamp) => {
      const date = new Date(timestamp.seconds * 1000); // Chuyển đổi Timestamp thành Date
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    };

    // Thêm phương thức để xác định lớp CSS và số tiền tương ứng dựa trên loại giao dịch
    const getTransactionAmountClass = (transaction) => {
      if (
        transaction.category === "Loan/Debt" ||
        transaction.category === "Revenue"
      ) {
        return {
          amount: `+$${transaction.total.toFixed(2)}`,
          class: "text-lg text-green font-bold",
        };
      } else if (transaction.category === "Expenses") {
        return {
          amount: `-$${transaction.total.toFixed(2)}`,
          class: "text-lg text-red font-bold",
        };
      } else {
        return {
          amount: `$${transaction.total.toFixed(2)}`,
          class: "text-lg font-bold",
        };
      }
    };

    onMounted(async () => {
      const name = "transaction";
      transactions.value = await getTransactions(name);

      // Vẽ biểu đồ khi có dữ liệu giao dịch
      if (transactions.value.length > 0) {
        drawBarChart(transactions.value);
      }
    });

    // Function to draw the Bar chart
    const drawBarChart = (transactions) => {
      const ctx = document.getElementById("barChart").getContext("2d");

      // Lấy dữ liệu từ transactions để cấu hình biểu đồ
      const labels = transactions.map((transaction) => transaction.name);
      const amounts = transactions.map((transaction) => transaction.total);

      new Bar(ctx, {
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Amount",
              data: amounts,
              backgroundColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    return {
      transactions,
      getRandomColor,
      formatDate,
      getTransactionAmountClass,
    };
  },
});
</script>

<style>
/* Các phần khác trong CSS của bạn */
</style>
