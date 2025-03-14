import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Function to add a donor
export const addDonor = async (
  name: string,
  bloodType: string,
  contact: string
) => {
  try {
    const docRef = await addDoc(collection(db, "donors"), {
      name,
      bloodType,
      contact,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding donor:", error);
  }
};

// Function to fetch all donors
export const getDonors = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "donors"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching donors:", error);
    return [];
  }
};
