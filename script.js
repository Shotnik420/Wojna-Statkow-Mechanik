//
var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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
  console.log(xy);

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
      dlugosc = 3;
  }

  if (rotateShip == 0) {
    document.getElementById("siurek").style.height = 60 * x + "px";
    document.getElementById("siurek").style.width = "60px";
  } else if (rotateShip == 1) {
    document.getElementById("siurek").style.height = "60px";
    document.getElementById("siurek").style.width = 60 * x + "px";
  }
}

//Obracanie statku
rotateShip = 0;
addEventListener("keypress", (event) => {
  
  if (event.key == "r") {
    if (rotateShip == "1") {
      rotateShip = 0;
    } else {
      rotateShip = 1;
    }
  }
  console.log(rotateShip);
});

function dodajStatek() {
  counter = 0;
  document.querySelector("#buon").style.backgroundColor = "red";
  document.querySelector("#siurek").style.opacity = 1;
  document.querySelector("#plansza").addEventListener("click", (event) => {
    if (counter == 0) {
      //obrot statku pionowy
      if (rotateShip == 0) {
        for (i = 0; i <= dlugosc; i++) {
          document.getElementById(
            plansza[xNumber + i] + y
          ).style.backgroundColor = "gray";
        }
      }
      //obrot poziomy
      else if (rotateShip == 1) {
        for (i = 0; i <= dlugosc; i++) {
          document.getElementById(
            plansza[xNumber] + (y + i)
          ).style.backgroundColor = "gray";
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
