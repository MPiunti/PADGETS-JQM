/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		HTML5 + JQuery Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */


var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";
var sessionId,cid;





$('#cdetailsPage').ready(function(event) {
	



	//console.log ('ciao: ' + event );
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];
	if(typeof sessionId === 'undefined'
		   || sessionId === 'read_user') {
			sessionId="read_user";		
			$('#userabout').html("About");
	}
	
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
						var date1 = new Date(parseInt(campaign.startdate));
						var date2 = new Date(parseInt(campaign.enddate));
						$('#startdate').text("Start date: "+  date1.getDate() + "-" + (date1.getMonth()+1) +"-" + date1.getFullYear() );
						$('#enddate').text("End date: "+  date2.getDate() + "-" + (date2.getMonth()+1) +"-" + date2.getFullYear() );
							
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
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=facebook" data-transition="pop">Facebook</a></li>');
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=twitter" data-transition="pop">Twitter</a></li>');
		$('#actionList').append('<li><a href="messages.html?sessionId=' + sessionId + '&cid='+cid+'&smp=blogger" data-transition="pop">Blogger</a></li>');
		$('#actionList').listview('refresh');
	}
}

