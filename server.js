var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("../sportsstore-front"));
app.listen(5000);

console.log("Server start!");