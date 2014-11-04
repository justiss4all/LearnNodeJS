var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'POST':
      chunkHandler();
      break;
    case 'GET':
      items.forEach(function (item, i) {
        res.write(i + '. ' + item + '\n');
      });
      res.end();
      break;
    case 'DELETE':
      pathHandler();
      break;
    case 'PUT':
      pathHandler();
      break;

  }

  function chunkHandler(i){
    var item = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      item += chunk;
    });
    req.on('end', function() {
      if(req.method === 'POST'){
        items.push(item);
        res.end('Item added\n');
      }
      else if(req.method === 'PUT') {
        items[i] = item;
        res.end('Item updated');
      }
    });
  }

  function pathHandler(){
    var pathname = url.parse(req.url).pathname;
    var i = parseInt(pathname.slice(1), 10);

    if(isNaN(i)) {
      res.statusCode = 400;
      res.end('Item not found');
    }
    else if(!items[i]) {
      res.statusCode = 404;
      res.end('Item not found');
    }
    else if(req.method === 'PUT') {
      chunkHandler(i);
    }
    else if(req.method === 'DELETE') {
      items.splice(i, 1);
      res.end('Item deleted successfully');
    }
  }

});


server.listen(9000, function(){
  console.log('listening on 9000');
});
