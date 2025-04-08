function incarcaPersoane() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let xml = this.responseXML;
            let persoane = xml.getElementsByTagName("persoana");
            let titlu = document.createElement("h2");
            titlu = "Lista persoanelor angajate în cadrul Orion Blue:";
            let titlu1 = document.getElementById("titlu_persoane");
            titlu1.innerHTML = titlu;
            let tabel = "<table id=tabel_persoane><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Funcție</th><th>Telefon</th><th>Strada</th><th>Nr</th><th>Oras</th><th>Institutie</th></tr>";
            for (let i = 0; i < persoane.length; i++) {
                let nume = persoane[i].getElementsByTagName("nume")[0].textContent;
                let prenume = persoane[i].getElementsByTagName("prenume")[0].textContent;
                let varsta = persoane[i].getElementsByTagName("varsta")[0].textContent;
                let functie = persoane[i].getElementsByTagName("functie")[0].textContent;
                let telefon = persoane[i].getElementsByTagName("telefon")[0].textContent;
                let strada = persoane[i].getElementsByTagName("strada")[0].textContent;
                let nr = persoane[i].getElementsByTagName("nr")[0].textContent;
                let oras = persoane[i].getElementsByTagName("oras")[0].textContent;
                let institutie = persoane[i].getElementsByTagName("institutie")[0].textContent;

                tabel += `<tr><td>${nume}</td><td>${prenume}</td>
                <td>${varsta}</td><td>${functie}</td><td>${telefon}</td>
                <td>${strada}</td><td>${nr}</td><td>${oras}</td>
                <td>${institutie}</td></tr>`;
            }
            tabel += "</table>";
            document.getElementById("continut-persoane").innerHTML = tabel;
        }
    };
    xhttp.open("GET", "/resurse/persoane.xml", true);
    xhttp.send();
}