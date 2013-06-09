var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var campaignDetailURL;
var userId,sessionId,keyword;
var count;
						

var msg_count_URL = 'http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/' ;//[campaign_id]/messagecount/?sid=';

	
function getCampaigns() {
	
		var s_url = "";
		if(typeof sessionId === 'undefined'
		   || sessionId === 'read_user') {
			sessionId="read_user";
			s_url = Campaigns_APIURL+"/search?sid=read_user";			
			$('#userabout').html("About");
		}
		else 
		     s_url = Campaigns_APIURL+"?sid="+sessionId;//+'&callback=?';		
		
		if(!typeof keyword==='undefined' || keyword != null){
			s_url += '&keyword='+keyword;
		}
		
		//$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/xml"});
		console.log( " service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extractCampaigns(data);
	    });    

	};
	
	
function extractCampaigns(data) {
			//alert("extracting: " + data.exampleType);
			var campaignsJSON = eval(data);			
			//console.log( " Data: " + campaignsJSON );		
			//console.log('campaigns n: '+ campaignsJSON.count);
			$('#campaignList li').remove();
			if(campaignsJSON.length>0) {
				$.each(campaignsJSON, function(index, campaign) {
					//console.log('campaign: ' + campaign.title);
	
					if(campaign!= null){
						var count_url = msg_count_URL+ campaign.idCampaign+ '/messagecount/?sid='+sessionId;
						
						$('#campaignList').append('<li><a href="'+ campaignDetailURL + campaign.idCampaign + '" data-ajax="false" >'+
							'<h4>' + campaign.title + '</h4>'
							+'<span name="msg_'+index+'" class="ui-li-count"></span></a></li>' );
						
						if(! typeof sessionId === 'undefined' & sessionId != 'read_user'){
							$.getJSON(count_url, function(data) {   
		    					crossDomain: true,  	
		    					count = data.count;
						    	//console.log(" msg count is : " + count);
						    	$('[name="msg_'+index+'"]').append(count);				
						    });
					   }
					}
				});
			} //campaignsJSON.length>0
			$('#campaignList').listview('refresh');
			
	};

$('#campaignsPage').ready(function(event) {
	userId = getUrlVars()["userId"];
	sessionId = getUrlVars()["sessionId"];
	keyword = getUrlVars()["keyword"];
	
	if(typeof sessionId === 'undefined') {
		campaignDetailURL = "cdetail.html?sessionId=read_user&cid=";
	}
	else 
		campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";
	getCampaigns();
});
	