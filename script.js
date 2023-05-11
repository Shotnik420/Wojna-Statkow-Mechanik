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
  const lokalnebuts = document.querySelectorAll(".lokalnyB");
  for (let i = 0; i < lokalnebuts.length; i++) {
    lokalnebuts[i].style.display = "block";
  }
  const onlinebuts = document.querySelectorAll(".onlineB");
  for (let i = 0; i < lokalnebuts.length; i++) {
    onlinebuts[i].style.display = "none";
  }
  if (x > 0) {
    for (let i = 0; i < onlinebuts.length; i++) {
      onlinebuts[i].style.display = "block";
    }
    for (let i = 0; i < lokalnebuts.length; i++) {
      lokalnebuts[i].style.display = "none";
    }
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
      document.querySelector(".jedynka").style.backgroundImage =
        "url('img/statki/jedynkaV-red.png')";
    }
    if (counter2 == 0) {
      document.querySelector(".dwojka").style.backgroundImage =
        "url('img/statki/dwojkaV-red.png')";
    }
    if (counter3 == 0) {
      document.querySelector(".trojka").style.backgroundImage =
        "url('img/statki/trojkaV-red.png')";
    }
    if (counter4 == 0) {
      document.querySelector(".czworka").style.backgroundImage =
        "url('img/statki/czworkaV-Red.png')";
    }
  } else {
    if (
      counter2_4 == 1 &&
      counter2_3 == 2 &&
      counter2_2 == 3 &&
      counter2_1 == 4
    ) {
      document.querySelector(".jedynka").style.backgroundImage =
        "url('img/statki/jedynkaV.png')";

      document.querySelector(".dwojka").style.backgroundImage =
        "url('img/statki/dwojkaV.png')";

      document.querySelector(".trojka").style.backgroundImage =
        "url('img/statki/trojkaV.png')";

      document.querySelector(".czworka").style.backgroundImage =
        "url('img/statki/czworkaV.png')";
    }
    if (counter2_1 == 0) {
      document.querySelector(".jedynka").style.backgroundImage =
        "url('img/statki/jedynkaV-red.png')";
    }
    if (counter2_2 == 0) {
      document.querySelector(".dwojka").style.backgroundImage =
        "url('img/statki/dwojkaV-red.png')";
    }
    if (counter2_3 == 0) {
      document.querySelector(".trojka").style.backgroundImage =
        "url('img/statki/trojkaV-red.png')";
    }
    if (counter2_4 == 0) {
      document.querySelector(".czworka").style.backgroundImage =
        "url('img/statki/czworkaV-Red.png')";
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
      if (needReload == 0) {
        needReload = 1;
        hurt.play();
        shotsFired();
        //Sprawdźmy trafienia, poniższy kod działa na każdy rekord w tabeli 'strzały'.
        for (let s = 0; s < strzaly.length; s++) {
          //Wyciągam 2 i 3 litere z RID komórki radaru
          let Sx = strzaly[s].charAt(1);
          let Sy = strzaly[s].charAt(2);

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
              explosion.play();
              brokenStatki.push(Sx + Sy);
            } else {
              //Nie trafiłem
              document.getElementById(strzaly[s]).style.backgroundImage =
                "url(./img/pudlo.png)";
            }
            areWeGood = 1;
          }, 3500);
        }

        //Możemy przekazać gre przeciwnikowi
      }
    } else {
      //Gracz ma powyżej zeru rakiet
      alertBox("Wykorzystaj wszystkie pociski!");
    }
  } //kopia dla listy pierwszej nie bede już pisał niżej
  else {
    if (rakiety == 0) {
      if (needReload == 0) {
        needReload = 1;
        hurt.play();
        shotsFired();
        for (let s = 0; s < strzaly.length; s++) {
          let Sx = strzaly[s].charAt(1);
          let Sy = strzaly[s].charAt(2);

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
            areWeGood = 1;
          }, 3500);
        }
      }
    } else {
      alertBox("Wykorzystaj wszystkie pociski!");
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
        if (rotateShip == 0) {
        } else {
          document.getElementById("siurek").style.backgroundImage =
            "url('img/statki/jedynkaH.png')";
        }
        rotateUpdate();
        return;
      case x == 2 && counter2 > 0:
        dlugosc = 2;
        document.getElementById("siurek").style.backgroundImage =
          "url('img/statki/dwojkaV.png')";
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
  switch (true) {
    case dlugosc == 1 && rotateShip == 0:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/jedynkaV.png')";
      break;
    case dlugosc == 1 && rotateShip == 1:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/jedynkaH.png')";
      break;

    case dlugosc == 2 && rotateShip == 0:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/dwojkaV.png')";
      break;
    case dlugosc == 2 && rotateShip == 1:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/dwojkaH.png')";
      break;
    case dlugosc == 3 && rotateShip == 0:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/trojkaV.png')";
      break;
    case dlugosc == 3 && rotateShip == 1:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/trojkaH.png')";
      break;
    case dlugosc == 4 && rotateShip == 0:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/czworkaV.png')";
      break;
    case dlugosc == 4 && rotateShip == 1:
      document.getElementById("siurek").style.backgroundImage =
        "url('img/statki/czworkaH.png')";
      break;
  }
  if (rotateShip == 1) {
    document.getElementById("siurek").style.height = "60px";
    document.getElementById("siurek").style.width = 60 * dlugosc + "px";
  } else {
    document.getElementById("siurek").style.height = 60 * dlugosc + "px";
    document.getElementById("siurek").style.width = "60px";
  }
}
//Obracanie statku
rotateShip = 0;
addEventListener("keypress", (event) => {
  if (event.key == "r") {
    if (rotateShip == 1) {
      rotateShip = 0;
    } else {
      rotateShip = 1;
    }
    rotateUpdate();
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
              alertBox("Statki nie mogą się stykać!");
              break;
            } else {
              if (xNumber + dlugosc <= 10) {
                dodajStatekCounter++;
              } else {
                alertBox("Statki muszą być na planszy!");
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
              alertBox("Statki nie mogą się stykać!");
              break;
            } else {
              if (y + dlugosc <= 10) {
                dodajStatekCounter++;
              } else {
                alertBox("Statki muszą być na planszy!");
                break;
              }
            }
          }
        }
        //obrot statku pionowy
        statekSize = document.getElementById(xy).getBoundingClientRect();
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
              // document.getElementById(
              //   plansza[xNumber + i] + y
              // ).style.backgroundColor = "gray";

              switch (true) {
                case dlugosc == 1:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/jedynkaV.png); width:" +
                    statekSize.width +
                    "px; height: " +
                    statekSize.height +
                    "px;'></div>";
                  break;
                case dlugosc == 2:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/dwojkaV.png); width:" +
                    statekSize.width +
                    "px; height: " +
                    statekSize.height * 2 +
                    "px;'></div>";
                  break;
                case dlugosc == 3:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/trojkaV.png); width:" +
                    statekSize.width +
                    "px; height: " +
                    statekSize.height * 3 +
                    "px;'></div>";
                  break;
                case dlugosc == 4:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/czworkaV.png); width:" +
                    statekSize.width +
                    "px; height: " +
                    statekSize.height * 4 +
                    "px;'></div>";
                  break;
              }
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
            statekHeight = 1;
            statekWidth = 1;
            test = "H";

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
              // document.getElementById(
              //   plansza[xNumber] + (y + i)
              // ).style.backgroundColor = "gray";

              switch (true) {
                case dlugosc == 1:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/jedynkaH.png); width:" +
                    statekSize.width +
                    "px; height: " +
                    statekSize.height +
                    "px;'></div>";
                  break;
                case dlugosc == 2:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/dwojkaH.png); width:" +
                    statekSize.width * 2 +
                    "px; height: " +
                    statekSize.height +
                    "px;'></div>";
                  break;
                case dlugosc == 3:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/trojkaH.png); width:" +
                    statekSize.width * 3 +
                    "px; height: " +
                    statekSize.height +
                    "px;'></div>";
                  break;
                case dlugosc == 4:
                  document.getElementById(xy).innerHTML +=
                    "<div class='statek' style='background-Image: url(img/statki/czworkaH.png); width:" +
                    statekSize.width * 4 +
                    "px; height: " +
                    statekSize.height +
                    "px;'></div>";
                  break;
              }

              plansza[xNumber] + (y + 1);
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
              dodajStatekCounter2 = 0;
              alertBox("Statki nie mogą się stykać!");
              break;
            } else {
              if (xNumber + dlugosc <= 10) {
                dodajStatekCounter2++;
              } else {
                alertBox("Statki muszą być na planszy!");
                break;
              }
            }
          }
          if (rotateShip == 1) {
            if (
              statki2.includes(plansza[xNumber] + (y + j)) ||
              statkiGhost2.includes(plansza[xNumber] + (y + j))
            ) {
              dodajStatekCounter2 = 0;
              alertBox("Statki nie mogą się stykać!");
              break;
            } else {
              if (y + dlugosc <= 10) {
                dodajStatekCounter2++;
              } else {
                alertBox("Statki muszą być na planszy!");
                break;
              }
            }
          }
        }
        //obrot statku pionowy
        //Miro ma małego chuja lol
        statekSize = document.getElementById(xy).getBoundingClientRect();
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

            switch (true) {
              case dlugosc == 1:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/jedynkaV.png); width:" +
                  statekSize.width +
                  "px; height: " +
                  statekSize.height +
                  "px;'></div>";
                break;
              case dlugosc == 2:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/dwojkaV.png); width:" +
                  statekSize.width +
                  "px; height: " +
                  statekSize.height * 2 +
                  "px;'></div>";
                break;
              case dlugosc == 3:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/trojkaV.png); width:" +
                  statekSize.width +
                  "px; height: " +
                  statekSize.height * 3 +
                  "px;'></div>";
                break;
              case dlugosc == 4:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/czworkaV.png); width:" +
                  statekSize.width +
                  "px; height: " +
                  statekSize.height * 4 +
                  "px;'></div>";
                break;
            }
            for (i = 0; i <= dlugosc - 1; i++) {
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

            switch (true) {
              case dlugosc == 1:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/jedynkaH.png); width:" +
                  statekSize.width +
                  "px; height: " +
                  statekSize.height +
                  "px;'></div>";
                break;
              case dlugosc == 2:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/dwojkaH.png); width:" +
                  statekSize.width * 2 +
                  "px; height: " +
                  statekSize.height +
                  "px;'></div>";
                break;
              case dlugosc == 3:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/trojkaH.png); width:" +
                  statekSize.width * 3 +
                  "px; height: " +
                  statekSize.height +
                  "px;'></div>";
                break;
              case dlugosc == 4:
                document.getElementById(xy).innerHTML +=
                  "<div class='statek2' style='background-Image: url(img/statki/czworkaH.png); width:" +
                  statekSize.width * 4 +
                  "px; height: " +
                  statekSize.height +
                  "px;'></div>";
                break;
            }
            for (i = 0; i <= dlugosc - 1; i++) {
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

function zmianaPlanszy() {
  document.getElementById("onHold1").style.display = "none";
  document.getElementById("onHold2").style.display = "none";
  document.getElementById("onHold4").style.display = "none";
  wszystkieStatki = document.querySelectorAll(".statek");
  wszystkieStatki2 = document.querySelectorAll(".statek2");
  wszystkieStatki.forEach((element) => (element.style.display = "none"));
  wszystkieStatki2.forEach((element) => (element.style.display = "none"));

  //Jesteśmy gotowi na zmiane planszy!
  if (areWeGood == 1) {
    //Zaczynamy! Blokuję zmianę planszy
    areWeGood = 0;
    //Jest już gra ofensywna czy jeszcze ustawianie statków?

    //Już strzelamy:
    if (killmode == 1) {
      //Spawn radaru
      document.getElementById("buonContainer").style.display = "none";
      document.getElementById("fightContainer").style.display = "flex";
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
        rakiety = 3;
        lista++;
      } else if (lista == 2) {
        rakiety = 3;
        lista--;
      }
    }
    if (multi !== 0) {
      if (lista == 1) {
        rakiety = 3;
      } else if (lista == 2) {
        rakiety = 3;
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
    wszystkieStatki.forEach((element) => (element.style.display = "block"));
    for (let h = 0; h < brokenStatki.length; h++) {
      document.getElementById(brokenStatki[h]).style.backgroundColor =
        "rgba(255, 0, 0, 0.3)";
    }
  } else if (lista == 2) {
    wszystkieStatki2.forEach((element) => (element.style.display = "block"));
    for (let h = 0; h < brokenStatki2.length; h++) {
      document.getElementById(brokenStatki2[h]).style.backgroundColor =
        "rgba(255, 0, 0, 0.3)";
    }
  }
  needReload = 0;
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
  killmode = 1;
  areWeGood = 1;
  zmianaPlanszy();
  areWeGood = 1;
  zmianaPlanszy();
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
  start = document.getElementById("start");

  switch (x) {
    case 0:
      Multi.style.display = "none";
      Local.style.display = "none";
      start.style.display = "flex";

      break;
    case 1:
      Multi.style.display = "none";
      Local.style.display = "flex";
      start.style.display = "none";
      break;
    case 2:
      document.dispatchEvent(szblix);
      Multi.style.display = "flex";
      Local.style.display = "none";
      start.style.display = "none";
      break;
  }
}

function holUp() {
  if (areWeGood == 1) {
    Uno = document.getElementById("onHold1");
    Duo = document.getElementById("onHold2");
    var boobies = document.querySelectorAll(".missle");
    boobies.forEach((element) => {
      element.remove();
    });
    switch (lista) {
      case 1:
        Uno.style.display = "flex";
        break;
      case 2:
        Duo.style.display = "flex";
        break;
    }
  } else if (areWeGood == 0) {
  }
}

function shotsFired() {
  console.log(strzaly.length);
  for (let i = 0; i < strzaly.length; i++) {
    var strzelecID = strzaly[i];
    console.log("Spawning rocket: " + strzelecID);
    document.getElementById(strzelecID).innerHTML += "<div  id='missle' />";
  }
}

//Łoochuj
testcounter = 0;
function alertBox(text) {
  document.getElementById("alertBoxText").innerHTML = text;
  document.getElementById("alertBox").style.animation = "alertBox 2.5s";

  setTimeout(() => {
    document.getElementById("alertBox").style.animation = "none";
  }, 2500);
}
