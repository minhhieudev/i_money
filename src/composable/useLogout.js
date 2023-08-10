import { projectAuth } from "@/configs/firebase";
import { ref } from "vue";

const error = ref(null);

async function logout() {
  error.value = null;
  try {
    const response = await projectAuth.signOut();
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

export function useLogout() {
  return { error, logout };
}
