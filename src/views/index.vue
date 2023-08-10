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
        <p class="text-lg font-semibold">Income</p>
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
        <p class="text-lg font-semibold">Express</p>
        <p class="text-sm">Dòng text 2</p>
      </div>
      <div>
        <i class="t2ico t2ico-trending-down"></i>
      </div>
    </div>
  </div>

  <div class="row text-left mt-7">
    <div class="font-bold text-2xl text-primary ml-5">Recent Transactions</div>
  </div>

  <!-- Hiển thị các nhóm giao dịch -->
  <div class="row px-5 transaction-list">
    <div v-for="group in Object.keys(groupedTransactions)" :key="group">
      <div class="font-bold mt-4 mb-2 text-primary">{{ group }}</div>
      <div
        v-for="transaction in groupedTransactions[group]"
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
import { defineComponent, reactive, toRefs } from "vue";
import { useUser } from "@/composable/useUser";
import getTransactions from "@/composable/getTransactions";

export default defineComponent({
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();

    // Sử dụng reactive để lưu danh sách các giao dịch và nhóm giao dịch theo ngày
    const state = reactive({
      transactions: [],
      groupedTransactions: {},
    });

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

    // Hàm nhóm các giao dịch theo ngày
    const groupTransactionsByDate = (transactions) => {
      const groups = {};

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      transactions.forEach((transaction) => {
        const date = new Date(transaction.time.seconds * 1000);

        if (isSameDate(date, today)) {
          if (!groups["Today"]) {
            groups["Today"] = [];
          }
          groups["Today"].push(transaction);
        } else if (isSameDate(date, yesterday)) {
          if (!groups["Yesterday"]) {
            groups["Yesterday"] = [];
          }
          groups["Yesterday"].push(transaction);
        } else if (isSameDateOrLater(date, today, "week")) {
          if (!groups["This week"]) {
            groups["This week"] = [];
          }
          groups["This week"].push(transaction);
        } else if (isSameDateOrLater(date, today, "lastWeek")) {
          // Xác định các ngày còn lại trong tuần trước
          const lastWeekDate = formatDate(date, "lastWeek");
          if (!groups[lastWeekDate]) {
            groups[lastWeekDate] = [];
          }
          groups[lastWeekDate].push(transaction);
        } else {
          // Các giao dịch nằm ngoài tuần hiện tại và tuần trước
          const formattedDate = formatDate(date);
          if (!groups[formattedDate]) {
            groups[formattedDate] = [];
          }
          groups[formattedDate].push(transaction);
        }
      });

      return groups;
    };

    // Kiểm tra xem hai ngày có cùng một ngày không
    const isSameDate = (date1, date2) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    // Kiểm tra xem một ngày có trùng với hoặc sau ngày khác không (theo tuần hoặc tuần trước)
    const isSameDateOrLater = (date, baseDate, type) => {
      if (type === "week") {
        const oneWeekAgo = new Date(baseDate);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return date >= oneWeekAgo;
      } else if (type === "lastWeek") {
        const twoWeeksAgo = new Date(baseDate);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        return date >= twoWeeksAgo && date < baseDate;
      }
    };

    // Lấy danh sách giao dịch từ Firebase khi component được tạo
    const fetchTransactions = async () => {
      try {
        const name = "transaction"; // Thay đổi 'transactions' thành tên collection bạn muốn lấy
        const transactions = await getTransactions(name);
        state.transactions = transactions;

        // Nhóm và sắp xếp các giao dịch theo ngày giảm dần
        state.groupedTransactions = groupTransactionsByDate(transactions);
      } catch (err) {
        console.log(err);
      }
    };

    // Gọi hàm fetchTransactions khi component được tạo
    fetchTransactions();

    // Trả về các biến và hàm bạn muốn sử dụng trong template
    return {
      ...toRefs(state),
      user,
      getRandomColor,
      formatDate,
      getTransactionAmountClass,
    };
  },
});
</script>

<style>
/* Các phần khác trong CSS của bạn */
.transaction-list {
  max-height: 400px; /* Giới hạn chiều cao của khu vực cuộn */
  overflow-y: auto; /* Hiển thị thanh cuộn khi nội dung vượt quá chiều cao */
}
</style>
