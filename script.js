//document
var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var statki = [];
var statki2 = [];
var statkiGhost = [];
var statkiGhost2 = [];
var strzaly = [];
var strzalyMem = [];
var strzalyMem2 = [];
var rakiety = 0;
var brokenStatki = [];
var brokenStatki2 = [];

//zmienne
dlugosc = 0;
xNumber = 0;
counter = 0;

counter4 = 1;
counter3 = 2;
counter2 = 3;
counter1 = 4;

counter2_4 = 1;
counter2_3 = 2;
counter2_2 = 3;
counter2_1 = 4;

lista = 1;

killmode = 0;

areWeGood = 0;

rakietyCap = 0;

weGame = 0;

multi = 0;

whoGames = 0;

Gamer = 0;
const wysylamy = new Event("sendTheData");
const dawajGracza = new Event("getThePlayer");
const dawajDane = new Event("getTheData");
//Generacja pól gry
for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    document.getElementById("plansza").innerHTML +=
      "<div onmouseover='checker(this)' id='" +
      plansza[i] +
      j +
      "' class='pole'></div>";
  }
}
//Generacja pól radaru
for (i = 0; i < 10; i++) {
  for (j = 0; j < 10; j++) {
    document.getElementById("plansza2").innerHTML +=
      "<div onclick='cel(this)' onmouseover='checker2(this)' id='R" +
      plansza[i] +
      j +
      "' class='pole2'></div>";
  }
}
setInterval(() => {
  document.getElementById("rocketCounter").innerHTML = rakiety;
  // console.log("Are we good: " + areWeGood);
  //tutaj pulluje suki w tym miejscu
  if (multi > 0) {
    document.dispatchEvent(dawajGracza);
    if (whoGames == lista) {
      document.querySelector(".niggaPlease").style.display = "flex";
    } else {
      holUpMulti();
      document.querySelector(".niggaPlease").style.display = "none";
    }
  }
}, 200);

//Sound effects
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
var explosion = new sound("./sfx/explosion.wav");
var click = new sound("./sfx/click.wav");
var blip = new sound("./sfx/blip.wav");
var hurt = new sound("./sfx/hurt.wav");

function startGame(x) {
  weGame = 1;
  document.getElementById("Lnegro").style.display = "block";

  if (x > 0) {
    document.getElementById("Lnegro").style.display = "none";
    document.getElementById("negro").style.display = "block";
    multi = 1;
    areWeGood = 1;
    holUpMulti();
    areWeGood = 0;
    switch (x) {
      case 1:
        lista = 1;
        Gamer = 2;
        break;
      case 2:
        lista = 2;
        Gamer = 1;
        break;
    }
  }
}
const setupPhase1 = setInterval(() => {
  if (
    counter1 == 0 &&
    counter2 == 0 &&
    counter3 == 0 &&
    counter4 == 0 &&
    lista == 1
  ) {
    if (killmode == 1) {
      document.getElementById("buonContainer").style.display = "none";
      document.getElementById("fightContainer").style.display = "flex";
    }
    stopSetupPhase();
    areWeGood = 1;
  } else if (
    counter2_1 == 4 &&
    counter2_2 == 3 &&
    counter2_3 == 2 &&
    counter2_4 == 1 &&
    lista == 1
  ) {
    document.getElementById("buonContainer").style.display = "flex";
    document.getElementById("fightContainer").style.display = "none";
    areWeGood = 0;
  }
  RedButton();
}, 200);

const setupPhase2 = setInterval(() => {
  if (
    counter2_1 == 4 &&
    counter2_2 == 3 &&
    counter2_3 == 2 &&
    counter2_4 == 1 &&
    lista == 2
  ) {
    document.getElementById("buonContainer").style.display = "flex";
    document.getElementById("fightContainer").style.display = "none";
    areWeGood = 0;
  }
  if (
    counter2_1 == 0 &&
    counter2_2 == 0 &&
    counter2_3 == 0 &&
    counter2_4 == 0 &&
    lista == 2
  ) {
    if (killmode == 1) {
      document.getElementById("buonContainer").style.display = "none";
      document.getElementById("fightContainer").style.display = "flex";
    }

    stopSetupPhase();
  }

  RedButton();
}, 200);

