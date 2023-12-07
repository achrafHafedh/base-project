import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  Query,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Product } from "@/app/stock/types";

let db: any = false;
let auth: any = null;

export const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);
    auth = getAuth(app);
  }

  return { db, auth };
};

export const onLogin = (email: string, password: string) =>
  signInWithEmailAndPassword(getDb().auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch(() => null);

export const onRegister = (
  email: string,
  firstName: string,
  lastName: string,
  organisation: string,
  phone: string
) =>
  addDoc(collection(getDb().db, "users"), {
    email,
    firstName,
    lastName,
    organisation,
    phone,
  })
    .then((userCredential) => userCredential)
    .catch(() => null);

export const onLogout = () => signOut(getDb().auth);

export const findAllProduct = async (userId: string): Promise<Product[]> => {
  const queryProduct: Query<DocumentData, DocumentData> = await query(
    collection(getDb().db, "product"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(queryProduct);

  const res: Product[] = [];

  querySnapshot.forEach((product) => {
    res.push({
      id: product.id,
      ...product.data(),
    } as Product);
  });

  return res;
};

export const addProduct = (
  userId: string,
  code: string,
  name: string,
  price: number,
  purchase: number,
  quantity: number
) =>
  addDoc(collection(getDb().db, "product"), {
    userId,
    code,
    name,
    price,
    purchase,
    quantity,
  })
    .then((userCredential) => userCredential)
    .catch(() => null);
