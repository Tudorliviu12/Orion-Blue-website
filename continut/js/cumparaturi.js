class Produs{
    constructor(id, oras, cantitate){
        this.id = id;
        this.oras = oras;
        this.cantitate = cantitate;
    }
}

function click_cumpara(event) {
    event.preventDefault();

    let orasSelectat = document.getElementById("oras").options[document.getElementById("oras").selectedIndex].text;
    let numarBilete = parseInt(document.getElementById("numar_bilete").value);


    if(orasSelectat === "Alege un oraș" || numarBilete === "" || numarBilete < 1){
        alert(`Te rugăm să selectezi orașul dorit și un număr valid de bilete!`);
        return;
    }


    let contorId = parseInt(localStorage.getItem("contorId")) || 0;
    contorId++;
    localStorage.setItem("contorId", contorId);

    let produs = new Produs(contorId, orasSelectat, numarBilete);
    let produse = JSON.parse(localStorage.getItem("produse")) || [];
    let produsExistent = produse.find(p => p.oras === produs.oras);
    if(produsExistent){
        produsExistent.cantitate += produs.cantitate;
    }
    else{
        produse.push(produs);
    }
    localStorage.setItem("produse", JSON.stringify(produse));
    afiseazaCos(produse);

    worker.postMessage(orasSelectat);
}

function afiseazaCos(produse) {
    let cos = document.getElementById("cosul_tau");
    cos.innerHTML = "";

    produse.forEach(produs => {
        let lista = document.createElement("li");
        lista.textContent = `${produs.cantitate} bilete pentru ${produs.oras}`;
        cos.appendChild(lista);
    });
    }

function stergeCos(){
    localStorage.removeItem("produse");
    localStorage.removeItem("contorId");
    afiseazaCos([]);
}

let worker = new Worker('js/worker.js');

worker.addEventListener('message', function(e) {
    console.log("Worker a primit mesajul:", e.data);
    alert("✅ S-au procurat bilete spre " + e.data + " cu succes!");
    let item = document.createElement("li");
    item.textContent = e.data;
});


window.onload = function(){
    let produse = JSON.parse(localStorage.getItem("produse")) || [];
    afiseazaCos(produse);

    document.getElementById("sterge").addEventListener("click", stergeCos);
}
