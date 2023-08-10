import { projectFirestore } from "@/configs/firebase";
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";

const useCollection = (name) => {
  const error = ref(null);

  async function addRecord(record) {
    error.value = null;

    try {
      const collectionRef = collection(projectFirestore, name);
      const response = await addDoc(collectionRef, record);
      return response;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  return { error, addRecord };
};

export default useCollection;
