// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_iDY2SkxRVDFftx4fR3k9cdikocaUrdw",
  authDomain: "statki-a13a3.firebaseapp.com",
  databaseURL:
    "https://statki-a13a3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "statki-a13a3",
  storageBucket: "statki-a13a3.appspot.com",
  messagingSenderId: "233308820220",
  appId: "1:233308820220:web:92f5a36d19bdb40b65bd79",
  measurementId: "G-WK9N3M05F3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
document.querySelector("#FUCKYOU").addEventListener("click", sendData);
document.querySelector("#FUCKYOU2").addEventListener("click", getData);
import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
const db = getDatabase();
document.addEventListener("sendTheData", (e) => {
  sendData();
});
document.addEventListener("getThePlayer", (e) => {
  getPlayer();
});
document.addEventListener("getTheData", (e) => {
  getData();
});
function sendData() {
  set(ref(db, "Game"), {
    Gracz: Gamer,
    Statki1: [statki],
    Statki2: [statki2],
    StatkiGhost1: [statkiGhost],
    StatkiGhost2: [statkiGhost2],
    StrzalyMem: [strzalyMem],
    StrzalyMem2: [strzalyMem2],
    BrokenStatki: [brokenStatki],
    BrokenStatki2: [brokenStatki2],
    Counter1: counter1,
    Counter2: counter2,
    Counter3: counter3,
    Counter4: counter4,
    Counter2_1: counter2_1,
    Counter2_2: counter2_2,
    Counter2_3: counter2_3,
    Counter2_4: counter2_4,
    KillMode: killmode,
  })
    .then(() => {
      console.log("pakiet wysłany");
      zmianaPlanszy();
      return false;
    })
    .catch((error) => {
      alert(error);
    });
}
function getPlayer() {
  const duparef = ref(db);
  get(child(duparef, "Game/Gracz")).then((snapshot) => {
    whoGames = snapshot.val();
  });
}
function getData() {
  const dbref = ref(db);
  console.log("getting data");
  get(child(dbref, "Game/Statki1/0")).then((snapshot) => {
    statki = [];
    snapshot.forEach((childSnapshot) => {
      statki.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/Statki2/0")).then((snapshot) => {
    statki2 = [];
    snapshot.forEach((childSnapshot) => {
      statki2.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/StrzalyMem/0")).then((snapshot) => {
    strzalyMem = [];
    snapshot.forEach((childSnapshot) => {
      strzalyMem.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/StrzalyMem2/0")).then((snapshot) => {
    strzalyMem2 = [];
    snapshot.forEach((childSnapshot) => {
      strzalyMem2.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/StatkiGhost1/0")).then((snapshot) => {
    statkiGhost = [];
    snapshot.forEach((childSnapshot) => {
      statkiGhost.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/StatkiGhost2/0")).then((snapshot) => {
    statkiGhost2 = [];
    snapshot.forEach((childSnapshot) => {
      statkiGhost2.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/BrokenStatki/0")).then((snapshot) => {
    brokenStatki = [];
    snapshot.forEach((childSnapshot) => {
      brokenStatki.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/BrokenStatki2/0")).then((snapshot) => {
    brokenStatki2 = [];
    snapshot.forEach((childSnapshot) => {
      brokenStatki2.push(childSnapshot.val());
    });
  });
  get(child(dbref, "Game/Counter1")).then((snapshot) => {
    counter1 = snapshot.val();
  });
  get(child(dbref, "Game/Counter2")).then((snapshot) => {
    counter2 = snapshot.val();
  });
  get(child(dbref, "Game/Counter3")).then((snapshot) => {
    counter3 = snapshot.val();
  });
  get(child(dbref, "Game/Counter4")).then((snapshot) => {
    counter4 = snapshot.val();
  });
  get(child(dbref, "Game/Counter2_1")).then((snapshot) => {
    counter2_1 = snapshot.val();
  });
  get(child(dbref, "Game/Counter2_2")).then((snapshot) => {
    counter2_2 = snapshot.val();
  });
  get(child(dbref, "Game/Counter2_3")).then((snapshot) => {
    counter2_3 = snapshot.val();
  });
  get(child(dbref, "Game/Counter2_4")).then((snapshot) => {
    counter2_4 = snapshot.val();
  });
  get(child(dbref, "Game/KillMode"))
    .then((snapshot) => {
      killmode = snapshot.val();
    })
    .then(() => {
      console.log("myballllls!!!");
      zmianaPlanszy();
    });
}
