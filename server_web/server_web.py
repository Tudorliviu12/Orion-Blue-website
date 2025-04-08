import socket
import os

mime_types = {
    "html": "text/html",
    "css": "text/css",
    "js": "application/javascript",
    "jpg": "text/jpeg",
    "jpeg": "text/jpeg",
    "png": "text/png",
    "gif": "text/gif",
    "ico": "image/x-icon",
    "json": "application/json",
    "xml": "application/xml"
}

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5678))
serversocket.listen(5)

while True:
    print('#####################################')
    print('Serverul asculta potentiali clienti')
    (clientsocket, adresa) = serversocket.accept()
    print('S-a conectat un client de la adresa ' + str(adresa))
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        if not data:
            break
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n------------\n' + cerere + '\n------------')
        pozitie = cerere.find('\r\n')
        if(pozitie>-1):
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: #####' + linieDeStart +'#####')
            break
        print('S-a terminat citirea')
    cerereArray = linieDeStart.split()
    if len(cerereArray) > 1:
        numeResursa = cerereArray[1]
    else:
        numeResursa = '/'
    if numeResursa == '/':
        numeResursa = 'index.html'
    directo_curent = os.path.dirname(os.path.abspath(__file__))
    cale_fisier = os.path.join(directo_curent, "..", "continut", numeResursa.lstrip("/"))    
    
    extensie = numeResursa.split(".")[-1]
    content_type = mime_types.get(extensie, 'application/octet-stream')

    if os.path.exists(cale_fisier):
        if extensie in ["html", "css", "js"]:
            with open(cale_fisier, 'r', encoding="utf-8") as fisier:
                mesaj = fisier.read().encode("utf-8")
        else:
            with open(cale_fisier, 'rb') as fisier:
                mesaj = fisier.read()
        raspuns = f'HTTP/1.1 200 OK\r\n'
        raspuns += f'Content-Type: {content_type}; charset=utf-8\r\n'
        raspuns += f'Content-Length: ' + str(len(mesaj)) + '\r\n'
        raspuns += '\r\n'
        clientsocket.sendall(raspuns.encode() + (mesaj if isinstance(mesaj, bytes) else mesaj.encode()))

        
    else:
        mesaj = f'HTTP/1.1 404 Not Found\r\n'
        raspuns = f'Content-Type: text/html\r\n'
        raspuns += f'Content-Length: ' + str(len(mesaj)) + '\r\n'
        raspuns += '\r\n'
        clientsocket.sendall(raspuns.encode() + mesaj.encode())

    clientsocket.close()
    print('S-a terminat conexiunea cu clientul')