var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var http=require('http')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var server = http.createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// module.exports = app;
server.listen(3000,function () {
  console.log('running on 3000')
})
