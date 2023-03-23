//
var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

var statki = [];
var statkiGhost = [];

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
    case x == 1:
      dlugosc = 1;
      rotateUpdate();
      return;
    case x == 2:
      dlugosc = 2;
      rotateUpdate();
      return;
    case x == 3:
      dlugosc = 3;
      rotateUpdate();
      return;
    case x == 4:
      dlugosc = 4;
      rotateUpdate();
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
  dodajStatekCounter = 0;
  counter = 0;
  document.querySelector("#siurek").style.opacity = 1;
  document.querySelector("#plansza").addEventListener("click", (event) => {
    if (counter == 0) {
      for (j = 0; j < dlugosc; j++) {
        if (rotateShip == 0) {
          if (statki.includes(plansza[xNumber + j] + y)) {
            console.log("zajete");
            dodajStatekCounter = 0;
            break;
          } else {
            console.log("wolne");
            dodajStatekCounter++;
          }
        }
        if (rotateShip == 1) {
          if (statki.includes(plansza[xNumber] + (y + j))) {
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
          for (i = 0; i <= dlugosc - 1; i++) {
            document.getElementById(
              plansza[xNumber] + (y + i)
            ).style.backgroundColor = "gray";
            statki.push(plansza[xNumber] + (y + i));
            statkiGhost.push(
              plansza[xNumber - 1] + (y + i),
              plansza[xNumber - 1] + (y - i),
              plansza[xNumber + 1] + (y + i),
              plansza[xNumber + 1] + (y - i),
              plansza[xNumber] + (y + i),
              plansza[xNumber] + (y - i),
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
}

document.addEventListener("mousemove", function (e) {
  document.querySelector("#siurek").style.left = eval(e.clientX - 30) + "px";
  document.querySelector("#siurek").style.top = eval(e.clientY - 30) + "px";
});

function killer() {
  var ilePol = statkiGhost.length;
  for (k = 0; k < ilePol; k++) {
    var chuj = statkiGhost[k].charAt(0);
    var cipa = statkiGhost[k].charAt(1);
    console.log(chuj, cipa);
    if (chuj == null || cipa > 9) {
      console.log("sranie");
    } else {
      document.getElementById(statkiGhost[k]).style.backgroundColor = "red";
    }
  }
}