function RedButton() {
  if (lista == 1) {
    if (counter1 == 0) {
      document.querySelector(".jedynka").style.backgroundColor = "red";
    }
    if (counter2 == 0) {
      document.querySelector(".dwojka").style.backgroundColor = "red";
    }
    if (counter3 == 0) {
      document.querySelector(".trojka").style.backgroundColor = "red";
    }
    if (counter4 == 0) {
      document.querySelector(".czworka").style.backgroundColor = "red";
    }
  } else {
    if (
      counter2_4 == 1 &&
      counter2_3 == 2 &&
      counter2_2 == 3 &&
      counter2_1 == 4
    ) {
      document.querySelector(".jedynka").style.backgroundColor = "white";
      document.querySelector(".dwojka").style.backgroundColor = "white";
      document.querySelector(".trojka").style.backgroundColor = "white";
      document.querySelector(".czworka").style.backgroundColor = "white";
    }
    if (counter2_1 == 0) {
      document.querySelector(".jedynka").style.backgroundColor = "red";
    }
    if (counter2_2 == 0) {
      document.querySelector(".dwojka").style.backgroundColor = "red";
    }
    if (counter2_3 == 0) {
      document.querySelector(".trojka").style.backgroundColor = "red";
    }
    if (counter2_4 == 0) {
      document.querySelector(".czworka").style.backgroundColor = "red";
    }
  }
}
function stopSetupPhase() {
  if (lista == 1) {
    clearInterval(setupPhase1);
  } else {
    clearInterval(setupPhase2);
    killmode = 1;
  }

  areWeGood = 1;
}

// ustalenie pola na którym jest kursor
function checker(ele) {
  x = ele.id.charAt(0);
  y = parseInt(ele.id.charAt(1));
  xy = x + y;

  // konwertowanie x na liczby
  for (j = 0; j <= plansza.length; j++) {
    if (plansza[j] == x) {
      xNumber = j;
    }
  }
}

//Ustawienie ID komórki radaru
function checker2(ele) {
  Rid = ele.id;
}

//CELOWANIE, nie faktyczny strzał
function cel(ele) {
  if (
    //jeżeli już jest cel ustawiony na polu
    document.getElementById(Rid).style.backgroundImage == 'url("./img/cel.png")'
  ) {
    //zdejmujemy jego teksture
    document.getElementById(Rid).style.backgroundImage = "none";
    //odejmujemy jego id z listy strzałow
    for (let n = 0; n < strzaly.length; n++) {
      if (strzaly[n] == Rid) {
        strzaly.splice(n, 1);
      }
    }
    //dodajemy rakiete z powrotem
    rakiety++;
  } else if (
    document.getElementById(Rid).style.backgroundImage !==
      'url("./img/bam.png")' &&
    document.getElementById(Rid).style.backgroundImage !==
      'url("./img/pudlo.png")'
  ) {
    //jeżeli pole jest puste
    if (rakiety > 0) {
      //nadajemy teksture celu
      document.getElementById(Rid).style.backgroundImage = "url(./img/cel.png)";
      //odejmuje rakiete i pushujemy ID komórki do strzalów
      rakiety--;
      strzaly.push(Rid);
    }
  }
}
//Strzały and shit idk zrobione po jednym (1) leszku free i 1 (jednym) captain jacku.
function pal() {
  //która lista jest on?
  if (lista == 2) {
    //Czy rakiety są zdepletowane?
    if (rakiety == 0) {
      hurt.play();
      //Sprawdźmy trafienia, poniższy kod działa na każdy rekord w tabeli 'strzały'.
      for (let s = 0; s < strzaly.length; s++) {
        //Wyciągam 2 i 3 litere z RID komórki radaru
        let Sx = strzaly[s].charAt(1);
        let Sy = strzaly[s].charAt(2);
        shotsFired();
        //Zmiana na powiedzmy "bufor" animacje
        document.getElementById(strzaly[s]).style.backgroundImage =
          "url(./img/pal.png)";

        //opóźnienie na 3,5 sekundy
        setTimeout(function () {
          //Przyrównuje wyciągniete ID do tabeli statków
          if (statki.includes(Sx + Sy)) {
            //Trafiłem
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/bam.png)";
            brokenStatki.push(Sx + Sy);
          } else {
            //Nie trafiłem
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/pudlo.png)";
          }
        }, 3500);
      }
      //Możemy przekazać gre przeciwnikowi
      areWeGood = 1;
    } else {
      //Gracz ma powyżej zeru rakiet
      alert("Wykorzystaj wszystkie pociski!");
    }
  } //kopia dla listy pierwszej nie bede już pisał niżej
  else {
    if (rakiety == 0) {
      hurt.play();
      for (let s = 0; s < strzaly.length; s++) {
        let Sx = strzaly[s].charAt(1);
        let Sy = strzaly[s].charAt(2);
        shotsFired();
        document.getElementById(strzaly[s]).style.backgroundImage =
          "url(./img/pal.png)";
        setTimeout(function () {
          if (statki2.includes(Sx + Sy)) {
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/bam.png)";
            explosion.play();
            brokenStatki2.push(Sx + Sy);
          } else {
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/pudlo.png)";
          }
        }, 4000);
      }
      areWeGood = 1;
    } else {
      alert("Wykorzystaj wszystkie pociski!");
    }
  }
}

