/**
 * (c)Reply Whitehall
 * 		PADGETS European Project - Padgets.eu
 * 		HTML5 + JQuery Mobile Web Front End 
 * 			developed by Michele Piunti on May-Decemner 2012
 */


/**
 *http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/1/message/?sid=test_user&from=0
 */

var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var Comments_URL;
var sessionId, cid, smp;

var msg_count_URL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/" ;//[campaign_id]/messagecount/?sid=';

function extractMessages(data) {
			//alert("extracting: " + data.exampleType);
			var messagesJSON = eval(data);			
			//console.log( " Data: " + messagesJSON );		
			//console.log('messages n: '+ messagesJSON.count);
			$('#messageList li').remove();
			if(messagesJSON.length>0) {
				$.each(messagesJSON, function(index, message) {
					console.log('message (' +index+ '): ' + message.content);
	
					if(message!= null){
						
						$.each(message.publisheditems, function(index, msg_smp) {
						
							var comment_page = "comments.html?mid="+message.idMessage+"&cid="+cid+"&sessionId="+sessionId;
							var count = 'x';
							var network = msg_smp.idPublishChannel.network;
							
							if(network === smp)	{			
								$('#messageList').append('<li><a href="'+ comment_page + '" data-ajax="false">' 
								+ message.content + ' (' + network
								 + ')</a><a href="'+ message.permalink
								 +'" rel="external">PermaLink</a></li>' );
							}
						});
					}
				});
			} //campaignsJSON.length>0
			$('#messageList').listview('refresh');   
	}

$('#messagesPage').ready( function(event) {
//$('#messagesPage').live('pageshow',function(event, ui){ 
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];
	if(typeof sessionId === 'undefined'
		   || sessionId === 'read_user') {
			sessionId="read_user";		
			$('#userabout').html("About");
	}	
	smp = getUrlVars()["smp"];

	//campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";

	var s_url = Campaigns_APIURL+"/"+cid+"/message/?sid="+sessionId+'&from=0';

	//console.log( "calling message service url:  " + s_url);

	
	
	
		
    $.getJSON(s_url, function(data) {   
    	crossDomain: true,  	
    	console.log(" Result : " + data);
        extractMessages(data);     
    
    });
    
   
    
   $('a.messages.ui-link-inherit,a.ui-li-link-alt').bind( 'click', function (e) {
    	e.preventDefault();
    	console.log( $(this).attr("href") + '   clicked!');
    	window.location.href = $(this).attr("href");
    })
    
    
	
});
	

