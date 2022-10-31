const ip = require("ip");
const {exec} = require("child_process")
const { WebSocketServer } = require("ws");

const pingIP = require("./pingIP");
const gpiopin = 21

// updating DB
const botID = "rPI0"
pingIP(botID, ip.address())

// creating a secure websocketserver
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", function connection(ws) {
  console.log("a client connected");

  ws.on("message", function message(data) {
    const msg = JSON.parse(data.toString()) // expects {"angle":0..180}
    if (msg.angle) {
      console.log(msg.angle);
      const servosig = (parseInt(msg.angle)*200/18) + 500 // converts 0-180 to 500-2500
      exec(`pigs s ${gpiopin} ${servosig}`)
    }
  });
  ws.on("close", () => {
    console.log("client disconnected");
  });
});