// Wybor wielkosci statku
function wyborStatku(x) {
  dodajStatek();
  if (lista == 1) {
    switch (true) {
      case x == 1 && counter1 > 0:
        dlugosc = 1;
        rotateUpdate();
        return;
      case x == 2 && counter2 > 0:
        dlugosc = 2;
        rotateUpdate();
        return;
      case x == 3 && counter3 > 0:
        dlugosc = 3;
        rotateUpdate();
        return;
      case x == 4 && counter4 > 0:
        dlugosc = 4;
        rotateUpdate();
        return;
      case counter4 == 0 || counter3 == 0 || counter2 == 0 || counter1 == 0:
        dlugosc = 0;
        dodajStatek(1);
        rotateUpdate();
        return;
    }
    RedButton();
  } else if (lista == 2) {
    switch (true) {
      case x == 1 && counter2_1 > 0:
        dlugosc = 1;
        rotateUpdate();
        return;
      case x == 2 && counter2_2 > 0:
        dlugosc = 2;
        rotateUpdate();
        return;
      case x == 3 && counter2_3 > 0:
        dlugosc = 3;
        rotateUpdate();
        return;
      case x == 4 && counter2_4 > 0:
        dlugosc = 4;
        rotateUpdate();
        return;
      case counter2_4 == 0 ||
        counter2_3 == 0 ||
        counter2_2 == 0 ||
        counter2_1 == 0:
        dlugosc = 0;
        dodajStatek(2);
        rotateUpdate();

        return;
    }
  }
}

//obracanie statku updater
function rotateUpdate() {
  if (rotateShip == "0") {
    document.getElementById("siurek").style.height = 60 * dlugosc + "px";
    document.getElementById("siurek").style.width = "60px";
  } else {
    document.getElementById("siurek").style.height = "60px";
    document.getElementById("siurek").style.width = 60 * dlugosc + "px";
  }
}
//Obracanie statku
rotateShip = 0;
addEventListener("keypress", (event) => {
  if (event.key == "r") {
    if (rotateShip == "1") {
      document.getElementById("siurek").style.height = 60 * dlugosc + "px";
      document.getElementById("siurek").style.width = "60px";
      rotateShip = 0;
    } else {
      document.getElementById("siurek").style.height = "60px";
      document.getElementById("siurek").style.width = 60 * dlugosc + "px";
      rotateShip = 1;
    }
  }
});

