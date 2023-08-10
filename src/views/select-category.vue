<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Select a category</h1>
    <div class="flex justify-between">
      <div
        class="px-4 py-2 border rounded cursor-pointer"
        :class="{ 'bg-blue-200': selectedCategory === 'Loan/Debt' }"
        @click="selectCategory('Loan/Debt')"
      >
        Loan/Debt
      </div>
      <div
        class="px-4 py-2 border rounded cursor-pointer"
        :class="{ 'bg-blue-200': selectedCategory === 'Revenue' }"
        @click="selectCategory('Revenue')"
      >
        Revenue
      </div>
      <div
        class="px-4 py-2 border rounded cursor-pointer"
        :class="{ 'bg-blue-200': selectedCategory === 'Expenses' }"
        @click="selectCategory('Expenses')"
      >
        Expenses
      </div>
    </div>

    <!-- Hiển thị các mục con khi mục cha được chọn -->
    <div v-if="selectedCategory">
      <div
        class="row px-5"
        v-for="subCategory in getSubCategories(selectedCategory)"
        :key="subCategory.name"
      >
        <div
          class="flex justify-between mt-6 bg-white rounded-lg border-1 p-4 shadow-lg"
          @dblclick="
            goBackToNewTransactionPage(subCategory.name, selectedCategory)
          "
        >
          <div class="flex items-center">
            <div
              class="flex items-center p-4 ml-3 text-orange-900 rounded-lg"
              :style="{ backgroundColor: subCategory.color }"
            ></div>
            <div class="ml-3">
              <p class="text-lg font-bold">{{ subCategory.name }}</p>
            </div>
          </div>
          <button
            class="text-pink-600 right-0"
            @click="deleteSubCategory(subCategory)"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>

    <!-- Add new category -->
    <div class="row px-5">
      <div
        class="flex mt-6 bg-white rounded-lg border-1 p-4 shadow-lg"
        @click="addNewCategory"
      >
        <div class="flex items-center">
          <div
            data-circle-inset
            class="flex justify-center items-center bg-primary w-6 h-6 rounded-full cursor-pointer -top-6 left-1/2 -translate-x-1/2"
          >
            <i class="t2ico t2ico-plus"></i>
          </div>
        </div>
        <div class="ml-3">
          <p class="text-lg font-bold">Add new category</p>
        </div>
      </div>
    </div>

    <!-- Form thêm mới mục con -->
    <div v-if="showAddCategoryForm" class="row px-5">
      <div
        class="flex justify-between mt-6 bg-white rounded-lg border-1 p-4 shadow-lg"
      >
        <input
          v-model="newSubCategory"
          @keydown.enter="addSubCategory"
          class="ml-3"
          placeholder="New SubCategory Name"
        />
        <button @click="addSubCategory">Add</button>
        <button @click="cancelAddCategory">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "Revenue", // Biến lưu giá trị category được chọn
      subCategories: {
        // "Loan/Debt": ["Personal_Loan", "Credit_Card_Debt", "Mortgage"],
        // Revenue: ["Payment", "Withdrawal", "Education"],
        // Expenses: ["Goroceries", "Utilities", "Transport"],
      },
      showAddCategoryForm: false,
      newSubCategory: "",
      category: "",
    };
  },
  methods: {
    selectCategory(category) {
      // Check if the category is already selected
      if (this.selectedCategory === category) {
        this.goBackToNewTransactionPage(this.selectedCategory);
      } else {
        this.selectedCategory = category;
      }
    },
    goBackToNewTransactionPage(selectedCategory, category) {
      console.log(selectedCategory);

      // Truyền giá trị là một chuỗi
      this.$router.push({
        path: "/new-transaction",
        query: { selectedCategory: selectedCategory, category: category },
      });
    },

    getSubCategories(category) {
      return this.subCategories[category] || [];
    },

    addNewCategory() {
      this.showAddCategoryForm = true;
    },
    addSubCategory() {
      // Kiểm tra xem đã nhập tên mục con mới hay chưa
      if (this.newSubCategory.trim() === "") return;

      // Thêm mục con mới vào danh sách mục con với màu ngẫu nhiên
      if (!this.subCategories[this.selectedCategory]) {
        this.subCategories[this.selectedCategory] = [];
      }

      // Tạo màu ngẫu nhiên cho mục con mới
      const newSubCategoryColor = this.getRandomColor();

      // Thêm mục con mới vào danh sách
      this.subCategories[this.selectedCategory].push({
        name: this.newSubCategory,
        color: newSubCategoryColor,
      });

      // Lưu danh sách vào Local Storage
      this.saveSubCategoriesToLocalStorage();

      // Đặt giá trị mục con mới về trống và ẩn form thêm mới
      this.newSubCategory = "";
      this.showAddCategoryForm = false;
    },

    deleteSubCategory(subCategory) {
      // Xác nhận xóa mục con trước khi thực hiện
      if (confirm(`Bạn có chắc chắn muốn xóa "${subCategory}" không?`)) {
        // Xóa mục con khỏi danh sách
        const index =
          this.subCategories[this.selectedCategory].indexOf(subCategory);
        if (index !== -1) {
          this.subCategories[this.selectedCategory].splice(index, 1);
        }
        // Lưu dữ liệu vào Local Storage sau khi xóa
        this.saveSubCategoriesToLocalStorage();
      }
    },
    cancelAddCategory() {
      this.newSubCategory = "";
      this.showAddCategoryForm = false;
    },
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    saveSubCategoriesToLocalStorage() {
      localStorage.setItem("subCategories", JSON.stringify(this.subCategories));
    },
    loadSubCategoriesFromLocalStorage() {
      const subCategoriesData = localStorage.getItem("subCategories");
      if (subCategoriesData) {
        this.subCategories = JSON.parse(subCategoriesData);
      }
    },
  },
  created() {
    // Tải dữ liệu từ Local Storage khi ứng dụng được tạo
    this.loadSubCategoriesFromLocalStorage();
  },
};
</script>

<style>
/* Tùy chỉnh kiểu chọn category khi được chọn */
.bg-blue-200 {
  background-color: #bee3f8;
}
</style>
