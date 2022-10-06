// Import required libraries
#include <WiFiClientSecure.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

// Replace with your network credentials
const char *ssid = "PixelMach";
const char *password = "wherewouldibewithoutyou";

// kagemane config
#define URL "kagemane.vercel.app"
#define PORT 443 // HTTPS port
#define PATH "/api/pingIP"
#define METHOD "POST"
#define CONTENTTYPE "application/json"

String serverip;
const String botid = "test0";
const String endpoint = "https://kagemane.vercel.app/api/pingIP";
const char fingerprint[] PROGMEM = "D0 B6 8E BB EC 26 22 D9 2A BA D8 7F 62 E6 1A 6E 55 33 89 DE";

// button & led
bool ledState = 0;
const int ledPin = 2;

// Create AsyncWebServer object on port 80 for WS and 443 for WSS
AsyncWebServer server(80);
AsyncWebSocket ws("/socket");

void pingIP()
{
  WiFiClientSecure httpsClient;
  httpsClient.setFingerprint(fingerprint);
  httpsClient.setTimeout(15000);
  delay(1000);
  Serial.print("Connecting to ");
  Serial.println(URL);

  // Forming a secure connection with the server before making the request.
  while (!httpsClient.connect(URL, PORT))
  {
    delay(1000);
    Serial.print(".");
  }

  //  String BODY = "{\"id\":\"test0\",\"ip\":\"192.168.118.94\",\"port\":\"80\"}";
  String BODY = "{\"id\":\"" + botid + "\",\"ip\":\"" + serverip + "\"}";
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
  while (httpsClient.connected())
  {
    String line = httpsClient.readStringUntil('\n');
    Serial.println("-----HEADERS START-----");
    Serial.println(line);
    if (line == "\r")
    {
      Serial.println("-----HEADERS END-----");
      break;
    }
  }

  // Receiving response body.
  while (httpsClient.available())
  {
    String line = httpsClient.readStringUntil('\n');
    Serial.println(line);
  }
  delay(2000);
}

void notifyClients()
{
  ws.textAll(String(ledState));
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len)
{
  AwsFrameInfo *info = (AwsFrameInfo *)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT)
  {
    data[len] = 0;
    if (strcmp((char *)data, "toggle") == 0)
    {
      ledState = !ledState;
      notifyClients();
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len)
{
  switch (type)
  {
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

void initWebSocket()
{
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

String processor(const String &var)
{
  Serial.println(var);
  if (var == "STATE")
  {
    if (ledState)
    {
      return "ON";
    }
    else
    {
      return "OFF";
    }
  }
  return String();
}

void setup()
{
  // Serial port for debugging purposes
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP Local IP Address
  serverip = WiFi.localIP().toString().c_str();
  Serial.println(serverip);

  initWebSocket();

  // Start server
  server.begin();
  pingIP();
}

void loop()
{
  ws.cleanupClients();
  digitalWrite(ledPin, ledState);
}
