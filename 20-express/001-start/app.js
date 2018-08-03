var express = require('express');
var app = express();

app.get('/g', function (req, res) {
  res.send('get date');
});
app.post('/p', function (req, res) {
  res.send('post data');
});
app.put('/put', function (req, res) {
  res.send('Got a PUT request at /user');
});
app.delete('/d', function (req, res) {
  res.send('Got a DELETE request at /user');
});
app.use(express.static('public'));

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });
app.listen(3000,()=>{
	console.log('app listening at 127.0.0.1:3000')
})