var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var campaignDetailURL;
var userId,sessionId;

var msg_count_URL = 'http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/' ;//[campaign_id]/messagecount/?sid=';

$('#campaignsPage').live('pageshow', function(event) {
	userId = getUrlVars()["userId"];
	sessionId = getUrlVars()["sessionId"];
	campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";
	console.log("query 4: " + userId + " and sessionId: " + sessionId);
	

	$('#userpage').html('<a href="user.html?sessionId=' + sessionId + '" data-role="button" data-icon="home">User</a>');
	getCampaigns();
});

function getCampaigns() {
	
		var s_url = Campaigns_APIURL+"?sid="+sessionId;//+'&callback=?';
		//$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/xml"});
		console.log( " service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extract(data);
	    });
  
		/*
		$.ajax({
		  type: 'GET',
		  crossDomain:true, 
		  contentType: "application/xml",
	      url: s_url,
	      success: function(data) {extract(data);},
	      error: function(data) {alert("error " + data);},
	      jsonp: "jsonpCallback"
		}); */
	}	
	
	
function extract(data) {
			//alert("extracting: " + data.exampleType);
			var campaignsJSON = eval(data);			
			console.log( " Data: " + campaignsJSON );		
			console.log('campaigns n: '+ campaignsJSON.count);
			$('#campaignList li').remove();
			if(campaignsJSON.length>0) {
				$.each(campaignsJSON, function(index, campaign) {
					console.log('campaign: ' + campaign.title);
	
					if(campaign!= null){
						var count_url = msg_count_URL+ campaign.idCampaign+ '/messagecount/?sid='+sessionId;
						var count;
						
						$.getJSON(count_url, function(data) {   
	    					crossDomain: true,  	
	    					count = data.count;
					    	console.log(" msg count is : " + count);
					    });
										
						$('#campaignList').append('<li><a href="'+ campaignDetailURL + campaign.idCampaign + '">'+
						'<h4>' + campaign.title + '</h4>' +
						'<span class="ui-li-count">' + count + '</span> </a></li>' );
					}
				});
			} //campaignsJSON.length>0
			$('#campaignList').listview('refresh');
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