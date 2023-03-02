var plansza = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

for(i=0;i<10;i++){
    for(j=1; j<11; j++){
        document.getElementById("plansza").innerHTML += "<div id=" + plansza[i]+j +"'></div>"
    }
}