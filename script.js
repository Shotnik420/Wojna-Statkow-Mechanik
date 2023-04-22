//
var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var statki = [];
var statki2 = [];
var statkiGhost = [];
var statkiGhost2 = [];
var strzaly = [];
var strzalyMem = [];
var strzalyMem2 = [];
var rakiety = 0;

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
      "<div onclick='strzal(this)' onmouseover='checker2(this)' id='R" +
      plansza[i] +
      j +
      "' class='pole2'></div>";
  }
}

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

killmode = 0;

var areWeGood = 1;

//Szybkie wytłumaczenie radaru, więcej info znajdziecie w poszczególnych funkcjach
//Dodana funkcja CEL() oraz PAL() i duże zmiany w ZMIENPLANSZE()
//Cel wpisuje cele do tymczasowej tabeli strzaly[]
//Pal je "Wystrzela" i sprawdza czy trafiły oraz printuje grafike efektu
//W zmianach tabel przed faktyczną zmianą wszystkie strzały z tej rundy są wpychane do StrzalyMem[], lub StrzalyMem2[], skąd są pobierane podczas zmiany chuj dupa ejejejejejej
//Taka żipka dla habibiego
// ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
// ░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
// ░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
// ░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
// ░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
// █░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
// █░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
// ░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
// ░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
// ░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
// ░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
// ░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
// ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
// ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
// ░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░
//HAVE FUN

setInterval(() => {
  if (
    counter1 == 0 &&
    counter2 == 0 &&
    counter3 == 0 &&
    counter4 == 0 &&
    lista == 1
  ) {
    document.getElementById("zatwierdz").style.display = "block";
    document.getElementById("buonContainer").style.display = "none";
    document.getElementById("buon").style.display = "block";
  } else if (
    counter2_1 == 4 &&
    counter2_2 == 3 &&
    counter2_3 == 2 &&
    counter2_4 == 1 &&
    lista == 2
  ) {
    document.getElementById("buonContainer").style.display = "block";
    document.getElementById("buon").style.display = "none";
  }
  if (
    counter2_1 == 0 &&
    counter2_2 == 0 &&
    counter2_3 == 0 &&
    counter2_4 == 0 &&
    lista == 2
  ) {
    document.getElementById("zatwierdz").style.display = "block";
    document.getElementById("buonContainer").style.display = "none";
    document.getElementById("buon").style.display = "none";
    document.getElementById("gameStart").style.display = "block";
    document.getElementById("matkaPlansza2").style.display = "grid";
    killmode = 1;
  }

  RedButton();
}, 100);
function RedButton() {
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
  if (
    counter2_4 == 1 &&
    counter2_3 == 2 &&
    counter2_2 == 2 &&
    counter2_1 == 4
  ) {
    document.querySelector(".jedynka").style.backgroundColor = "white";
    document.querySelector(".dwujka").style.backgroundColor = "white";
    document.querySelector(".trojka").style.backgroundColor = "white";
    document.querySelector(".czworka").style.backgroundColor = "white";
  }
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
function strzal(ele) {
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
  } else {
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
      //Sprawdźmy trafienia, poniższy kod działa na każdy rekord w tabeli 'strzały'.
      for (let s = 0; s < strzaly.length; s++) {
        //Wyciągam 2 i 3 litere z RID komórki radaru
        let Sx = strzaly[s].charAt(1);
        let Sy = strzaly[s].charAt(2);

        //Zmiana na powiedzmy "bufor" animacje
        document.getElementById(strzaly[s]).style.backgroundImage =
          "url(./img/pal.png)";

        //opóźnienie na 2 sekundy
        setTimeout(function () {
          //Przyrównuje wyciągniete ID do tabeli statków
          if (statki.includes(Sx + Sy)) {
            //Trafiłem
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/bam.png)";
          } else {
            //Nie trafiłem
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/pudlo.png)";
          }
        }, 2000);
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
      for (let s = 0; s < strzaly.length; s++) {
        let Sx = strzaly[s].charAt(1);
        let Sy = strzaly[s].charAt(2);

        document.getElementById(strzaly[s]).style.backgroundImage =
          "url(./img/pal.png)";
        setTimeout(function () {
          if (statki2.includes(Sx + Sy)) {
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/bam.png)";
          } else {
            document.getElementById(strzaly[s]).style.backgroundImage =
              "url(./img/pudlo.png)";
          }
        }, 2000);
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
        alert("wykorzystales juz liczbe tych statkow :<");
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
              alert("statki nie moga sie stykac");
              dodajStatekCounter = 0;
              break;
            } else {
              if (xNumber + dlugosc <= 10) {
                dodajStatekCounter++;
              }
            }
          }
          if (rotateShip == 1) {
            if (
              statki.includes(plansza[xNumber] + (y + j)) ||
              statkiGhost.includes(plansza[xNumber] + (y + j))
            ) {
              alert("statki nie moga sie stykac");
              dodajStatekCounter = 0;
              break;
            } else {
              if (y + dlugosc <= 10) {
                dodajStatekCounter++;
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
              killer();
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
      document.querySelector("#buon").style.backgroundColor = "green";
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
              dodajStatekCounter2++;
              switch (true) {
                case dlugosc == 3:
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
              dodajStatekCounter2++;
            }
          }
        }
        //obrot statku pionowy
        //Miro ma małego chuja lol
        if (dodajStatekCounter2 == dlugosc) {
          killer();
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
            killer();
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
      document.querySelector("#buon").style.backgroundColor = "green";
      document.querySelector("#siurek").style.opacity = 0;
    });
  }
  RedButton();
}

document.addEventListener("mousemove", function (e) {
  document.querySelector("#siurek").style.left = eval(e.clientX - 30) + "px";
  document.querySelector("#siurek").style.top = eval(e.clientY - 30) + "px";
});

function killer() {
  var ilePol = statkiGhost.length;
  //   for (k = 0; k < ilePol; k++) {
  //     if (document.getElementById(statkiGhost[k]) == null) {
  //     } //else {
  //     //    document.getElementById(statkiGhost[k]).style.backgroundColor = "red";
  //     // }
  //   }
}
lista = 1;
var zmianaPlanszyCounter = 0;

function zmianaPlanszy() {
  //Jesteśmy gotowi na zmiane planszy!
  if (areWeGood == 1) {
    //Jest już gra ofensywna czy jeszcze ustawianie statków?

    //Już strzelamy:
    if (killmode == 1) {
      //Wymażmy wszystkie pola
      var kratkiRadaru = document.querySelectorAll(".pole2");
      kratkiRadaru.forEach(
        (element) => (element.style.backgroundImage = "none")
      );

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
          if (statki.includes(Sx + Sy)) {
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

    //Jeszcze nie strzelamy, albo już skończyliśmy
    if (lista == 1) {
      rakiety = 3;
      lista++;
    } else if (lista == 2) {
      rakiety = 3;
      lista--;
    }
    myElement = document.getElementById("plansza");

    for (child of myElement.children) {
      child.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }

    if (lista == 1) {
      for (let z = 0; z < statki.length; z++) {
        document.getElementById(statki[z]).style.backgroundColor = "gray";
      }
    } else if (lista == 2) {
      for (let z = 0; z < statki2.length; z++) {
        document.getElementById(statki2[z]).style.backgroundColor = "gray";
      }
    }
  }
  //Zmiana planszy skończona, czekamy aż gracz zatwierdzi strzały aby ponownie zmienić plansze.
  areWeGood = 0;
}

function imuplse() {
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