//dodawanie statku
function dodajStatek() {
  if (lista == 1) {
    dodajStatekCounter = 0;
    counter = 0;
    document.querySelector("#siurek").style.opacity = 1;
    document.querySelector("#plansza").addEventListener("click", (event) => {
      if (counter == 0) {
        for (j = 0; j < dlugosc; j++) {
          if (rotateShip == 0) {
            if (
              statki.includes(plansza[xNumber + j] + y) ||
              statkiGhost.includes(plansza[xNumber + j] + y)
            ) {
              dodajStatekCounter = 0;
              break;
            } else {
              if (xNumber + dlugosc <= 10) {
                dodajStatekCounter++;
              } else {
                break;
              }
            }
          }
          if (rotateShip == 1) {
            if (
              statki.includes(plansza[xNumber] + (y + j)) ||
              statkiGhost.includes(plansza[xNumber] + (y + j))
            ) {
              dodajStatekCounter = 0;
              break;
            } else {
              if (y + dlugosc <= 10) {
                dodajStatekCounter++;
              } else {
                break;
              }
            }
          }
        }
        //obrot statku pionowy

        if (dodajStatekCounter == dlugosc) {
          if (rotateShip == 0) {
            switch (true) {
              case dlugosc == 4 && dodajStatekCounter == 4:
                counter4--;
                break;
              case dlugosc == 3 && dodajStatekCounter == 3:
                counter3--;
                break;
              case dlugosc == 2 && dodajStatekCounter == 2:
                counter2--;
                break;
              case dlugosc == 1 && dodajStatekCounter == 1:
                counter1--;
                break;
            }

            for (i = 0; i <= dlugosc - 1; i++) {
              document.getElementById(
                plansza[xNumber + i] + y
              ).style.backgroundColor = "gray";
              statki.push(plansza[xNumber + i] + y);
              statkiGhost.push(
                plansza[xNumber + i] + (y - 1),
                plansza[xNumber + i] + (y + 1),
                plansza[xNumber - 1] + (y - 1),
                plansza[xNumber - 1] + (y + 1),
                plansza[xNumber - 1] + y,
                plansza[xNumber + dlugosc] + (y + 1),
                plansza[xNumber + dlugosc] + (y - 1),
                plansza[xNumber + dlugosc] + y
              );
            }
          }
          //obrot poziomy
          else if (rotateShip == 1) {
            switch (true) {
              case dlugosc == 4:
                counter4--;
                break;
              case dlugosc == 3:
                counter3--;
                break;
              case dlugosc == 2:
                counter2--;
                break;
              case dlugosc == 1:
                counter1--;
                break;
            }

            for (i = 0; i <= dlugosc - 1; i++) {
              document.getElementById(
                plansza[xNumber] + (y + i)
              ).style.backgroundColor = "gray";
              statki.push(plansza[xNumber] + (y + i));
              statkiGhost.push(
                plansza[xNumber] + (y - 1),
                plansza[xNumber + 1] + (y - 1),
                plansza[xNumber - 1] + (y - 1),
                plansza[xNumber] + (y + dlugosc),
                plansza[xNumber + 1] + (y + dlugosc),
                plansza[xNumber - 1] + (y + dlugosc),
                plansza[xNumber + 1] + (y + i),
                plansza[xNumber - 1] + (y + i)
              );
            }
          }
        }

        counter = 1;
      }

      document.querySelector("#siurek").style.opacity = 0;
    });
  } else if (lista == 2) {
    dodajStatekCounter2 = 0;
    counter2 = 0;
    document.querySelector("#siurek").style.opacity = 1;
    document.querySelector("#plansza").addEventListener("click", (event) => {
      if (counter2 == 0) {
        for (j = 0; j < dlugosc; j++) {
          if (rotateShip == 0) {
            if (
              statki2.includes(plansza[xNumber + j] + y) ||
              statkiGhost2.includes(plansza[xNumber + j] + y)
            ) {
              alert("statki nie moga sie stykac");
              dodajStatekCounter2 = 0;
              break;
            } else {
              if (xNumber + dlugosc <= 10) {
                dodajStatekCounter2++;
                switch (true) {
                  case dlugosc == 3:
                }
              } else {
                break;
              }
            }
          }
          if (rotateShip == 1) {
            if (
              statki2.includes(plansza[xNumber] + (y + j)) ||
              statkiGhost2.includes(plansza[xNumber] + (y + j))
            ) {
              alert("statki nie moga sie stykac");
              dodajStatekCounter2 = 0;
              break;
            } else {
              if (y + dlugosc <= 10) {
                dodajStatekCounter2++;
              } else {
                break;
              }
            }
          }
        }
        //obrot statku pionowy
        //Miro ma małego chuja lol
        if (dodajStatekCounter2 == dlugosc) {
          if (rotateShip == 0) {
            switch (true) {
              case dlugosc == 4 && dodajStatekCounter2 == 4:
                counter2_4 = counter2_4 - 1;
                break;
              case dlugosc == 3 && dodajStatekCounter2 == 3:
                counter2_3--;
                break;
              case dlugosc == 2 && dodajStatekCounter2 == 2:
                counter2_2--;
                break;
              case dlugosc == 1 && dodajStatekCounter2 == 1:
                counter2_1--;
                break;
            }

            for (i = 0; i <= dlugosc - 1; i++) {
              document.getElementById(
                plansza[xNumber + i] + y
              ).style.backgroundColor = "gray";
              statki2.push(plansza[xNumber + i] + y);
              statkiGhost2.push(
                plansza[xNumber + i] + (y - 1),
                plansza[xNumber + i] + (y + 1),
                plansza[xNumber - 1] + (y - 1),
                plansza[xNumber - 1] + (y + 1),
                plansza[xNumber - 1] + y,
                plansza[xNumber + dlugosc] + (y + 1),
                plansza[xNumber + dlugosc] + (y - 1),
                plansza[xNumber + dlugosc] + y
              );
            }
          }
          //obrot poziomy
          else if (rotateShip == 1) {
            switch (true) {
              case dlugosc == 4:
                counter2_4 = counter2_4 - 1;
                break;
              case dlugosc == 3:
                counter2_3--;
                break;
              case dlugosc == 2:
                counter2_2--;
                break;
              case dlugosc == 1:
                counter2_1--;
                break;
            }
            for (i = 0; i <= dlugosc - 1; i++) {
              document.getElementById(
                plansza[xNumber] + (y + i)
              ).style.backgroundColor = "gray";
              statki2.push(plansza[xNumber] + (y + i));
              statkiGhost2.push(
                plansza[xNumber] + (y - 1),
                plansza[xNumber + 1] + (y - 1),
                plansza[xNumber - 1] + (y - 1),
                plansza[xNumber] + (y + dlugosc),
                plansza[xNumber + 1] + (y + dlugosc),
                plansza[xNumber - 1] + (y + dlugosc),
                plansza[xNumber + 1] + (y + i),
                plansza[xNumber - 1] + (y + i)
              );
            }
          }
        }

        counter2 = 1;
      }

      document.querySelector("#siurek").style.opacity = 0;
    });
  }

  RedButton();
}

