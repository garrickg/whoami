var express = require('express')
var app = express()
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.all("*", function(req, res, next) {
      console.log("test")
    res.writeHead(200, { "Content-Type": "text/plain" });
    next();
});

app.get('/', function(req, res) {
  res.render('index')
});

app.get("*", function(req, res) {
  res.end("404!"); // 404
});

app.listen(port, function () {
  console.log('Whoami app listening on port ' + port + '!')
})