import { projectAuth } from "@/configs/firebase";
import { ref } from "vue";

const user = ref(null);

projectAuth.onAuthStateChanged(function (_user) {
  if (_user) {
    user.value = _user;
  }
});

function getUser() {
  return { user };
}

export function useUser() {
  return { getUser };
}
