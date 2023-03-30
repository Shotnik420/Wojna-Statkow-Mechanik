//
var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var statki = [];
var statki2 = [];
var statkiGhost = [];
var statkiGhost2 = [];

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
//zmienne
dlugosc = 0;
xNumber = 0;
counter = 0;

counter4 = 1;
counter3 = 2;
counter2 = 3;
counter1 = 4;

// ustalenie pola na którym jest kursor
function checker(ele) {
  x = ele.id.charAt(0);
  y = parseInt(ele.id.charAt(1));
  xy = x + y;
  // console.log(xy);

  // konwertowanie x na liczby
  for (j = 0; j <= plansza.length; j++) {
    if (plansza[j] == x) {
      xNumber = j;
    }
  }
}

// Wybor wielkosci statku
function wyborStatku(x) {
  dodajStatek();
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
      alert("wykorzystales juz liczbe tych statkow :<");
      return;
  }
}

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
  // console.log(rotateShip);
});

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
              console.log("zajete");
              dodajStatekCounter = 0;
              break;
            } else {
              console.log("wolne");
              dodajStatekCounter++;
            }
          }
          if (rotateShip == 1) {
            if (
              statki.includes(plansza[xNumber] + (y + j)) ||
              statkiGhost.includes(plansza[xNumber] + (y + j))
            ) {
              console.log("zajete");
              dodajStatekCounter = 0;
              break;
            } else {
              console.log("wolne");
              dodajStatekCounter++;
            }
          }
        }
        //obrot statku pionowy

        if (dodajStatekCounter == dlugosc) {
          if (rotateShip == 0) {
            switch (true) {
              case dlugosc == 4:
                counter4--;
              case dlugosc == 3:
                counter3--;
              case dlugosc == 2:
                counter2--;
              case dlugosc == 1:
                counter1--;
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

              killer();
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
              killer();
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
              console.log("zajete");
              dodajStatekCounter2 = 0;
              break;
            } else {
              console.log("wolne");
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
              console.log("zajete");
              dodajStatekCounter2 = 0;
              break;
            } else {
              console.log("wolne");
              dodajStatekCounter2++;
            }
          }
        }
        //obrot statku pionowy

        if (dodajStatekCounter2 == dlugosc) {
          if (rotateShip == 0) {
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

              killer();
            }
          }
          //obrot poziomy
          else if (rotateShip == 1) {
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
              killer();
            }
          }
        }

        counter2 = 1;
      }
      document.querySelector("#buon").style.backgroundColor = "green";
      document.querySelector("#siurek").style.opacity = 0;
    });
  }
}

document.addEventListener("mousemove", function (e) {
  document.querySelector("#siurek").style.left = eval(e.clientX - 30) + "px";
  document.querySelector("#siurek").style.top = eval(e.clientY - 30) + "px";
});

function killer() {
  var ilePol = statkiGhost.length;
  for (k = 0; k < ilePol; k++) {
    if (document.getElementById(statkiGhost[k]) == null) {
    } //else {
    //    document.getElementById(statkiGhost[k]).style.backgroundColor = "red";
    // }
  }
}
lista = 1;
function zmianaPlanszy() {
  if (lista == 1) {
    lista++;
  } else if (lista == 2) {
    lista--;
  }
  myElement = document.getElementById("plansza");

  for (child of myElement.children) {
    child.style.backgroundColor = "white";
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