document.addEventListener("mousemove", function (e) {
  document.querySelector("#siurek").style.left = eval(e.clientX - 30) + "px";
  document.querySelector("#siurek").style.top = eval(e.clientY - 30) + "px";
});

var zmianaPlanszyCounter = 0;

function dZP() {
  console.log("want data");
  document.dispatchEvent(dawajDane);
  areWeGood = 1;
}

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

function zmianaPlanszy() {
  document.getElementById("onHold1").style.display = "none";
  document.getElementById("onHold2").style.display = "none";
  document.getElementById("onHold4").style.display = "none";
  if (killmode == 1) {
    document.getElementById("buonContainer").style.display = "none";
    document.getElementById("fightContainer").style.display = "flex";
  }
  //Jesteśmy gotowi na zmiane planszy!
  if (areWeGood == 1) {
    //Zaczynamy! Blokuję zmianę planszy
    areWeGood = 0;
    //Jest już gra ofensywna czy jeszcze ustawianie statków?

    //Już strzelamy:
    if (killmode == 1) {
      //Spawn radaru
      document.getElementById("matkaPlansza2").style.display = "grid";
      //Wymażmy wszystkie pola
      var kratkiRadaru = document.querySelectorAll(".pole2");
      kratkiRadaru.forEach(
        (element) => (element.style.backgroundImage = "none")
      );
      if (multi == 0) {
        //Jeżeli lista 2
        if (lista == 2) {
          //Zapiszmy strzały z tej rundy do memory
          for (let i = 0; i < strzaly.length; i++) {
            strzalyMem2.push(strzaly[i]);
          }
          //Mamy już zapisane.
          //Usuńmy wszystkie strzały z tymczasowej pamięci.
          strzaly.splice(0, strzaly.length);

          //Printujemy wszystkie strzały z pamięci przeciwnika i sprawdzamy które trafione na podstawie kodu zapisanego w Funckcji Pal()
          for (let i = 0; i < strzalyMem.length; i++) {
            let Sx = strzalyMem[i].charAt(1);
            let Sy = strzalyMem[i].charAt(2);
            if (statki2.includes(Sx + Sy)) {
              document.getElementById(strzalyMem[i]).style.backgroundImage =
                'url("./img/bam.png")';
            } else {
              document.getElementById(strzalyMem[i]).style.backgroundImage =
                'url("./img/pudlo.png")';
            }
          }
        }

        //Jeżeli lista 1
        else {
          //Zapiszmy strzały z tej rundy do memory
          for (let i = 0; i < strzaly.length; i++) {
            strzalyMem.push(strzaly[i]);
          }
          //Mamy już zapisane.
          //Usuńmy wszystkie strzały z tymczasowej pamięci.
          strzaly.splice(0, strzaly.length);

          //Printujemy wszystkie strzały z pamięci przeciwnika i sprawdzamy które trafione na podstawie kodu zapisanego w Funckcji Pal()
          for (let i = 0; i < strzalyMem2.length; i++) {
            let Sx = strzalyMem2[i].charAt(1);
            let Sy = strzalyMem2[i].charAt(2);
            if (statki.includes(Sx + Sy)) {
              document.getElementById(strzalyMem2[i]).style.backgroundImage =
                'url("./img/bam.png")';
            } else {
              document.getElementById(strzalyMem2[i]).style.backgroundImage =
                'url("./img/pudlo.png")';
            }
          }
        }
      }
      //statki zniszczone check
    }

    //Jeszcze nie strzelamy, albo już skończyliśmy
    if (multi == 0) {
      if (lista == 1) {
        rakiety = rakietyCap2;
        lista++;
      } else if (lista == 2) {
        rakiety = rakietyCap;
        lista--;
      }
    }
    if (multi !== 0) {
      if (lista == 1) {
        rakiety = rakietyCap2;
      } else if (lista == 2) {
        rakiety = rakietyCap;
      }

      switch (lista) {
        case 1:
          for (let i = 0; i < strzalyMem.length; i++) {
            let Sx = strzalyMem[i].charAt(1);
            let Sy = strzalyMem[i].charAt(2);
            if (statki2.includes(Sx + Sy)) {
              document.getElementById(strzalyMem[i]).style.backgroundImage =
                'url("./img/bam.png")';
            } else {
              document.getElementById(strzalyMem[i]).style.backgroundImage =
                'url("./img/pudlo.png")';
            }
          }
          break;
        case 2:
          for (let i = 0; i < strzalyMem2.length; i++) {
            let Sx = strzalyMem2[i].charAt(1);
            let Sy = strzalyMem2[i].charAt(2);
            if (statki.includes(Sx + Sy)) {
              document.getElementById(strzalyMem2[i]).style.backgroundImage =
                'url("./img/bam.png")';
            } else {
              document.getElementById(strzalyMem2[i]).style.backgroundImage =
                'url("./img/pudlo.png")';
            }
          }
          break;
      }
    }
    myElement = document.getElementById("plansza");

    for (child of myElement.children) {
      child.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
  }
  if (lista == 1) {
    for (let z = 0; z < statki.length; z++) {
      document.getElementById(statki[z]).style.backgroundColor = "gray";
    }
    for (let h = 0; h < brokenStatki.length; h++) {
      document.getElementById(brokenStatki[h]).style.backgroundColor = "red";
    }
  } else if (lista == 2) {
    for (let z = 0; z < statki2.length; z++) {
      document.getElementById(statki2[z]).style.backgroundColor = "gray";
    }
    for (let h = 0; h < brokenStatki2.length; h++) {
      document.getElementById(brokenStatki2[h]).style.backgroundColor = "red";
    }
  }

  //Zmiana planszy skończona, czekamy aż gracz zatwierdzi strzały aby ponownie zmienić plansze.
}

function deb() {
  statki.push(
    "H1",
    "H2",
    "H3",
    "H4",
    "E4",
    "E5",
    "C1",
    "C2",
    "C3",
    "B5",
    "B6",
    "J1",
    "J2",
    "J3",
    "G6",
    "G7",
    "D7",
    "E9",
    "C9",
    "A9"
  );
  statki2.push(
    "H1",
    "H2",
    "H3",
    "H4",
    "E4",
    "E5",
    "B5",
    "B6",
    "J1",
    "J2",
    "J3",
    "G6",
    "G7",
    "D7",
    "E9",
    "C9",
    "A9"
  );
  counter1 = 0;
  counter2 = 0;
  counter3 = 0;
  counter4 = 0;
  counter2_1 = 0;
  counter2_2 = 0;
  counter2_3 = 0;
  counter2_4 = 0;
}

setInterval(() => {
  if (weGame == 1) {
    document.getElementById("sortownik").style.display = "flex";
    document.getElementById("mainMenu").style.display = "none";
  } else if (weGame == 0) {
    document.getElementById("mainMenu").style.display = "flex";
    document.getElementById("sortownik").style.display = "none";
  }
  if (brokenStatki.length == 0) {
    rakietyCap = 3;
  } else if (
    brokenStatki.length == 10 ||
    brokenStatki.length == 11 ||
    brokenStatki.length == 12
  ) {
    rakietyCap = 2;
  } else if (brokenStatki.length == 15) {
    rakietyCap = 1;
  }

  if (brokenStatki2.length == 0) {
    rakietyCap2 = 3;
  } else if (
    brokenStatki2.length == 10 ||
    brokenStatki2.length == 11 ||
    brokenStatki2.length == 12
  ) {
    rakietyCap2 = 2;
  } else if (brokenStatki2.length == 15) {
    rakietyCap2 = 1;
  }

  if (brokenStatki.length >= 20) {
    document.getElementById("matkaPlansza2").style.display = "none";
    document.getElementById("matkaPlansza").style.display = "none";
    document.getElementById("fightContainer").style.display = "none";
    document.getElementById("buonContainer").style.display = "none";
    document.getElementById("ktory").innerHTML = lista;
    document.getElementById("onHold3").style.display = "flex";
    console.log("win 2");
  } else if (brokenStatki2.length >= 20) {
    console.log("win 1");
    document.getElementById("matkaPlansza2").style.display = "none";
    document.getElementById("matkaPlansza").style.display = "none";
    document.getElementById("fightContainer").style.display = "none";
    document.getElementById("buonContainer").style.display = "none";
    document.getElementById("ktory").innerHTML = lista;
    document.getElementById("onHold3").style.display = "flex";
  }
  if (lista == 1) {
    document.getElementById("fCounter").innerHTML = parseInt(
      20 - brokenStatki.length
    );
    document.getElementById("eCounter").innerHTML = parseInt(
      20 - brokenStatki2.length
    );
  } else if (lista == 2) {
    document.getElementById("fCounter").innerHTML = parseInt(
      20 - brokenStatki2.length
    );
    document.getElementById("eCounter").innerHTML = parseInt(
      20 - brokenStatki.length
    );
  }
}, 100);

//kontrolki do main menu
function gameMode(x) {
  Multi = document.getElementById("multi");
  Local = document.getElementById("local");
  Jebac = document.getElementById("jebac");

  switch (x) {
    case 0:
      Multi.style.display = "none";
      Local.style.display = "none";
      Jebac.style.display = "flex";

      break;
    case 1:
      Multi.style.display = "none";
      Local.style.display = "flex";
      Jebac.style.display = "none";
      break;
    case 2:
      Multi.style.display = "flex";
      Local.style.display = "none";
      Jebac.style.display = "none";
      break;
  }
}

function holUp() {
  if (areWeGood == 1) {
    if (multi == 0) {
      Uno = document.getElementById("onHold1");
      Duo = document.getElementById("onHold2");
      switch (lista) {
        case 1:
          Uno.style.display = "flex";
          break;
        case 2:
          Duo.style.display = "flex";
          break;
      }
    } else if (multi == 1) {
      Trio = document.getElementById("onHold4");
      Trio.style.display = "flex";
    }
  }
}
function holUpMulti() {
  Trio = document.getElementById("onHold4");
  Trio.style.display = "flex";
}

function shotsFired() {
  for (let i = 0; i < strzaly.length; i++) {
    var strzelecID = strzaly[i];
    var Stx = strzelecID.charAt(1);
    var Sty = strzelecID.charAt(2);
    document.getElementById(Stx + Sty).innerHTML += "<div  id='missle' />";
  }
}

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

//Łoochuj
