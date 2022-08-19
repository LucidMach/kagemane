# KageMane

<div align=center>

![nara clan logo](public/nara-logo.jpg)

teleoperation/shadow control platform for robots

</div>

## cURL examples

**1. pingUpdate:**

an endpoint for the bots to ping/update current IP Address

```
curl -X POST http://localhost:3000/api/pingUpdate -H "Content-Type: application/json" -d '{"id":"test07","ip":"0.0.0.0", "port":"3000"}'
```
