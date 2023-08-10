import { projectFirestore } from "@/configs/firebase";
import { collection, getDocs } from "firebase/firestore";

const getTransactions = async (name) => {
  try {
    const collectionRef = collection(projectFirestore, name);
    const querySnapshot = await getDocs(collectionRef);

    const transactions = [];
    querySnapshot.forEach((doc) => {
      // Thêm các transaction vào mảng
      transactions.push({ id: doc.id, ...doc.data() });
    });

    return transactions;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getTransactions;
