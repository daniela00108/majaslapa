const datums = new Date();
izvade.innerHTML = datums;

function pievienot() {
    let prieksmets = document.getElementById("Priekšmets").value
    let datums = document.getElementById("Datums").value
    let uzdevums = document.getElementById("Uzdevums").value

    if(!prieksmets || !datums || !uzdevums){
        alert("Aizpildiet visus laukus!")
        return;
    }
    let saraksts = JSON.parse(localStorage.getItem("uzdevumi")) || []
    saraksts.push({
        prieksmets,
        datums,
        uzdevums
    })

    localStorage.setItem("uzdevumi",JSON.stringify(saraksts))

    attelot()

    document.getElementById("Priekšmets").value = ""
    document.getElementById("Datums").value = ""
    document.getElementById("Uzdevums").value = ""
}

function attelot() {
    let saraksts = JSON.parse(localStorage.getItem("uzdevumi")) || []
    let ul = document.getElementById("saraksts")

    ul.innerHTML = " "

    saraksts.forEach((item, index) => {
        let li = document.createElement("li")

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = item.pabeigts

        checkbox.onchange = function () {
            saraksts[index].pabeigts = checkbox.checked
            localStorage.setItem("uzdevumi", JSON.stringify(saraksts))

        };
        let teksts = document.createElement("span")
        teksts.textContent =  " " + item.prieksmets + " | " + item.datums + " | " + item.uzdevums + " "

        let btn = document.createElement("button")
        btn.textContent = "Dzēst"
        btn.onclick = function () { 
            saraksts.splice(index, 1)
            localStorage.setItem("uzdevumi",JSON.stringify(saraksts))
            attelot()
        } ;

        li.appendChild(checkbox)
        li.appendChild(teksts)
        li.appendChild(btn)

        ul.appendChild(li)

        })
}



window.onload = function () {
    attelot()

}