var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";
var sessionId,cid;

$('#cdetailsPage').live('pageshow', function(event) {
	//console.log ('ciao: ' + event );
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];
	console.log(" cid: : " + cid + " sessionId:" + sessionId);
	
	var s_url = Campaigns_APIURL+"?sid="+sessionId;
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

					if(campaign.idCampaign == cid){
						console.log('Focused Campaign: ' + campaign.title);
						
						$('#title').text(campaign.title  );
						
						$('#startdate').text("Start date: "+  new Date(parseInt(campaign.startdate)) );
						$('#enddate').text("End date: "+ new Date(parseInt(campaign.enddate)) );
							
						$('#location').text("Location:  "+campaign.location.name  );
						$('#notes').text(campaign.notes );
						var topicstr="";
						$.each(campaign.topics, function(index2, topic) {
							topicstr = topicstr + $('#topics').html() + ", " + topic.topic		 
						});
						$('#topics').html('<h5>' + topicstr +'</h5>');
							
					}
				});
		$('#actionList li').remove();
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=facebook">Facebook</a></li>');
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=twitter">Twitter</a></li>');
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=blogger">Blogger</a></li>');
		$('#actionList').listview('refresh');
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


