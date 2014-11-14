var express = require('express'),
    port = 9000;

var app = express();
var expressHbs = require('express-handlebars');
var moment = require('moment');

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');
app.set ('views', __dirname + '/views');

app.get('/:name', function(req, res){
  res.render('greeting', {
      title: 'Simple Greeting App',
      name: req.params.name,
      helpers: {
        now: function(){return moment().format('MMMM Do YYYY, h:mm:ss a'); }
      }
  });
});

app.listen(port, function(){
  console.log('listening on port' + port);
});
