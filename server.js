var express = require('express')
var app = express()
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', (__dirname + '/public'))
app.set('view engine', 'pug')

app.all("*", function(req, res, next) {
    //res.writeHead(200, { "Content-Type": "text/plain" });
    next();
});

app.get('/', function(req, res) {
    var regex = /\(([^)]+)\)/
    var json = {
        "ipaddress": req.headers['x-forwarded-for'],
        "language": req.headers['accept-language'].split(',')[0],
        "software": regex.exec(req.headers['user-agent'])[1]
    }
  res.render('index', {json: JSON.stringify(json)})
});

app.get("*", function(req, res) {
  res.end("404!"); // 404
});

app.listen(port, function () {
  console.log('Whoami app listening on port ' + port + '!')
})