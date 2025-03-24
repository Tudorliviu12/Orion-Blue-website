function init(){
    sectiune1();
    canvas();
}

function sectiune1(){
    let urlCurent = window.location.href;
    document.getElementById("url").innerHTML = "<strong>URL-ul paginii pe care tocmai ai intrat este: </strong><br>" + urlCurent;

    let dataCurenta = new Date();
    document.getElementById("data").innerHTML = "<strong>Data de astăzi este: </strong>" + dataCurenta.toLocaleDateString();

    function actualizareOra(){
        let oraCurenta = new Date().toLocaleTimeString();
        document.getElementById("timp").innerHTML = "<strong>Ora actuală este: </strong>" + oraCurenta;
    }
    actualizareOra();
    setInterval(actualizareOra, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("locatie").innerHTML =
        "<strong>Geolocația nu este suportată de browser-ul tău </strong>:('.";
      }
      
      function showPosition(position) {
        document.getElementById("locatie").innerHTML =
        "<strong>Coordonatele tale actuale sunt:</strong>" +
        "<br><strong>Latitudine</strong>: " + position.coords.latitude +
        "<br><strong>Longitudine</strong>: " + position.coords.longitude;
      }

      let browserCurent = navigator.userAgent;
      document.getElementById("browser").innerHTML = "<strong>Browser-ul utilizat în încercarea ta de a procura bilete de avion de la noi: </strong><br>" + browserCurent;

    }

function click_invat(){
        let button = document.getElementById("invatButton");
        if (button.innerText === "Dă click dacă ești gata să zbori cu noi! ✈️"){
            button.innerText = "Pregătește-te pentru decolare! 🚀";
        }
        else{
            button.innerText = "Dă click dacă ești gata să zbori cu noi! ✈️"
        }
    }

    function canvas(){
        const myCanvas = document.getElementById("canvas");
        const ctx = myCanvas.getContext("2d");
        const borderColor = document.getElementById("borderColor");
        const fillColor = document.getElementById("fillColor");
        let startX = null;
        let startY = null;
        let rectArray = [];
    
        myCanvas.addEventListener("click", function (event) {
            const rect = myCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left - 30;
            const y = event.clientY - rect.top - 30;
    
            if (startX === null) {
                startX = x;
                startY = y;
            } else {
                const width = x - startX;
                const height = y - startY;
    
                ctx.fillStyle = fillColor.value;
                ctx.strokeStyle = borderColor.value;
                ctx.lineWidth = 2;
    
                ctx.fillRect(startX, startY, width, height);
                ctx.strokeRect(startX, startY, width, height);
    
                startX = null;
                startY = null;
            }
        });
    }

function click_undo(){
    let button = document.getElementById("undo");
    if(button.innerText === "Ai greșit? Nicio problemă!"){
        button.innerText = "Scuze, nu am implementat încă această funcție...";
    }
    else if( button.innerText === "Scuze, nu am implementat încă această funcție...")
        button.innerText = "Poate data viitoare...";
    else if(button.innerText == "Poate data viitoare..."){
        button.innerText = "De ce încă apeși butonul? 🤔"
    }
}

        
function toggleMenu() {
    let sidebar = document.querySelector(".sidebar");
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px";
    } else {
        sidebar.style.right = "0px";
    }
}

function adaugaLinie() {
    const tabela = document.getElementById("tabel_sect3");
    const linie = document.getElementById("linie").value;
    const culoare = document.getElementById("fillColor3").value;

    if (linie <= 0 || linie > tabela.rows.length) {
        alert("Linia nu poate fi inserată!");
        return;
    }

    const trNou = tabela.insertRow(linie - 1);
    const nrColoane = tabela.rows[0].cells.length;

    for (let i = 0; i < nrColoane; i++) {
        const tdNou = document.createElement("td");
        tdNou.textContent = "Celulă nouă";
        tdNou.style.backgroundColor = culoare;
        trNou.appendChild(tdNou);
    }
}


function adaugaColoana() {
    const tabela = document.getElementById("tabel_sect3");
    const coloana = document.getElementById("coloana").value;
    const culoare = document.getElementById("fillColor3").value;

    if (coloana <= 0 || coloana > tabela.rows[0].cells.length) {
        alert("Coloana nu poate fi inserată!");
        return;
    }

    for (let i = 0; i < tabela.rows.length; i++) {
        const tdNou = document.createElement("td");
        tdNou.textContent = "Celulă nouă";
        tdNou.style.backgroundColor = culoare;
        tabela.rows[i].insertBefore(tdNou, tabela.rows[i].cells[coloana - 1]);
    }
}
