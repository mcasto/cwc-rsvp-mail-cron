const handleImap = require("./handle-imap");

var http = require("http");
http
  .createServer(function (req, res) {
    res.write(handleImap());
    res.end();
  })
  .listen(process.env.PORT || 3000);
