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

      alert('Login successful! Redirecting...');

      // 🚀 Redirect to Dashboard
      window.location.href = "dashboard.html";

    })
    .catch((error) => {
      alert(error.message);
    });
});

// Protect Dashboard: Check if user is logged in
auth.onAuthStateChanged(user => {
  if (user) {
    // Set welcome message
    document.getElementById('welcomeMessage').textContent = "Welcome, " + user.email;
  } else {
    // If NOT logged in ➔ redirect to login page
    alert('Please login first!');
    window.location.href = "login.html";
  }
});

// Firebase Initialization
const auth = firebase.auth();
const db = firebase.database(); // Realtime Database

// Signup Function
function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User created!
      const user = userCredential.user;
      
      // Now auto-save to database
      db.ref('users/' + user.uid).set({
        email: user.email,
        createdAt: new Date().toISOString()
      }).then(() => {
        alert('Signup successful and user saved to database!');
        window.location.href = "dashboard.html"; // Redirect to dashboard
      }).catch((error) => {
        console.error('Error saving user to database:', error);
        alert('Signup successful but error saving to database.');
      });
      
    })
    .catch((error) => {
      console.error('Signup error:', error);
      alert(error.message);
    });
}

