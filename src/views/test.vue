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
  </div>

  <div class="row text-left mt-7">
    <div class="font-bold text-2xl text-primary ml-5">Recent Transactions</div>
  </div>

  <div class="row px-5">
    <h5 class="text-gray-800 mt-6 text-opacity-50">Today</h5>
    <div
      class="flex justify-between mt-6 bg-white rounded-lg border-1 shadow-lg"
    >
      <!-- Hộp chữ nhật màu cam nhạt -->
      <div class="flex items-center">
        <div
          class="flex items-center p-6 ml-3 rounded-lg"
          style="background-color: rgb(243, 205, 134)"
        ></div>
        <div class="ml-3">
          <p class="text-lg font-bold">Shoes</p>
          <p class="text-sm text-opacity-50">Sneaker Nike</p>
        </div>
      </div>

      <!-- Dòng text bên phải -->
      <div class="flex flex-col justify-center space-y-2 space-x-4 mr-3">
        <!-- Dòng text ở trên màu đỏ và to hơn -->
        <p class="text-lg text-red font-bold">-$20.00</p>
        <!-- Dòng text ở dưới màu nhạt -->
        <p class="text-sm text-opacity-50">Aug 26</p>
      </div>
    </div>

    <div
      class="flex justify-between mt-6 bg-white rounded-lg border-1 shadow-lg"
    >
      <!-- Hộp chữ nhật màu cam nhạt -->
      <div class="flex items-center">
        <div
          class="flex items-center p-6 ml-3 rounded-lg"
          style="background-color: rgb(152, 243, 243)"
        ></div>
        <div class="ml-3">
          <p class="text-lg font-bold">Buy Something</p>
          <p class="text-sm text-opacity-50">Buy hula</p>
        </div>
      </div>

      <div class="flex flex-col justify-center space-y-2 space-x-4 mr-3">
        <p class="text-lg text-red font-bold">-$120.00</p>
        <p class="text-sm text-opacity-50">Aug 26</p>
      </div>
    </div>
  </div>

  <div class="row px-5">
    <h5 class="text-gray-800 mt-6 text-opacity-50">Yesterday</h5>
    <div
      class="flex justify-between mt-6 bg-white rounded-lg border-1 shadow-lg"
    >
      <div class="flex items-center">
        <div
          class="flex items-center p-6 ml-3 text-orange-900 rounded-lg"
          style="background-color: rgb(201, 162, 245)"
        ></div>
        <div class="ml-3">
          <p class="text-lg font-bold">Payment</p>
          <p class="text-sm text-opacity-50">Receive from Customer A</p>
        </div>
      </div>

      <div class="flex flex-col justify-center space-y-2 space-x-4 mr-3">
        <p class="text-lg text-green font-bold">+$3,120.00</p>
        <p class="text-sm text-opacity-50">Aug 25</p>
      </div>
    </div>
  </div>

  <!-- <div class="mt-6">{{ user?.displayName }}</div> -->
</template>

<script>
import { useUser } from "@/composable/useUser";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    console.log(user.value);

    return { user };
  },
});
</script>
