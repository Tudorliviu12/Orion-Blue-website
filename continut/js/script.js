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

function schimbaContinut(resursa, jsFisier, jsFunctie) {
    schimbaImagNavbar(resursa);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;

            if (jsFisier) {
                var script = document.createElement('script');
                script.onload = function () {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                script.src = jsFisier;
                document.head.appendChild(script);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };

    xhttp.open("GET", resursa + ".html", true);
    xhttp.send();
}


  function schimbaImagNavbar(resursa) {
    var img = document.getElementById('navbar-image');
    switch(resursa) {
        case 'acasa':
            img.src = 'imagini/guy_sidebar.png';
            img.style.width = '240px';
            break;
        case 'despre':
            img.src = 'imagini/girl1_sidebar.png';
            img.style.width = '300px';
            break;
        case 'video':
            img.src = 'imagini/girl4_sidebar.png';
            img.style.width = '230px';
            break;
        case 'inregistreaza':
            img.src = 'imagini/girl3_sidebar.png';
            img.style.width = '230px';
            break;
        case 'desen':
            img.src = 'imagini/guy2_sidebar.png';
            img.style.width = '300px';
            break;
        case 'persoane':
            img.src = 'imagini/girl5_sidebar.png';
            img.style.width = '300px';
            break;
        case 'invat':
            img.src = 'imagini/girl2_sidebar.png';
            img.style.width = '300px';
            break;
        case 'cumparaturi':
            img.src = 'imagini/girl2_sidebar.png';
            img.style.width = '300px';
            break;    
        default:
            img.src = 'imagini/guy_sidebar.png';
            break;
    }
  }

  function click_verifica(){
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    if (!user || !pass) {
        const rez = document.getElementById("rezultat_verificare");
        rez.innerHTML = "❌ Nu ai introdus utilizator și/sau parolă!";
        rez.style.color = "blue";
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "resurse/utilizatori.json", true);
    xhr.onload = function () {
        if(xhr.status === 200) {
            const textJson = xhr.responseText;
            const utilizatori = JSON.parse(textJson);
            const gasit = utilizatori.find(u => u.utilizator === user && u.parola === pass);
            const rez = document.getElementById("rezultat_verificare");
            if(gasit) {
                rez.innerHTML = "✅ Utilizator și parolă corecte. Bine ai venit, " + gasit.utilizator + "!";
                rez.style.color = "green";
            }
            else{
                rez.innerHTML = "❌ Utilizator sau parolă incorecte!";
                rez.style.color = "red";
            }
        }
        else if(xhr.status === 404){
            const rez = document.getElementById("rezultat_verificare");
            rez.innerHTML = "❌ Nu s-a găsit fișierul cu utilizatorii!";
            rez.style.color = "blue";
        }
        else{
            const rez = document.getElementById("rezultat_verificare");
            rez.innerHTML = "❌ Eroare la preluarea datelor!";
            rez.style.color = "blue";
        }
       
    }
    xhr.send();
  }
/*
  function initInregistrare(){
    const user = document.getElementById("user");
    const pass = document.getElementById("pass");
    const dateUser = {
        utilizator: user.value,
        parola: pass.value
    };

    fetch("/api/utilizatori", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dateUser)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error(error));

    }
*/

    
    function initInregistrare(event) {
        event.preventDefault();
    
        let numeUtilizator = document.getElementById('username').value;
        let parola = document.getElementById('pass').value;
        let prenume = document.getElementById('firstname').value;
        let nume = document.getElementById('lastname').value;
        let email = document.getElementById('email').value;
        let telefon = document.getElementById('telefon').value;
        let sex = document.getElementById('gen').value;
        let paginaPersonala = document.getElementById('website').value;
        let aeroport = document.getElementById('airport').value;
        let dataNasterii = document.getElementById('birthday').value;
    
        if (!numeUtilizator || !parola || !prenume || !nume || !email || !telefon || !sex || !dataNasterii) {
            alert("Completează toate câmpurile obligatorii, că altfel nu zburăm nicăieri 🚫✈️");
            return;
        }
    
        let utilizator = {
            utilizator: numeUtilizator,
            parola: parola,
            nume: nume,
            prenume: prenume,
            email: email,
            telefon: telefon,
            sex: sex,
            paginaPersonala: paginaPersonala,
            aeroportPreferat: aeroport,
            dataNasterii: dataNasterii
        };
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("🚀 Înregistrare completă! Bine ai venit la bord, " + prenume + "!");
                } else {
                    alert("💥 Eroare la decolare: " + this.status);
                }
            }
        };
        xhttp.open("POST", "/api/utilizatori", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(utilizator));
    }
    