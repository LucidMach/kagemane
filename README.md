# KageMane

<div align=center>

![nara clan logo](public/logo.png)

teleoperation/shadow control platform for robots

</div>

## cURL examples

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
