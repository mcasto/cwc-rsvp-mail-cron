const test = require("./test.js");
test();

var http = require("http");
http
  .createServer(function (req, res) {
    res.write(test());
    res.end();
  })
  .listen(process.env.PORT || 3000);
