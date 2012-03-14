var http = require('http');
var redis = require('redis');
var client = redis.createClient();

http.createServer(function (req, res) {
	client.mget(['awesome', 'cool', 'rad', 'gnarly', 'groovy'], function(error, responses) {
		console.log(responses);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<font color=red><h2>Hello World!</h2></font>' + '<hr/><h4> awesomeCount: ' + responses[0] + '<br/> coolCount: ' + responses[1] + '<br/> radCount: ' + responses[2] + '<br/> gnarlyCount: ' + responses[3] + '<br/> groovyCount: ' + responses[4] + '</h4>');
	});
		
	/*res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');*/
}).listen(3000);

console.log('Server running on port 3000');