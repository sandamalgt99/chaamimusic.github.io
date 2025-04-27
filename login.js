// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD-Example123456",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Sign Up
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data to Realtime Database
      database.ref('users/' + user.uid).set({
        email: user.email,
        createdAt: new Date().toISOString()
      });

      alert('Sign Up successful!');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update last login time
      database.ref('users/' + user.uid).update({
        lastLogin: new Date().toISOString()
      });

      alert('Login successful!');
    })
    .catch((error) => {
      alert(error.message);
    });
});
