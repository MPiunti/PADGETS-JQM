var APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";
var sessionId,cid;

$('#cdetailsPage').live('pageshow', function(event) {
	//console.log ('ciao: ' + event );
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];
	
	var s_url = APIURL+"?sid="+sessionId;
	//var woeid = 722347;
	 $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        displayCampaign(data);
	    });
});

function displayCampaign(data) {
	var campaignsJSON = eval(data);	
	
	if(campaignsJSON.length>0) {
				$.each(campaignsJSON, function(index, campaign) {
					console.log('campaign: ' + campaign.title);
	
					if(campaign.idCampaign == cid){
						$('#title').text("Title:  "+campaign.title  );
						//$('#topica').text(campaign.topics.topic[0].topic + ', ' + campaign.topics.topic[0].topic );
						$('#startdate').text("Start date: "+campaign.startdate );
						$('#enddate').text("End date: "+campaign.enddate );
							
						$('#location').text("Location:  "+campaign.location.name  );
						$('#notes').text(campaign.notes );
							
					}
				});
		$('#actionList').append('<li><a href="messages.html?sid=' + sessionId + '"><h4>Facebook</h3></a></li>');
		$('#actionList').append('<li><a href="messages.html?sid=' + sessionId + '"><h4>Twitter</h3></a></li>');
		$('#actionList').append('<li><a href="messages.html?sid=' + sessionId + '"><h4>Blogger</h3></a></li>');
	}
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


