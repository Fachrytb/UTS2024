import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCjXlgysJkN-2s3Gu0forgp7as5-9NqCkI",
  authDomain: "pasar-b04a7.firebaseapp.com",
  databaseURL: "https://pasar-b04a7-default-rtdb.firebaseio.com",
  projectId: "pasar-b04a7",
  storageBucket: "pasar-b04a7.appspot.com",
  messagingSenderId: "508470916587",
  appId: "1:508470916587:web:460e9a1612e92b712e15ae",
  measurementId: "G-33T7CQCWBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function ambilDaftarproduk() {
  const refDokumen = collection(db, "produk");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = []; // tes
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function hapusdata(docId) {
  await deleteDoc(doc(db, "produk", docId));
}

export async function tambahProduk(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, "produk"), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('berhasil menambah data' + dok)
  } catch (e) {
    console.log('Gagal menambah data' + e);
  }
}

export async function ubahProduk(docId, nama, harga, stok) {
  await updateDoc(doc(db, "produk", docId), {
    nama: nama,
    harga: harga,
    stok: stok

  });
}

export async function ambilProduk(docId) {
  const docRef = await doc(db, "produk", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}