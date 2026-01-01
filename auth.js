import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCah1X2nDnED_0y8y_wddI7UCc4nNSdl9k",
    authDomain: "fitfuel-b7085.firebaseapp.com",
    projectId: "fitfuel-b7085",
    storageBucket: "fitfuel-b7085.firebasestorage.app",
    messagingSenderId: "854780886148",
    appId: "1:854780886148:web:e17cef32cba0cd7ea6d6d1",
    measurementId: "G-GHT26SEMJF"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
let mode = "login";

// UI Toggle remains mostly the same
function toggleMode() {
  mode = mode === "login" ? "signup" : "login";
  document.querySelector("button").innerText = mode === "login" ? "Login" : "Create Account";
  document.querySelector("p button").innerText = mode === "login" ? "Sign up" : "Back to login";
  document.getElementById("error").innerText = "";
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorElement = document.getElementById("error");

  if (!email || !password) {
    errorElement.innerText = "Fill all fields.";
    return;
  }

  try {
    if (mode === "signup") {
      // Create new user in Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful");
    } else {
      // Sign in existing user
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    }
    sessionStorage.setItem("activeUser", email);
    // Firebase handles session automatically, redirect now
    window.location.href = "dashboard.html";

  } catch (error) {
    // Map Firebase error codes to user-friendly messages
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorElement.innerText = "Account already exists.";
        break;
      case 'auth/invalid-credential':
        errorElement.innerText = "Invalid email or password.";
        break;
      case 'auth/weak-password':
        errorElement.innerText = "Password should be at least 6 characters.";
        break;
      default:
        errorElement.innerText = error.message;
    }
  }
}

// Make functions available to HTML buttons
window.toggleMode = toggleMode;
window.login = login;