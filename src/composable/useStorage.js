import { projectStorage } from "@/configs/firebase";
import { ref } from "vue";
import { useUser } from "./useUser";

const useStorage = (name) => {
  const error = ref(null);
  const filePath = ref(null);
  const url = ref(null);

  const { getUser } = useUser();
  const { user } = getUser();

  async function uploadFile(file) {
    if (user.value && user.value.uid) {
      filePath.value = `${name}/${user.value.uid}/${file.name}`;
      const fileRef = projectStorage.ref(filePath.value);

      try {
        const response = await fileRef.put(file);
        url.value = await response.ref.getDownloadURL();
        console.log(url.value);
        console.log("12345");
        return url.value;
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    } else {
      error.value = "User is not defined or does not have UID";
    }
  }

  return { error, filePath, url, uploadFile };
};

export default useStorage;
