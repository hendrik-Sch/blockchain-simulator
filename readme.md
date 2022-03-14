## Blockchain Simulator

Ein Software-Projekt zur Simulation der Blockchain im Planspiel, das im Rahmen des Projektstudiums des Authors, entwicklet wurde.

Zum Starten muss zunächst die [node.js](https://nodejs.org/) Umgebung in der Version 17.6.0 installiert werden (andere Version mögen auch funktionieren, sind allerdings nicht getestet).

### Voraussetzungen
* Server zum Bereitstellen im Internet
* [node.js](https://nodejs.org/) v17.6.0 (andere Version mögen auch funktionieren, sind allerdings nicht getestet)
* Endgeräte mit dem Chrome oder Safari Webbrowser (andere Browser mögen auch funktionieren, sind allerdings nicht getestet)

### Installation
1. dieses Repository herunterladen
2. [Konfiguration](#configuration) anpassen
3. Terminal öffnen
4. in das Verzeichnis *client* wechseln
  ```sh
  cd client
  ```
5. Dependencies installieren
  ```sh
  npm install
  ```
6. produktive Clientanwendung ereugen
  ```sh
  npm run build
  ```
7. in das Verzeichnis *server* wechseln
  ```sh
  cd ../server
  ```
8. Dependencies installieren
  ```sh
  npm install
  ```
9. Serveranwendung starten
  ```sh
  npm run start
  ```

### Start des Clients im Entwicklungmodus
1. Terminal öffnen
2. in das Verzeichnis *client* wechseln
  ```sh
  cd client
  ```
3. Dependencies installieren
  ```sh
  npm install
  ```
4. Clientanwendung starten
  ```sh
  npm run start
  ```

### <a name="configuration"></a>Konfiguration
#### Server
Ort der Konfigurationsdatei: `/server/config/dev.json`
| Parameter | Bedeutung |
|---|---|
| http.port | Port, auf den die Serveranwendung horcht und auch den Client bereitstellt |
| websocket | Konfigurationen für den Websocket (s. [socket.io](https://socket.io/docs/v4/server-options/) für weitere Konfigurationsmöglichkeiten) |
| websocket.cors | Eine Liste von erlaubten Quell-URLs |

#### Client
Ort der Konfigurationsdatei: `/client/public/config.json`

**Nach Äderungen der Konfiguration muss die produktive Version der Clientanwendung neu erzeugt werden! (s. Instllation 6.)**

| Parameter | Bedeutung |
|---|---|
| websocketUrl | URL zum Websocket der Server Anwendung |

### Kontakt
Bei Fragen wenden Sie sich bitte an Hendrik Schürmann schuermann11@googlemail.com.