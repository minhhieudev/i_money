import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  doc,
  setDoc,
} from "firebase/auth";
import { projectAuth, projectFirestore } from "@/configs/firebase";

const defaultAvatarURL = "../assets/Image/2.png";
const error = ref(null);
const isPending = ref(false);

async function signup(email, password, fullName) {
  console.log(fullName);
  isPending.value = true;
  error.value = null;
  try {
    const response = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    if (!response) throw new Error("Could not create a new user.");

    // Cập nhật thông tin người dùng
    await updateProfile(response.user, {
      displayName: fullName,
    });

    // Lưu thông tin người dùng vào Firestore
    const userDocRef = doc(projectFirestore, "users", response.user.uid);
    await setDoc(userDocRef, {
      displayName: fullName,
      avatarURL: defaultAvatarURL,
      // Các thông tin người dùng khác có thể lưu tại đây
    });

    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignUp() {
  return { error, isPending, signup };
}
