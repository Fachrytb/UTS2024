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

import { 
  getStorage, 
  ref, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
  
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
//const storage = getStorage();

export async function ambilDaftarpembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = []; // tes
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      nohp: dok.data().nohp,
    });
  });

  return hasil;
}


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

//>>>>>>>>>>>>>>PEMBELI<<<<<<<<<<<<<<<<<<<<
export async function hapusdatapembeli(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}
export async function tambahPembeli(nama, alamat, nohp) {
  try {
    const dokRef = await addDoc(collection(db, "pembeli"), {
      nama: nama,
      alamat: alamat,
      nohp: nohp
    });
    console.log('berhasil menambah data' + dok)
  } catch (e) {
    console.log('Gagal menambah data' + e);
  }
}
export async function ubahPembeli(docId, nama, alamat, nohp) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    nohp: nohp
  });
}
export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
//>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<

//>>>>>>>>>>>>>PENJUAL<<<<<<<<<<<<<<<<<<<<<
export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "Penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = []; // tes
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      nohp: dok.data().nohp,
    });
  });

  return hasil;
}

export async function hapusdatapenjual(docId) {
  await deleteDoc(doc(db, "Penjual", docId));
}

export async function tambahPenjual(nama, alamat, nohp) {
  try {
    const dokRef = await addDoc(collection(db, "Penjual"), {
      nama: nama,
      alamat: alamat,
      nohp: nohp
    });
    console.log('berhasil menambah data' + dok)
  } catch (e) {
    console.log('Gagal menambah data' + e);
  }
}

export async function ubahPenjual(docId, nama, alamat, nohp) {
  await updateDoc(doc(db, "Penjual", docId), { 
    nama: nama,
    alamat: alamat,
    nohp: nohp
  
  });
}

export async function ambilPenjual(docId) {
  const docRef = await doc(db, "Penjual", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}
//>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<
