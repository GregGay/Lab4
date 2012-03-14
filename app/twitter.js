var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//create redis client                                                                                                                                                                                                                       
var client = redis.createClient();

//redis gives a value to error and exists                                                                                                                                                                                          
client.exists('awesome', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    }
    else if(!exists) {
        client.set('awesome', 0); //create the awesome key
    };
});

//tracks cool
client.exists('cool', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    }
    else if(!exists) {
        client.set('cool', 0); //create the cool key
    };
});

//tracks rad
client.exists('rad', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    }
    else if(!exists) {
        client.set('rad', 0); //create the rad key
    };
});

//tracks gnarly
client.exists('gnarly', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    }
    else if(!exists) {
        client.set('gnarly', 0); //create the gnarly key
    };
});

//tracks groovy
client.exists('groovy', function(error, exists) {
    if(error) {
        console.log('ERROR: '+error);
    }
    else if(!exists) {
        client.set('groovy', 0); //create the groovy key
    };
});

var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

t.stream(
    'statuses/filter',
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
            if(tweet.text.match(/awesome/)) {
                client.incr('awesome');
            }
			
			//if cool is in the tweet text, increment the counter 
			if(tweet.text.match(/cool/)) {
                client.incr('cool');
            }
			
			//if rad is in the tweet text, increment the counter 
			if(tweet.text.match(/rad/)) {
                client.incr('rad');
            }
			
			//if gnarly is in the tweet text, increment the counter 
			if(tweet.text.match(/gnarly/)) {
                client.incr('gnarly');
            }
			
			//if groovy is in the tweet text, increment the counter 
			if(tweet.text.match(/groovy/)) {
                client.incr('groovy');
            }
        });
    }
);