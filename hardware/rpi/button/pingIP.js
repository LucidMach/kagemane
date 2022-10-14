const axios = require("axios")

module.exports =  async function pingIP(id,ip)  {
    try {
        const res = await axios.post("https://kagemane.vercel.app/api/pingIP",{
            id,
            ip
        })
        console.log(res.data); 
    } catch (err) {
        console.log(err);
    }
}
