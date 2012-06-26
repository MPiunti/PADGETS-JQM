/**
 *http://195.251.166.71:8080/PadgetsREST-web/resources/campaign/1/message/?sid=test_user&from=0
 */

var Campaigns_APIURL = "http://195.251.166.71:8080/PadgetsREST-web/resources/campaign";


var Comments_URL;
var sessionId, cid, smp;

var msg_count_URL = 'http://195.251.166.71:8080/PadgetsREST-web/resources/campaign' ;//[campaign_id]/messagecount/?sid=';

$('#messagesPage').live('pageshow', function(event) {
	
	console.log( "Message page script BEGIN :  " );
	
	cid = getUrlVars()["cid"];
	sessionId = getUrlVars()["sessionId"];
	smp = getUrlVars()["smp"];

	//campaignDetailURL = "cdetail.html?sessionId="+sessionId+"&cid=";

	var s_url = Campaigns_APIURL+"/"+cid+"/message/?sid="+sessionId+'&from=0';

	console.log( "calling message service url:  " + s_url);
	
	    $.getJSON(s_url, function(data) {   
	    	crossDomain: true,  	
	    	console.log(" Result : " + data);
	        extractMessages(data);
	    });
});


	
	
function extractMessages(data) {
			//alert("extracting: " + data.exampleType);
			var messagesJSON = eval(data);			
			console.log( " Data: " + messagesJSON );		
			console.log('messages n: '+ messagesJSON.count);
			$('#messageList li').remove();
			if(messagesJSON.length>0) {
				$.each(messagesJSON, function(index, message) {
					console.log('message (' +index+ '): ' + message.content);
	
					if(message!= null){
						
						$.each(message.publisheditems, function(index, msg_smp) {
						
							var comment_page = 'comments.html?mid='+message.idMessage+'&cid'+cid+'&sessionId='+sessionId;
							var count = 'x';
							var network = msg_smp.idPublishChannel.network;
							
							if(network == smp)	{			
								$('#messageList').append('<li><a href="'+ comment_page + '">' + message.content +
								 + '  '+ msg_smp.idPublishChannel.name+'  ' + network
								 + '<span class="ui-li-count">  ' + count + '</span> </a></li>' );
							}
						});
					}
				});
			} //campaignsJSON.length>0
			$('#messageList').listview('refresh');
	}
	

