<template>
  <form @submit.prevent="onSubmit">
    <div class="row mt-8">
      <div class="bg-white rounded-lg py-4">
        <div class="container mx-auto px-8">
          <div class="row">
            <label for="total" class="flex items-end">
              <div class="w-10 text-right leading-10 mr-4 pb-1">
                <span
                  class="inline-block px-1 text-dark border border-dark rounded text-sm font-bold"
                  >USD</span
                >
              </div>
              <div class="flex flex-col border-b border-gray-100 pb-1">
                <span class="font-semibold text-xs text-dark">Total</span>
                <input
                  id="total"
                  class="text-4xl"
                  type="text"
                  placeholder="0"
                  v-model="total"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="name" class="flex items-center">
              <div class="flex items-center w-10 text-right leading-10 mr-4">
                <span class="flex-none w-10 mr-4">
                  <i class="t2ico t2ico-ticket-star text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="name"
                  v-model="name"
                  class="text-dark w-full outline-none"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="selectedCategory" class="flex items-center">
              <div
                class="flex items-center flex-none w-10 text-right leading-10 mr-4"
              >
                <span
                  class="inline-block ml-auto w-8 h-8 rounded-full bg-blue-300"
                ></span>
              </div>
              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="selectedCategory"
                  v-model="selectedCategory"
                  class="text-xl text-dark w-full outline-none cursor-pointer"
                  type="text"
                  :placeholder="
                    selectedCategory ? selectedCategory.name : 'Select category'
                  "
                  @focus="onCategorySelect()"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="note" class="flex items-center">
              <div class="flex items-center w-10 text-right leading-10 mr-4">
                <span class="flex-none w-10 mr-4">
                  <i class="t2ico t2ico-document text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 border-b border-gray-100 py-3">
                <input
                  id="note"
                  v-model="note"
                  class="text-dark w-full outline-none"
                  type="text"
                  placeholder="Note"
                />
              </div>
            </label>
          </div>
          <div class="row">
            <label for="time" class="flex items-center">
              <div class="flex items-center w-10 text-right leading-10 mr-4">
                <span class="flex-none w-10 mr-4">
                  <i class="t2ico t2ico-calendar text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 py-2 border-b border-gray-100">
                <div class="text-dark w-full">{{ new Date() }}</div>
              </div>
            </label>
          </div>
          <div class="row">
            <label for="wallet" class="flex items-center">
              <div class="flex-none w-10 mr-4">
                <span class="flex items-center justify-end text-dark">
                  <i class="t2ico t2ico-wallet text-2xl"></i>
                </span>
              </div>
              <div class="flex-1 py-2">
                <div class="text-dark w-full">My Wallet</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isMoreDetails" class="row mt-8">
      <button
        @click="isMoreDetails = true"
        class="bg-white rounded-lg py-3 w-full text-primary font-semibold"
      >
        More detail
      </button>
    </div>

    <template v-if="isMoreDetails">
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="location" class="flex items-center">
                <div class="flex items-center w-10 text-right leading-10 mr-4">
                  <span class="flex-none w-10 mr-4">
                    <i class="t2ico t2ico-location text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 border-b border-gray-100 py-3">
                  <input
                    id="location"
                    class="text-dark w-full outline-none"
                    v-model="location"
                    type="text"
                    placeholder="Select a location"
                  />
                </div>
              </label>
            </div>
            <div class="row">
              <label for="withPerson" class="flex items-center">
                <div class="flex items-center w-10 text-right leading-10 mr-4">
                  <span class="flex-none w-10 mr-4">
                    <i class="t2ico t2ico-users text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 py-3">
                  <input
                    id="withPerson"
                    class="text-dark w-full outline-none"
                    v-model="person"
                    type="text"
                    placeholder="With person"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Start: Upload photos -->
      <div class="row mt-8">
        <div class="bg-white rounded-lg py-4">
          <div class="container mx-auto px-8">
            <div class="row">
              <label for="file" class="flex items-center text-primary">
                <div class="flex items-center w-10 text-right leading-10 mr-4">
                  <span class="flex-none w-10 mr-4">
                    <i class="t2ico t2ico-camera text-2xl"></i>
                  </span>
                </div>
                <div class="flex-1 border-b border-gray-100 py-3">
                  <div class="w-full font-semibold">Upload photos</div>
                  <input
                    type="file"
                    id="file"
                    class="h-0 w-0 overflow-hidden absolute"
                    @change="onChangeFile"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="text-red my-3">{{ errorFile }}</div>
      </div>
    </template>

    <button class="bg-primary text-white">Testing Add Button</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useUser } from "@/composable/useUser";
import useCollection from "@/composable/useCollection";
import useStorage from "@/composable/useStorage";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isMoreDetails = ref(false);
    const total = ref(0);
    const category = ref("");
    const note = ref("");
    const name = ref("");
    const time = ref(new Date());
    const location = ref("");
    const person = ref("");
    const router = useRouter();
    const selectedCategory = ref("");

    const file = ref(null);
    const errorFile = ref(null);
    const { url, uploadFile } = useStorage("transaction");

    const { getUser } = useUser();
    const { addRecord } = useCollection("transaction");

    // Trích xuất selectedCategory từ tham số truy vấn
    const routeQuery = router.currentRoute.value.query;
    if (routeQuery && routeQuery.selectedCategory) {
      selectedCategory.value = routeQuery.selectedCategory;
    }
    // Trích xuất selectedCategory từ tham số truy vấn
    const routeQuery2 = router.currentRoute.value.query;
    if (routeQuery2 && routeQuery.category) {
      category.value = routeQuery.category;
    }

    function onChangeFile(event) {
      const selected = event.target.files[0];
      const typesFile = ["image/png", "image/jpg"];
      if (selected && typesFile.includes(selected.type)) {
        file.value = selected;
        errorFile.value = null; // Clear error message when a valid file is selected
      } else {
        file.value = null;
        errorFile.value = "Please select a PNG or JPG file.";
      }
    }

    function onCategorySelect() {
      // Chuyển hướng đến trang chọn category (ví dụ: '/select-category')
      router.push("/new-transaction/select-category");
    }

    async function onSubmit() {
      if (file.value) await uploadFile(file.value);

      const { user } = getUser();

      const transaction = {
        total: parseInt(total.value),
        name: name.value,
        category: category.value,
        selectedCategory: selectedCategory.value,
        note: note.value,
        time: time.value,
        location: location.value,
        person: person.value,
        userId: user.value.uid,
        thumbnail: url.value,
      };

      await addRecord(transaction);
    }

    return {
      onSubmit,
      errorFile,
      location,
      person,
      onChangeFile,
      isMoreDetails,
      total,
      category,
      name,
      note,
      time,
      onCategorySelect,
      selectedCategory,
    };
  },
};
</script>
