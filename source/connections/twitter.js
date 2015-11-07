var Twit=require('twit');
var NewTwit=function(message){
		var twit = new Twit({
		    consumer_key        : '9gEGNsb2YklbLSFmX6eTqJAwB',
		    consumer_secret		: '4idKyxrCuB39KUz9kYF0uNrw7o4LOW1zRCTR06KWRvbd57v77K',
		    access_token 		: '3190244143-w1P2rFbPoFxjpyu7yoofbjPwJpU98HFQpced5p4',
		    access_token_secret : 'uV0wFnrEUyFWkk7NkvRcBFCsXOkeNvDvOvsSzlSJhqVq1'
		});

		twit.post('statuses/update', { status: message }, function(err, reply) {
		    if (err) {
		        console.dir(err);
		    } else {
		    	console.log("Posted Tweet");
		        //console.dir(reply);
		    }
		});
}

module.exports=NewTwit;