import socket
import os
import json
import threading
import gzip
from io import BytesIO

mime_types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".json": "application/json",
    ".xml": "application/xml"
}

DIRECTOR_CONTINUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "continut")

def get_mime_type(file_path):
    ext = os.path.splitext(file_path)[1]
    return mime_types.get(ext.lower(), 'application/octet-stream')

def proceseaza_client(clientsocket, address):
    print('#########################################################################')
    print('S-a conectat un client.')
    cerere = ""
    while True:
        data = clientsocket.recv(1024)
        if not data:
            break
        cerere += data.decode("utf-8", errors="ignore")
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        if '\r\n\r\n' in cerere:
            break

    print('S-a terminat cititrea.')

    linie_de_start = cerere.splitlines()[0]
    metoda, resursa, _ = linie_de_start.split()

    if resursa == "/":
        resursa = "index.html"
    else:
        resursa = resursa.lstrip("/")

    cale_fisier = os.path.join(DIRECTOR_CONTINUT, resursa)
    content_type = get_mime_type(cale_fisier)



    accept_gzip = "gzip" in cerere.lower()




    if resursa == "api/utilizatori" and metoda == "POST":
        content_length = 0
        for linie in cerere.split("\r\n"):
            if linie.lower().startswith("content-length:"):
                content_length = int(linie.split(":")[1].strip())

        poz_json = cerere.find("\r\n\r\n")
        body = cerere[poz_json + 4:]
        while len(body.encode("utf-8")) < content_length:
            body += clientsocket.recv(1024).decode("utf-8")

        try:
            utilizator_nou = json.loads(body)
            fisier_utilizatori = os.path.join(DIRECTOR_CONTINUT, "resurse", "utilizatori.json")
            if not os.path.exists(fisier_utilizatori):
                with open(fisier_utilizatori, "w") as f:
                    json.dump([], f)

            with open(fisier_utilizatori, "r") as f:
                date = json.load(f)

            date.append(utilizator_nou)

            with open(fisier_utilizatori, "w") as f:
                json.dump(date, f, indent=4)

            mesaj = json.dumps(utilizator_nou)
            raspuns = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: {}\r\n\r\n".format(len(mesaj))
            clientsocket.sendall(raspuns.encode() + mesaj.encode())
        except Exception as e:
            mesaj = json.dumps({"eroare": str(e)})
            raspuns = "HTTP/1.1 500 Internal Server Error\r\nContent-Type: application/json\r\nContent-Length: {}\r\n\r\n".format(len(mesaj))
            clientsocket.sendall(raspuns.encode() + mesaj.encode())
        clientsocket.close()
        return

    if os.path.exists(cale_fisier):
        try:
            if content_type.startswith("text/") or content_type == "application/javascript":
                with open(cale_fisier, "r", encoding="utf-8") as f:
                    continut = f.read().encode("utf-8")
            else:
                with open(cale_fisier, "rb") as f:
                    continut = f.read()

            if accept_gzip:
                buf = BytesIO()
                with gzip.GzipFile(fileobj=buf, mode="wb") as f:
                    f.write(continut)
                continut = buf.getvalue()
                encoding_header = "Content-Encoding: gzip\r\n"
            else:
                encoding_header = ""

            raspuns = f"HTTP/1.1 200 OK\r\nContent-Type: {content_type}; charset=utf-8\r\n{encoding_header}Content-Length: {len(continut)}\r\n\r\n"
            clientsocket.sendall(raspuns.encode() + continut)
        except Exception as e:
            mesaj = f"Eroare la citirea resursei: {str(e)}"
            raspuns = f"HTTP/1.1 500 Internal Server Error\r\nContent-Type: text/plain\r\nContent-Length: {len(mesaj)}\r\n\r\n"
            clientsocket.sendall(raspuns.encode() + mesaj.encode())
    else:
        mesaj = "<html><body><h1>404 - Not Found</h1></body></html>"
        raspuns = f"HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\nContent-Length: {len(mesaj)}\r\n\r\n"
        clientsocket.sendall(raspuns.encode() + mesaj.encode())

    clientsocket.close()



serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5678))
serversocket.listen(5)

while True:
    client, adresa = serversocket.accept()
    threading.Thread(target=proceseaza_client, args=(client, adresa)).start()
    print('Serverul asculta potentiali clienti.')
