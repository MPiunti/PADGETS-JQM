var APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var campaignDetailURL;
var userId,sessionId;

var msg_count_URL = 'http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/' ;//[campaign_id]/messagecount/?sid=';

$('#campaignsPage').live('pageshow', function(event) {
	userId = getUrlVars()["userId"];
	sessionId = getUrlVars()["sessionId"];
	campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";
	console.log("query 4: " + userId + " and sessionId: " + sessionId);
	getCampaigns();
});

function getCampaigns() {
	
		var s_url = APIURL+"?sid="+sessionId;//+'&callback=?';
		//$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/xml"});
	
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extract(data);
	    });
	    
	    $('#userpage').html('<a href="user.html?sid=' + sessionId + '">User</a>');
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
										
						$('#campaignList').append('<li>'+
						'<h4>' + campaign.title + '</h4>' +
						
						'<a href="'+ campaignDetailURL + campaign.idCampaign + '">' +
							'<span class="ui-li-count">' + count + '</span> </a></li>' );
					}
				});
			} //campaignsJSON.length>0
			$('#campaignList').listview('refresh');
	}
	
	
	/*$.getJSON( APIURL+"?sid="+sessionId, //+'&callback=?' , 
		
		function(data) {
			alert(data.exampleType);
			var campaignsJSON = eval(data);			
			console.log( " Data: " + campaigns );		
			console.log('campaigns n: '+ campaigns.count);
			$('#campaignList li').remove();
			if(campaignsJSON.length>0) {
				$.each(campaigns, function(index, campaign) {
					console.log('campaign: ' + campaign.title);
	
					if(campaign!= null){
						$('#campaignList').append('<li>'+
						'<h4>' + campaign.title + '</h4>' +
						
						'<a href="'+ campaignDetailURL + campaign.idCampaign + '">' +
							'<span class="ui-li-count">' + campaign.title + '</span> </a></li>' );
						}
				});
			} //campaignsJSON.length>0
			$('#campaignList').listview('refresh');
		});*/



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