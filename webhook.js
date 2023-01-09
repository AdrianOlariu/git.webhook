//Tutorial: https://www.digitalocean.com/community/tutorials/how-to-use-node-js-and-github-webhooks-to-keep-remote-projects-in-sync

var secret = "sms";
var repo = "/home/pi/WebApps/sms.microservice";

let http = require("http");
let crypto = require("crypto");

const PORT = process.env.PORT || 5000;
const exec = require("child_process").exec;//to execute shell commands from the script;
http.createServer((req,res)=>{
	req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            exec('cd ' + repo + ' && git pull');
        }
    });

    res.end();
}).listen(PORT,()=>{console.log(`server running on port ${PORT}`);});//8888
