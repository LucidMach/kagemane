// Import required libraries
#include <WiFiClientSecure.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

// Replace with your network credentials
const char* ssid = "PixelMach";
const char* password = "wherewouldibewithoutyou";

//kagemane config
#define URL "kagemane.vercel.app"
#define PORT 443 // HTTPS port
#define PATH "/api/pingIP"
#define METHOD "POST"
#define CONTENTTYPE "application/json"

String serverip;
const String botid = "test0";
const String endpoint = "https://kagemane.vercel.app/api/pingIP";
const char fingerprint[] PROGMEM = "12 44 86 24 57 65 4D 03 4A 9F 7C 7B DD 59 13 BC 5B 22 29 B7";

// button & led
bool ledState = 0;
const int ledPin = 2;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title></title>
  <style>
    body {
      background: #a2b69a;
    }
    * {
      color: #31601e;
    }
    .button {
      background: #a2b69a;
      border: 0;
      width: 250px;
      height: 250px;
      border-radius: 100%;
    }
    .neumorphism {
      box-shadow: 0.5rem 0.5rem 0.75rem 0 rgba(255, 255, 255, 0.25) inset,
        -0.5rem -0.5rem 0.75rem 0 rgba(0, 0, 0, 0.3) inset;
    }
    .neumorphism:hover {
      box-shadow: 0.4rem 0.4rem 0.6rem 0 rgba(255, 255, 255, 0.25) inset,
        -0.4rem -0.4rem 0.6rem 0 rgba(0, 0, 0, 0.3) inset;
    }
    .neumorphism:active {
      box-shadow: 0.25rem 0.25rem 0.5rem 0 rgba(255, 255, 255, 0.25) inset,
        -0.25rem -0.25rem 0.5rem 0 rgba(0, 0, 0, 0.3) inset;
    }
    .container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .links {
      position: absolute;
      bottom: 1rem;
    }
    .lgt {
      padding: 30px;
    }
    .led {
      position: relative;
      float: left;
      width: 20px;
      height: 20px;
      margin-right: 20px;
      border: 0;
      border-radius: 50%%;
      outline: 0;
      background-color: #000;
      text-indent: -9999px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        inset 0 0 0 2px rgba(255, 255, 255, 0.25),
        inset 0 5px 3px -2px rgba(255, 255, 255, 0.25),
        inset 0 -5px 3px -2px rgba(0, 0, 0, 0.1),
        0 2px 5px 0px rgba(0, 0, 0, 0.5);
    }
    .led::before {
      content: "";
      position: absolute;
      display: block;
      top: 30%%;
      left: 40%%;
      width: 1%%;
      height: 1%%;
      margin-left: -1px;
      border-radius: 50%%;
      background-color: #f1f1f1;
      box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.5),
        0 0 1px 1px rgba(255, 255, 255, 0.5);
    }
    .led--ON {
      background-color: #11ff00cb;
    }
  </style>
</head>

<body>
  <div class="lgt">
    <div class="led"></div>
  </div>
  <div class="container">
    <button id="button" class="button neumorphism"></button>
    <div class="links">

      <a href="https://kagemane.vercel.app/api" target="_">api documentation</Link>
        |
        <a href="https://github.com/lucidmach/kagemane" target="_">
          source code
        </a>
        |
        <a target="_" href="https://www.notion.so/lucidmach/KageMane-0e7013668e0c45eab53225d5a972c40b">
          project documentation
        </a>
    </div>
  </div>
  <script>
    var gateway = `ws://${window.location.hostname}/ws`;
    var websocket;
    window.addEventListener('load', onLoad);
    function initWebSocket() {
      console.log('Trying to open a WebSocket connection...');
      websocket = new WebSocket(gateway);
      websocket.onopen = onOpen;
      websocket.onclose = onClose;
      websocket.onmessage = onMessage; // <-- add this line
    }
    function onOpen(event) {
      console.log('Connection opened');
    }
    function onClose(event) {
      console.log('Connection closed');
      setTimeout(initWebSocket, 2000);
    }
    function onMessage(event) {
       if (event.data == "1") {
        document.querySelector('.led').classList.add("led--OFF");
       }
       else {
        document.querySelector('.led').classList.add("led--ON");
       }
    }
    function onLoad(event) {
      initWebSocket();
      initButton();
    }
    function initButton() {
      document.getElementById('button').addEventListener('click', toggle);
    }
    function toggle() {
      websocket.send('toggle');
    }
  </script>
</body>
</html>
)rawliteral";

void pingIP() {
  WiFiClientSecure httpsClient;
  httpsClient.setFingerprint(fingerprint);
  httpsClient.setTimeout(15000);
  delay(1000);
  Serial.print("Connecting to ");
  Serial.println(URL);

  // Forming a secure connection with the server before making the request.
  while (!httpsClient.connect(URL, PORT)) {
    delay(1000);
    Serial.print(".");
  }
  
  //  String BODY = "{\"id\":\"test0\",\"ip\":\"192.168.118.94\",\"port\":\"80\"}";
  String BODY = "{\"id\":\"" + botid + "\",\"ip\":\"" + serverip + "\", \"port\":\"80\"}";
  unsigned int len = BODY.length();
  // Forming the request (the hardest part).
  String request = String(METHOD) + " " + PATH + " HTTP/1.1\r\n" +
                   "Host: " + URL + "\r\n" +
                   "Content-Type: " + CONTENTTYPE + "\r\n" +
                   "Content-Length: " + len + "\r\n\r\n" +
                   BODY + "\r\n" +
                   "Connection: close\r\n\r\n";

  // Printing the request to be sure it's formed fine.
  Serial.println("Request is: ");
  Serial.println(request);

  // Making the request.
  httpsClient.print(request);

  // Receiving response headers.
  while (httpsClient.connected()) {
    String line = httpsClient.readStringUntil('\n');
    Serial.println("-----HEADERS START-----");
    Serial.println(line);
    if (line == "\r") {
      Serial.println("-----HEADERS END-----");
      break;
    }
  }

  // Receiving response body.
  while (httpsClient.available()) {
    String line = httpsClient.readStringUntil('\n');
    Serial.println(line);
  }
  delay(2000);
}

void notifyClients() {
  ws.textAll(String(ledState));
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    if (strcmp((char*)data, "toggle") == 0) {
      ledState = !ledState;
      notifyClients();
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

String processor(const String & var) {
  Serial.println(var);
  if (var == "STATE") {
    if (ledState) {
      return "ON";
    }
    else {
      return "OFF";
    }
  }
  return String();
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP Local IP Address
  serverip = WiFi.localIP().toString().c_str();
  Serial.println(serverip);

  initWebSocket();

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/html", index_html, processor);
  });

  // Start server
  server.begin();
  pingIP();
}

void loop() {
  ws.cleanupClients();
  digitalWrite(ledPin, ledState);
}
