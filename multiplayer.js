const wysylamy = new Event("sendTheData");
const dawajGracza = new Event("getThePlayer");
const dawajDane = new Event("getTheData");
const szblix = new Event("dawajSzablon");
setInterval(() => {
  if (multi > 0) {
    //Pokaż przycisk "Kontynuuj"
    document.dispatchEvent(dawajGracza);
    if (whoGames == lista) {
      document.querySelector(".multiB").style.display = "flex";
    } else {
      holUpMulti();
      document.querySelector(".multiB").style.display = "none";
    }
  }
}, 200);

//Download & ZmienPlansze()
function dZP() {
  console.log("want data");
  document.dispatchEvent(dawajDane);
  areWeGood = 1;
}
//Send & ZmienPlansze()
function sZP() {
  if (lista == 1) {
    for (let i = 0; i < strzaly.length; i++) {
      strzalyMem.push(strzaly[i]);
    }
  } else if (lista == 2) {
    for (let i = 0; i < strzaly.length; i++) {
      strzalyMem2.push(strzaly[i]);
    }
  }
  strzaly.splice(0, strzaly.length);
  fuckTheNan();
  console.log("send data");
  document.dispatchEvent(wysylamy);
}
//Funckja z ekranem ładowania ale dla multiplayera
function holUpMulti() {
  Trio = document.getElementById("onHold4");
  Trio.style.display = "flex";
}

//Funkcja która zamienia wszystkie NaN'y na "brak"
function fuckTheNan() {
  for (let n = 0; n < statkiGhost.length; n++) {
    if (statkiGhost[n] == statkiGhost[n]) {
    } else {
      statkiGhost.splice(n, 1, "brak");
    }
  }
  for (let n = 0; n < statkiGhost2.length; n++) {
    if (statkiGhost2[n] == statkiGhost2[n]) {
    } else {
      statkiGhost2.splice(n, 1, "brak");
    }
  }
}
