// firebase-init.js

// ----------------------------------------------------------------
// IMPORTANTE:
// 1. Vá ao seu console do Firebase (https://console.firebase.google.com/)
// 2. Crie um novo projeto ou selecione um existente.
// 3. Adicione um aplicativo Web (ícone </>)
// 4. Copie o objeto 'firebaseConfig' e cole-o abaixo.
// ----------------------------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyBBrp0r27bdq0_Giw-OcefyGTgtNny2U_g",
  authDomain: "gfyfy7fy.firebaseapp.com",
  databaseURL: "https://gfyfy7fy-default-rtdb.firebaseio.com",
  projectId: "gfyfy7fy",
  storageBucket: "gfyfy7fy.firebasestorage.app",
  messagingSenderId: "55023990965",
  appId: "1:55023990965:web:227802c9e20ba07f6f26fc",
  measurementId: "G-WK5QQDSC4Y"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);