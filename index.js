const handleImap = require("./handle-imap");

var http = require("http");
http
  .createServer(async function (req, res) {
    const mail = await handleImap();
    res.write(JSON.stringify(mail));
    res.end();
  })
  .listen(process.env.PORT || 3000);
