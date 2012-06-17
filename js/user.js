var APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/user";
var sessionId;

$('#udetailsPage').live('pageshow', function(event) {
	//console.log ('ciao: ' + event );
	sessionId = getUrlVars()["sessionId"];
	
	var s_url = APIURL+"?sid="+sessionId;
	//var woeid = 722347;
	 $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        displayUser(data);
	    });
});

function displayUser(data) {
	var userJSON = eval(data);	

						$('#username').text(userJSON.username  );
						$('#name').text(userJSON.firstname + " " + userJSON.lastname);
						$('#email').html("<a href='mailto:" +userJSON.email+"'>"+userJSON.email+ "</a>" );
							
						$('#organization').html("Organization:  <i>"+ userJSON.organization+"</i>"  );
						$('#viewlanguage').text(userJSON.viewLanguage );
						$('#age').text(userJSON.age );


	}


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


