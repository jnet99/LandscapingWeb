import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaOVnjC7o_MDDnoR9ZyQgzQHMXr2P3tck",
  authDomain: "landscapingdemo-208bb.firebaseapp.com",
  projectId: "landscapingdemo-208bb",
  storageBucket: "landscapingdemo-208bb.firebasestorage.app",
  messagingSenderId: "1014114608409",
  appId: "1:1014114608409:web:f26eea303a41434bfad188",
  measurementId: "G-ZQ6PV5M505"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("quoteForm");
const status = document.getElementById("quoteStatus");
const submitButton = document.getElementById("quoteSubmitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  status.textContent = "Sending your request…";

  try {
    await addDoc(collection(db, "quoteRequests"), {
      name: document.getElementById("name").value.trim(),
      address: document.getElementById("address").value.trim(),
      lotSize: document.getElementById("size").value,
      phone: document.getElementById("phone").value.trim(),
      submittedAt: serverTimestamp()
    });

    form.reset();
    status.textContent = "Thanks! We’ll be in touch shortly.";
  } catch (error) {
    console.error(error);
    status.textContent = "Unable to send your request. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
