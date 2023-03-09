var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

for (i = 0; i < 10; i++) {
  for (j = 1; j < 11; j++) {
    document.getElementById("plansza").innerHTML +=
      "<div onmouseover='checker(this)' id='" + plansza[i] + j + "'></div>";
  }
}

function checker(ele) {
  let x = ele.id.charAt(0);
  let y = ele.id.charAt(1);
  console.log(x + " " + y);
}

function dodajStatek() {
  document.querySelector("#siurek").style.opacity = 1;
  console.log(pole);
  document.getElementById(pole).style.backgroundColor = "gray";
}

document.addEventListener("mousemove", function (e) {
  document.querySelector("#siurek").style.left = eval(e.clientX - 30) + "px";
  document.querySelector("#siurek").style.top = eval(e.clientY - 30) + "px";
});
