# KageMane

<div align=center>

![nara clan logo](public/logo.png)

teleoperation/shadow control platform for robots

</div>

the goal is to build a **no-code** platform for _building UI for robots_
<img width="960" alt="Screenshot_20221101_065401" src="https://user-images.githubusercontent.com/39376102/201519505-a7af1949-e310-4814-9630-536701c871c8.png">

> as of now is a **collection of UI** capable of **controlling sensors** (or) **monitoring actuators** in robots

## Hardware Suportted
1. nodemcu 
    1. esp88266
    2. esp32 
2. raspberry pi 

## UI built
blinking led, toggling relays/switches, monitoring sensors, controlling servos are the most common requirements for IoT/robotics projects. here are a list of UI built
1. toggling switch (led/relays)
2. servo motor control
3. monitoring digital sensors
4. monitoring analog sensors

### 1. Toggling Switch UI
here's a video demoing UI on youtube 👇

<div align=center>

[<img src="https://i.ytimg.com/vi/16xm3ueyyeA/maxresdefault.jpg" width="50%">](https://www.youtube.com/watch?v=16xm3ueyyeA "video demoing led toggling with raspberry pi")

</div>

### 2. Servo Motor Control
here's a video demoing UI on youtube 👇

<div align=center>

[<img src="https://i.ytimg.com/vi/cg_XEtVOuV4/maxresdefault.jpg" width="50%">](https://youtube.com/shorts/cg_XEtVOuV4 "video demoing servo control with raspberry pi")

</div>

### 3. Digital Sensor Monitoring
here's a screenshot demoing UI 👇

<div align=center>

<img src="https://drive.google.com/file/d/1SIFTe6toDVttAtBGSq5YgToHcSC1TOKX/view">

</div>

### 4. Analog Sensor Monitoring
here's a screenshot demoing UI 👇

<div align=center>

<img src="https://drive.google.com/file/d/1SIFTe6toDVttAtBGSq5YgToHcSC1TOKX/view">

</div>

## API EndPoints

**1. pingIP:**

an endpoint for the bots to ping/update current IP Address

```
curl -X POST http://localhost:3000/api/pingIP -H "Content-Type: application/json" -d '{"id":"test07","ip":"0.0.0.0", "port":"3000"}'
```

<div align=center>
(or)
</div>

```
curl -X POST https://kagemane.vercel.app/api/pingIP -H "Content-Type: application/json" -d '{"id":"test07","ip":"0.0.0.0", "port":"3000"}'
```

**2. getIP:**

an endpoint for the client to obtain the bot's current IP Address

```
curl -X POST http://localhost:3000/api/getIP -H "Content-Type: application/json" -d '{"id":"init"}'
```

<div align=center>
(or)
</div>

```
curl -X POST https://kagemane.vercel.app/api/getIP -H "Content-Type: application/json" -d '{"id":"init"}'
```
